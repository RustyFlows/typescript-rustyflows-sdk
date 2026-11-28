import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const packageDir = resolve(scriptDir, "..");
const repoRoot = resolve(packageDir, "../..");
if (!process.env.RUSTYFLOWS_APP_DIR) {
  throw new Error("RUSTYFLOWS_APP_DIR must explicitly select the intended app checkout");
}
const sourceRoot = resolve(process.env.RUSTYFLOWS_APP_DIR);
const check = process.argv.includes("--check");
// App CI checks current source bytes; SDK CI separately verifies exact
// provenance against the immutable source_commit checkout.
const compatibleSource = process.argv.includes("--compatible-source");
if (compatibleSource && !check) {
  throw new Error("--compatible-source is only valid with --check");
}

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

const repositoryIdentity = (url) => url
  .replace(/^git@github\.com:/, "https://github.com/")
  .replace(/^ssh:\/\/git@github\.com\//, "https://github.com/")
  .replace(/\/$/, "")
  .replace(/\.git$/, "")
  .toLowerCase();
const canonicalRepository = "https://github.com/RustyFlows/rustyflows-app.git";
const intendedRepository = repositoryIdentity(canonicalRepository);
if (repositoryIdentity(sourceRemote) !== intendedRepository) {
  throw new Error("Selected source is not the canonical RustyFlows/rustyflows-app repository");
}
if (process.env.CI && sourceStatus.length > 0) {
  throw new Error("CI requires a clean immutable app source checkout; dirty provenance cannot pass");
}

const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const manifestPath = resolve(packageDir, "artifacts/source.json");
const pinned = check ? JSON.parse(readFileSync(manifestPath, "utf8")) : undefined;
if (check && (pinned.source_repository !== canonicalRepository
  || !/^[0-9a-f]{40}$/.test(pinned.source_commit ?? "")
  || typeof pinned.source_dirty !== "boolean"
  || (process.env.CI && pinned.source_dirty)
  || (!compatibleSource && (pinned.source_commit !== sourceCommit
    || pinned.source_dirty !== (sourceStatus.length > 0))))) {
  throw new Error("SDK source provenance differs from the selected app checkout; sync only after canonical generation");
}
for (const [source, target] of copies) {
  const sourcePath = resolve(sourceRoot, source);
  const targetPath = resolve(repoRoot, target);
  if (!existsSync(sourcePath)) throw new Error(`Missing RustyFlows artifact: ${sourcePath}`);
  if (check) {
    const name = target.replace("packages/typescript-client/", "");
    if (!existsSync(targetPath) || sha256(sourcePath) !== sha256(targetPath)
      || pinned.artifacts?.[name] !== `sha256:${sha256(targetPath)}`) {
      throw new Error(`Canonical app / SDK artifact drift: ${name}`);
    }
  }
}
if (check) {
  console.log(compatibleSource
    ? "Current canonical app artifact bytes and SDK pinned digests match (not whole-repository provenance)"
    : "Canonical app artifacts, SDK snapshots, and exact source provenance match");
  process.exit(0);
}
for (const [source, target] of copies) {
  copyFileSync(resolve(sourceRoot, source), resolve(repoRoot, target));
  console.log(`${source} -> ${target}`);
}
const manifest = {
  source_repository: canonicalRepository,
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
