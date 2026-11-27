import { RustyFlowsTransportError } from "./errors.js";

/** A native boxed binary64 value; unlike a primitive integral number it retains float intent. */
export type JsonFloat = Number;
export type JsonValue = null | boolean | number | bigint | JsonFloat | string | JsonValue[] | { [key: string]: JsonValue };
export type DataOpScalar = null | boolean | number | bigint | JsonFloat | string;

const numberValue = Number.prototype.valueOf;
const MIN_INTEGER = -(1n << 63n);
const MAX_INTEGER = (1n << 64n) - 1n;

export function isJsonFloat(value: unknown): value is JsonFloat {
  if (value === null || typeof value !== "object") return false;
  try { numberValue.call(value); return true; } catch { return false; }
}

/** Explicit binary64 authoring, including integral values such as jsonFloat(1). */
export function jsonFloat(value: number): JsonFloat {
  if (!Number.isFinite(value)) throw new RustyFlowsTransportError("invalid_json", "JSON floats must be finite");
  return Object.freeze(new Number(value));
}

/** Narrow unconstrained generated JSON values without duplicating the Rust DTOs. */
export type JsonSafe<T> = unknown extends T ? JsonValue
  : T extends readonly (infer Item)[] ? JsonSafe<Item>[]
  : T extends JsonFloat ? T
  : T extends object ? { [Key in keyof T]: JsonSafe<T[Key]> }
  : T;

export const MAX_JSON_REQUEST_BYTES = 1024 * 1024;
export const MAX_JSON_RESPONSE_BYTES = 8 * 1024 * 1024;
export const MAX_STREAM_FRAME_BYTES = 6 * 1024 * 1024;
const encoder = new TextEncoder();
const MAX_JSON_NODES = 200_000;
const MAX_JSON_DEPTH = 128;

/** Parse bounded UTF-8 JSON without rounding integers or discarding floating token intent. */
export function parseJson(input: string | Uint8Array, maxBytes = MAX_JSON_RESPONSE_BYTES): JsonValue {
  if ((typeof input === "string" ? input.length : input.byteLength) > maxBytes
    || typeof input === "string" && encoder.encode(input).byteLength > maxBytes) {
    throw new RustyFlowsTransportError("over_limit", "JSON input exceeds its byte bound");
  }
  let text: string;
  try { text = typeof input === "string" ? input : new TextDecoder("utf-8", { fatal: true }).decode(input); }
  catch { throw new RustyFlowsTransportError("protocol_error", "JSON contains invalid UTF-8"); }
  let position = 0;
  let nodes = 0;
  const malformed = (): never => { throw new RustyFlowsTransportError("protocol_error", "Response contains malformed JSON"); };
  const whitespace = () => { while (/[ \t\r\n]/.test(text[position] ?? "\0")) position++; };
  const string = (): string => {
    const start = position++;
    while (position < text.length) {
      const char = text[position++]!;
      if (char === '"') {
        // Only string unescaping uses the native parser; numeric tokens never reach it.
        try { return JSON.parse(text.slice(start, position)) as string; } catch { return malformed(); }
      }
      if (char === "\\") position++;
      else if (char.charCodeAt(0) < 32) malformed();
    }
    return malformed();
  };
  const visit = (depth: number): JsonValue => {
    if (depth > MAX_JSON_DEPTH || ++nodes > MAX_JSON_NODES) {
      throw new RustyFlowsTransportError("over_limit", "JSON input exceeds nesting or value bounds");
    }
    whitespace();
    const char = text[position];
    if (char === '"') return string();
    if (char === "[" || char === "{") {
      const array = char === "[";
      position++;
      whitespace();
      const result: JsonValue[] | { [key: string]: JsonValue } = array ? [] : {};
      const close = array ? "]" : "}";
      if (text[position] === close) { position++; return result; }
      for (;;) {
        whitespace();
        let key = "";
        if (!array) {
          if (text[position] !== '"') return malformed();
          key = string();
          whitespace();
          if (text[position++] !== ":") return malformed();
        }
        const child = visit(depth + 1);
        if (array) (result as JsonValue[]).push(child);
        else Object.defineProperty(result, key, { value: child, enumerable: true, writable: true, configurable: true });
        whitespace();
        const delimiter = text[position++];
        if (delimiter === close) return result;
        if (delimiter !== ",") return malformed();
      }
    }
    for (const [token, value] of [["true", true], ["false", false], ["null", null]] as const) {
      if (text.startsWith(token, position)) { position += token.length; return value; }
    }
    const start = position;
    if (text[position] === "-") position++;
    if (text[position] === "0") position++;
    else {
      if (!/[1-9]/.test(text[position] ?? "\0")) return malformed();
      while (/[0-9]/.test(text[position] ?? "\0")) position++;
    }
    let floating = false;
    if (text[position] === ".") {
      floating = true;
      position++;
      const digits = position;
      while (/[0-9]/.test(text[position] ?? "\0")) position++;
      if (digits === position) return malformed();
    }
    if (text[position] === "e" || text[position] === "E") {
      floating = true;
      position++;
      if (text[position] === "+" || text[position] === "-") position++;
      const digits = position;
      while (/[0-9]/.test(text[position] ?? "\0")) position++;
      if (digits === position) return malformed();
    }
    const token = text.slice(start, position);
    if (token.length > 1024) throw new RustyFlowsTransportError("over_limit", "JSON numeric token exceeds its bound");
    if (floating || token === "-0") {
      const value = Number(token);
      if (!Number.isFinite(value)) throw new RustyFlowsTransportError("invalid_json", "JSON floats must be finite");
      return Number.isInteger(value) ? jsonFloat(value) : value;
    }
    if (token.length > 21) throw new RustyFlowsTransportError("invalid_json", "JSON integer exceeds i64/u64");
    const integer = BigInt(token);
    if (integer < MIN_INTEGER || integer > MAX_INTEGER) {
      throw new RustyFlowsTransportError("invalid_json", "JSON integer exceeds i64/u64");
    }
    const value = Number(integer);
    return Number.isSafeInteger(value) ? value : integer;
  };
  const result = visit(0);
  whitespace();
  if (position !== text.length) return malformed();
  return result;
}

