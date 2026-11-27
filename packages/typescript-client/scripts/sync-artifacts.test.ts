import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const canonicalRepository = "https://github.com/RustyFlows/rustyflows-app.git";
const artifacts = [
  "apps/api/openapi.json",
  "apps/api/crates/api-contracts/schemas/workflow-ir.schema.json",
  "apps/api/crates/api-contracts/schemas/governed-workflow-package.schema.json"
];

test.each([
  "git@github.com:RustyFlows/rustyflows-app.git",
  "ssh://git@github.com/RustyFlows/rustyflows-app.git",
  "https://github.com/rustyflows/rustyflows-app.git"
])("regenerates CI-compatible provenance from %s", (remote) => {
  const root = mkdtempSync(join(tmpdir(), "rustyflows-source-provenance-"));
  try {
    const source = join(root, "app");
    const sdkPackage = join(root, "sdk/packages/typescript-client");
    const script = join(sdkPackage, "scripts/sync-artifacts.mjs");
    const manifestPath = join(sdkPackage, "artifacts/source.json");
    for (const [index, artifact] of artifacts.entries()) {
      const path = join(source, artifact);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, `${JSON.stringify({ artifact: index })}\n`);
    }
    for (const directory of ["scripts", "artifacts", "schemas"]) {
      mkdirSync(join(sdkPackage, directory), { recursive: true });
    }
    copyFileSync(fileURLToPath(new URL("./sync-artifacts.mjs", import.meta.url)), script);
    // Never inherit an enclosing hook's index, repository or global Git setup.
    const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_")));
    Object.assign(env, {
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_CONFIG_GLOBAL: "/dev/null",
      RUSTYFLOWS_APP_DIR: source,
      CI: "true"
    });
    const git = (...args: string[]) => execFileSync("git", [
      "-C", source, "-c", "core.hooksPath=/dev/null", "-c", "commit.gpgsign=false",
      "-c", "user.name=Provenance Fixture", "-c", "user.email=fixture@example.invalid", ...args
    ], { env, encoding: "utf8", timeout: 5000, stdio: ["ignore", "pipe", "pipe"] });
    git("init", "--quiet");
    git("add", "--", ...artifacts);
    git("commit", "--quiet", "--message", "fixture");
    git("remote", "add", "rustyflows-app", remote);
    const run = (...args: string[]) => execFileSync(process.execPath, [script, ...args], {
      env, encoding: "utf8", timeout: 5000, stdio: ["ignore", "pipe", "pipe"]
    });

    run();
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    expect(manifest).toMatchObject({
      source_repository: canonicalRepository,
      source_commit: git("rev-parse", "HEAD").trim(),
      source_dirty: false
    });
    run("--check");

    // An old noncanonical manifest must fail locally, not only in CI's gate.
    writeFileSync(manifestPath, JSON.stringify({ ...manifest, source_repository: remote }));
    expect(() => run("--check")).toThrow();
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
