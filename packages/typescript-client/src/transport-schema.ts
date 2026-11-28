import type { components } from "./generated/openapi.js";
import { transportSchemas } from "./generated/transport-schemas.js";
import { RustyFlowsTransportError } from "./errors.js";
import { isJsonFloat, jsonFloat } from "./json.js";

type Schema = Record<string, unknown>;
const object = (value: unknown): value is Schema => {
  if (value === null || typeof value !== "object") return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
const numeric = (value: unknown): value is number | bigint | Number =>
  typeof value === "bigint" ? value >= -(1n << 63n) && value <= (1n << 64n) - 1n
    : isJsonFloat(value) ? Number.isFinite(Number.prototype.valueOf.call(value))
      : typeof value === "number" && Number.isFinite(value) && (!Number.isInteger(value) || Number.isSafeInteger(value));

function referenceName(ref: string): string {
  const prefix = "#/components/schemas/";
  if (!ref.startsWith(prefix)) throw new RustyFlowsTransportError("protocol_error", "Unsupported canonical schema reference");
  return decodeURIComponent(ref.slice(prefix.length)).replace(/~1/g, "/").replace(/~0/g, "~");
}

function matchesTransportValue(root: unknown, value: unknown, request = false, budget = { remaining: 200_000 }): boolean {
  const matches = (schema: unknown, item: unknown, depth: number): boolean => {
    if (--budget.remaining < 0 || depth > 128) throw new RustyFlowsTransportError("over_limit", "Transport value exceeds validation bounds");
    if (schema === true) return true;
    if (schema === false || !object(schema)) return false;
    if (schema.nullable === true && item === null) return true;
    if (typeof schema.$ref === "string") return matches(transportSchemas[referenceName(schema.$ref)], item, depth + 1);
    if ("const" in schema && item !== schema.const) return false;
    if (Array.isArray(schema.enum) && !schema.enum.includes(item)) return false;
    if (Array.isArray(schema.allOf) && !schema.allOf.every((child) => matches(child, item, depth + 1))) return false;
    for (const kind of ["oneOf", "anyOf"] as const) {
      if (!Array.isArray(schema[kind])) continue;
      // Tagged Rust enums let us reject other branches before walking large payloads.
      const candidates = schema[kind].filter((child: unknown) => {
        if (!object(item) || !object(child) || !object(child.properties)) return true;
        const tag = child.properties.type;
        const discriminator = Object.getOwnPropertyDescriptor(item, "type")?.value;
        return !object(tag) || !("const" in tag || Array.isArray(tag.enum))
          || ("const" in tag ? discriminator === tag.const : (tag.enum as unknown[]).includes(discriminator));
      });
      let count = 0;
      for (const child of candidates) if (matches(child, item, depth + 1)) {
        count++;
        if (kind === "anyOf") break;
        if (count > 1) return false;
      }
      if (count !== 1) return false;
    }
    const types = Array.isArray(schema.type) ? schema.type : typeof schema.type === "string" ? [schema.type] : [];
    if (types.length && !types.some((type) => {
      switch (type) {
        case "null": return item === null;
        case "boolean": return typeof item === "boolean";
        case "string": return typeof item === "string";
        case "number": return numeric(item) || request && typeof item === "number" && Number.isFinite(item);
        case "integer": return typeof item === "bigint" ? numeric(item) : typeof item === "number" && Number.isSafeInteger(item) && !Object.is(item, -0);
        case "array": return Array.isArray(item);
        case "object": return object(item);
        default: return false;
      }
    })) return false;
    if (numeric(item)) {
      const value = isJsonFloat(item) ? Number.prototype.valueOf.call(item) : item;
      if (typeof schema.minimum === "number" && value < schema.minimum) return false;
      if (typeof schema.maximum === "number" && value > schema.maximum) return false;
    }
    if (typeof item === "string") {
      if (typeof schema.minLength === "number" && item.length < schema.minLength) return false;
      if (typeof schema.maxLength === "number" && item.length > schema.maxLength) return false;
      if (typeof schema.pattern === "string" && !new RegExp(schema.pattern).test(item)) return false;
    }
    if (Array.isArray(item)) {
      if (typeof schema.minItems === "number" && item.length < schema.minItems) return false;
      if (typeof schema.maxItems === "number" && item.length > schema.maxItems) return false;
      if (schema.items !== undefined) {
        for (let index = 0; index < item.length; index++) {
          const descriptor = Object.getOwnPropertyDescriptor(item, index);
          if (!descriptor || !("value" in descriptor) || !matches(schema.items, descriptor.value, depth + 1)) return false;
        }
      }
    }
    if (object(item)) {
      if (Array.isArray(schema.required) && !schema.required.every((key) => typeof key === "string" && Object.hasOwn(item, key))) return false;
      const properties = object(schema.properties) ? schema.properties : {};
      for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(item))) {
        if (!("value" in descriptor) || !descriptor.enumerable) return false;
        if (Object.hasOwn(properties, key)) { if (!matches(properties[key], descriptor.value, depth + 1)) return false; }
        else if (schema.additionalProperties === false) return false;
        else if (object(schema.additionalProperties) && !matches(schema.additionalProperties, descriptor.value, depth + 1)) return false;
      }
    }
    return true;
  };
  return matches(root, value, 0);
}