/** Serialize exact i64/u64 integers and explicit binary64 without wire string coercion. */
export function serializeJson(value: unknown, maxBytes = MAX_JSON_REQUEST_BYTES): string {
  const chunks: string[] = [];
  const ancestors = new Set<object>();
  let bytes = 0;
  let nodes = 0;
  const append = (text: string) => {
    bytes += encoder.encode(text).byteLength;
    if (bytes > maxBytes) {
      throw new RustyFlowsTransportError("over_limit", "JSON request exceeds its byte bound");
    }
    chunks.push(text);
  };
  const visit = (item: unknown, depth: number): void => {
    if (depth > MAX_JSON_DEPTH || ++nodes > MAX_JSON_NODES) {
      throw new RustyFlowsTransportError("over_limit", "JSON output exceeds nesting or value bounds");
    }
    if (item === null || typeof item === "boolean") { append(String(item)); return; }
    if (typeof item === "string") {
      if (item.length > maxBytes - bytes) throw new RustyFlowsTransportError("over_limit", "JSON request exceeds its byte bound");
      append(JSON.stringify(item));
      return;
    }
    if (typeof item === "bigint") {
      if (item < MIN_INTEGER || item > MAX_INTEGER) throw new RustyFlowsTransportError("invalid_json", "JSON integer exceeds i64/u64");
      append(String(item));
      return;
    }
    if (isJsonFloat(item)) {
      const value = numberValue.call(item);
      if (!Number.isFinite(value) || Reflect.ownKeys(item).length) {
        throw new RustyFlowsTransportError("invalid_json", "JSON floats must be finite numeric data");
      }
      const token = Object.is(value, -0) ? "-0" : String(value);
      append(Number.isInteger(value) && !/[eE]/.test(token) ? `${token}.0` : token);
      return;
    }
    if (typeof item === "number") {
      if (!Number.isFinite(item) || (Number.isInteger(item) && !Number.isSafeInteger(item))) {
        throw new RustyFlowsTransportError("invalid_json", "Use bigint for exact wide integers or jsonFloat for integral binary64");
      }
      append(Object.is(item, -0) ? "-0.0" : JSON.stringify(item));
      return;
    }
    if (typeof item !== "object") throw new RustyFlowsTransportError("invalid_json", "Request contains a non-JSON value");
    if (ancestors.has(item)) throw new RustyFlowsTransportError("invalid_json", "Request contains a cycle");
    const array = Array.isArray(item);
    const prototype = Object.getPrototypeOf(item);
    if (!array && prototype !== Object.prototype && prototype !== null) {
      throw new RustyFlowsTransportError("invalid_json", "JSON objects must be plain objects, not class instances");
    }
    ancestors.add(item);
    append(array ? "[" : "{");
    const keys = Reflect.ownKeys(item);
    if (keys.some((key) => typeof key !== "string")) {
      throw new RustyFlowsTransportError("invalid_json", "JSON cannot contain symbol properties");
    }
    const names = keys as string[];
    if (array && (names.length !== item.length + 1 || names[names.length - 1] !== "length")) {
      throw new RustyFlowsTransportError("invalid_json", "JSON arrays must be dense and have no extra properties");
    }
    const entries = array ? names.slice(0, -1) : names;
    for (let index = 0; index < entries.length; index++) {
      const key = entries[index]!;
      const descriptor = Object.getOwnPropertyDescriptor(item, key)!;
      if (!descriptor.enumerable || !("value" in descriptor) || (array && key !== String(index))) {
        throw new RustyFlowsTransportError("invalid_json", "JSON cannot contain accessors, hidden fields, or sparse arrays");
      }
      if (index > 0) append(",");
      if (!array) {
        if (key.length > maxBytes - bytes) throw new RustyFlowsTransportError("over_limit", "JSON request exceeds its byte bound");
        append(JSON.stringify(key));
        append(":");
      }
      visit(descriptor.value, depth + 1);
    }
    append(array ? "]" : "}");
    ancestors.delete(item);
  };
  visit(value, 0);
  return chunks.join("");
}

export async function readBoundedBody(response: Response, maxBytes = MAX_JSON_RESPONSE_BYTES): Promise<Uint8Array<ArrayBuffer>> {
  const declared = response.headers.get("content-length");
  if (declared && /^\d+$/.test(declared) && Number(declared) > maxBytes) {
    await response.body?.cancel();
    throw new RustyFlowsTransportError("over_limit", "Response exceeds its byte bound");
  }
  if (!response.body) return new Uint8Array();
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let ended = false;
  try {
    for (;;) {
      const next = await reader.read();
      if (next.done) { ended = true; break; }
      bytes += next.value.byteLength;
      if (bytes > maxBytes) throw new RustyFlowsTransportError("over_limit", "Response exceeds its byte bound");
      chunks.push(next.value);
    }
  } finally {
    try { if (!ended) await reader.cancel(); } finally { reader.releaseLock(); }
  }
  const result = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return result;
}
