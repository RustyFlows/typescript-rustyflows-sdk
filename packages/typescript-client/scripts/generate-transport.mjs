import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const api = JSON.parse(readFileSync(resolve(packageDir, "artifacts/openapi.json"), "utf8"));
const schemas = api.components?.schemas ?? {};
const selected = {};
const include = (name) => {
  if (Object.hasOwn(selected, name)) return;
  const schema = schemas[name];
  if (!schema) throw new Error(`Canonical OpenAPI is missing required transport schema ${name}`);
  selected[name] = schema;
  const visit = (value) => {
    if (value === null || typeof value !== "object") return;
    if (typeof value.$ref === "string") {
      const prefix = "#/components/schemas/";
      if (!value.$ref.startsWith(prefix)) throw new Error(`Unsupported transport schema reference: ${value.$ref}`);
      include(decodeURIComponent(value.$ref.slice(prefix.length)).replace(/~1/g, "/").replace(/~0/g, "~"));
    }
    for (const child of Object.values(value)) visit(child);
  };
  visit(schema);
};
include("ApiError");
include("StreamEvent");
const streamEventTypes = schemas.StreamEvent.oneOf?.map((variant) => {
  const names = variant.properties?.type?.enum;
  if (!Array.isArray(names) || names.length !== 1 || typeof names[0] !== "string") {
    throw new Error("Canonical StreamEvent variant is missing its unique type discriminator");
  }
  return names[0];
});
if (!streamEventTypes?.length || new Set(streamEventTypes).size !== streamEventTypes.length) {
  throw new Error("Canonical StreamEvent types must be present and unique");
}
const idempotentOperations = [];
const responseSchemas = {};
const requestSchemas = {};
for (const [path, item] of Object.entries(api.paths ?? {})) {
  for (const method of ["get", "post", "put", "patch", "delete", "head", "options", "trace"]) {
    const operation = item[method];
    if (!operation) continue;
    const requestSchema = operation.requestBody?.content?.["application/json"]?.schema;
    if (requestSchema !== undefined) requestSchemas[`${method.toUpperCase()} ${path}`] = requestSchema;
    const responses = {};
    for (const [status, response] of Object.entries(operation.responses ?? {})) {
      const schema = response.content?.["application/json"]?.schema;
      if (schema !== undefined) responses[status] = schema;
    }
    if (Object.keys(responses).length) responseSchemas[`${method.toUpperCase()} ${path}`] = responses;
    const parameters = [...(item.parameters ?? []), ...(operation.parameters ?? [])];
    if (parameters.some((parameter) => {
      if (parameter.$ref) {
        const prefix = "#/components/parameters/";
        if (!parameter.$ref.startsWith(prefix)) throw new Error(`Unsupported parameter reference ${parameter.$ref}`);
        parameter = api.components.parameters[parameter.$ref.slice(prefix.length)];
      }
      return parameter.in === "header" && parameter.name.toLowerCase() === "idempotency-key" && parameter.required;
    })) idempotentOperations.push({ method: method.toUpperCase(), path });
  }
}
// Numeric normalization needs every referenced response DTO, not just errors/events.
for (const name of Object.keys(schemas)) include(name);
writeFileSync(resolve(packageDir, "src/generated/transport-schemas.ts"),
  `// Generated from artifacts/openapi.json; do not edit.\nexport const transportSchemas: Record<string, unknown> = ${JSON.stringify(selected, null, 2)};\nexport const streamEventTypes: readonly string[] = ${JSON.stringify(streamEventTypes)};\nexport const requestSchemas: Record<string, unknown> = ${JSON.stringify(requestSchemas, null, 2)};\nexport const responseSchemas: Record<string, Record<string, unknown>> = ${JSON.stringify(responseSchemas, null, 2)};\nexport const idempotentOperations: readonly { method: string; path: string }[] = ${JSON.stringify(idempotentOperations, null, 2)};\n`);
