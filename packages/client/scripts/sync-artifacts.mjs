import { copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const packageDir = resolve(scriptDir, "..");
const repoRoot = resolve(packageDir, "../..");
const sourceRoot = resolve(process.env.RUSTYFLOWS_APP_DIR ?? "../rustyflows-app");

const copies = [
  [
    "apps/api/openapi.json",
    "packages/client/artifacts/openapi.json"
  ],
  [
    "apps/api/crates/api-contracts/schemas/workflow-ir.schema.json",
    "packages/client/schemas/workflow-ir.schema.json"
  ],
  [
    "apps/api/crates/api-contracts/schemas/governed-workflow-package.schema.json",
    "packages/client/schemas/governed-workflow-package.schema.json"
  ]
];

for (const [source, target] of copies) {
  const sourcePath = resolve(sourceRoot, source);
  const targetPath = resolve(repoRoot, target);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing RustyFlows artifact: ${sourcePath}`);
  }

  copyFileSync(sourcePath, targetPath);
  console.log(`${sourcePath} -> ${targetPath}`);
}