/** Runtime guards use only the pinned OpenAPI schemas, never a second DTO catalogue. */
export function assertTransportSchema<Name extends keyof components["schemas"]>(
  name: Name, value: unknown
): asserts value is components["schemas"][Name] {
  if (!matchesTransportValue(transportSchemas[name], value)) {
    throw new RustyFlowsTransportError("protocol_error", `Response does not match canonical ${name}`);
  }
}

/** Validate the selected operation's response, including inline response schemas. */
export function assertTransportValue(schema: unknown, value: unknown): void {
  if (!matchesTransportValue(schema, value)) {
    throw new RustyFlowsTransportError("protocol_error", "Response does not match its canonical schema");
  }
}

/** Normalize only schema-owned numeric DTO fields; arbitrary JSON remains lossless. */
export function normalizeTransportValue(schema: unknown, value: unknown, direction: "request" | "response" = "response"): unknown {
  const budget = { remaining: 200_000 };
  const normalize = (schema: unknown, value: unknown, depth: number): unknown => {
    if (--budget.remaining < 0 || depth > 128) throw new RustyFlowsTransportError("over_limit", "Transport value exceeds normalization bounds");
    if (!object(schema)) return value;
    if (typeof schema.$ref === "string") {
      const name = referenceName(schema.$ref);
      if (name === "JsonValue" || name === "DataOpScalar") return value;
      return normalize(transportSchemas[name], value, depth + 1);
    }
    if (schema.type === "integer" && (isJsonFloat(value) || typeof value === "number" && (!Number.isSafeInteger(value) || Object.is(value, -0)))) {
      throw new RustyFlowsTransportError("protocol_error", "Integer DTO field contains a floating JSON number");
    }
    if (direction === "request" && schema.type === "number" && typeof value === "number" && Number.isInteger(value)) return jsonFloat(value);
    if (schema.type === "number" && numeric(value)) {
      return direction === "request" ? value : isJsonFloat(value) ? Number.prototype.valueOf.call(value) : Number(value);
    }
    for (const kind of ["oneOf", "anyOf"] as const) {
      if (!Array.isArray(schema[kind])) continue;
      const candidates: unknown[] = [];
      for (const child of schema[kind]) {
        if (matchesTransportValue(child, value, direction === "request", budget)) {
          candidates.push(child);
          if (kind === "anyOf") break;
        }
      }
      if (candidates.length !== 1) throw new RustyFlowsTransportError("protocol_error", "Response does not match a canonical schema variant");
      value = normalize(candidates[0], value, depth + 1);
    }
    if (Array.isArray(schema.allOf)) {
      for (const child of schema.allOf) value = normalize(child, value, depth + 1);
    }
    if (Array.isArray(value) || object(value)) {
      const prototype = Object.getPrototypeOf(value);
      if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) return value;
      if (Array.isArray(value) ? schema.items === undefined : !object(schema.properties) && !object(schema.additionalProperties)) return value;
      const properties = object(schema.properties) ? schema.properties : {};
      const descriptors = Object.getOwnPropertyDescriptors(value as object);
      let changed = false;
      for (const [key, descriptor] of Object.entries(descriptors)) {
        if (!("value" in descriptor) || !descriptor.enumerable) continue;
        const childSchema = Array.isArray(value) ? schema.items
          : Object.hasOwn(properties, key) ? properties[key] : schema.additionalProperties;
        if (object(childSchema)) {
          const child = normalize(childSchema, descriptor.value, depth + 1);
          if (child !== descriptor.value) { descriptor.value = child; changed = true; }
        }
      }
      if (!changed) return value;
      if (direction === "response") { Object.defineProperties(value, descriptors); return value; }
      // Preserve descriptors so serialization still rejects accessors/sparse or exotic data.
      if (Array.isArray(value)) return Object.defineProperties([], descriptors);
      return Object.create(prototype, descriptors);
    }
    return value;
  };
  return normalize(schema, value, 0);
}

