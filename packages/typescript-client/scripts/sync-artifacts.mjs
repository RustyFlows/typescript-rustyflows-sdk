import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const packageDir = resolve(scriptDir, "..");
const repoRoot = resolve(packageDir, "../..");
const sourceRoot = resolve(process.env.RUSTYFLOWS_APP_DIR ?? "../rustyflows-app");

const copies = [
  [
    "apps/api/openapi.json",
    "packages/typescript-client/artifacts/openapi.json"
  ],
  [
    "apps/api/crates/api-contracts/schemas/workflow-ir.schema.json",
    "packages/typescript-client/schemas/workflow-ir.schema.json"
  ],
  [
    "apps/api/crates/api-contracts/schemas/governed-workflow-package.schema.json",
    "packages/typescript-client/schemas/governed-workflow-package.schema.json"
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

const sourceCommit = execFileSync("git", ["-C", sourceRoot, "rev-parse", "HEAD"], {
  encoding: "utf8"
}).trim();
const sourceStatus = execFileSync("git", ["-C", sourceRoot, "status", "--porcelain"], {
  encoding: "utf8"
}).trim();
const sourceRemotes = execFileSync("git", ["-C", sourceRoot, "remote"], {
  encoding: "utf8"
})
  .trim()
  .split("\n")
  .filter(Boolean);
const sourceRemoteName = sourceRemotes.includes("rustyflows-app")
  ? "rustyflows-app"
  : sourceRemotes.includes("origin")
    ? "origin"
    : sourceRemotes[0];
if (!sourceRemoteName) {
  throw new Error(`RustyFlows source checkout has no Git remote: ${sourceRoot}`);
}
const sourceRemote = execFileSync(
  "git",
  ["-C", sourceRoot, "remote", "get-url", sourceRemoteName],
  { encoding: "utf8" }
).trim();

const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const manifestPath = resolve(packageDir, "artifacts/source.json");
const manifest = {
  source_repository: sourceRemote,
  source_commit: sourceCommit,
  source_dirty: sourceStatus.length > 0,
  artifacts: Object.fromEntries(
    copies.map(([, target]) => {
      const targetPath = resolve(repoRoot, target);
      return [target.replace("packages/typescript-client/", ""), `sha256:${sha256(targetPath)}`];
    })
  )
};

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${manifestPath} (source manifest)`);
