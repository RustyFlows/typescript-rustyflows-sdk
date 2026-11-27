import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import openapiTS, { astToString, COMMENT_HEADER } from "openapi-typescript";
import ts from "typescript";

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jsonTypes = new Map([["#/components/schemas/JsonValue", "JsonValue"], ["#/components/schemas/DataOpScalar", "DataOpScalar"]]);
const ast = await openapiTS(new URL("../artifacts/openapi.json", import.meta.url), {
  transform(schema, options) {
    const name = jsonTypes.get(options.path);
    if (name) return ts.factory.createTypeReferenceNode(`Precise${name}`);
    if (schema.type === "integer" && ["int64", "uint64"].includes(schema.format)) {
      const types = [ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword), ts.factory.createKeywordTypeNode(ts.SyntaxKind.BigIntKeyword)];
      if (schema.nullable) types.push(ts.factory.createLiteralTypeNode(ts.factory.createNull()));
      return ts.factory.createUnionTypeNode(types);
    }
  }
});
writeFileSync(resolve(packageDir, "src/generated/openapi.ts"), COMMENT_HEADER
  + 'import type { JsonValue as PreciseJsonValue, DataOpScalar as PreciseDataOpScalar } from "../json.js";\n\n'
  + astToString(ast));
