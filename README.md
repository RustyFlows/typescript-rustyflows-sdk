# RustyFlows TypeScript SDK

This repository is the public TypeScript integration surface for RustyFlows. It
keeps generated transport code and future hand-written authoring APIs separate,
while consuming versioned contracts from the private `rustyflows-app` source of
truth.

## Packages

| Package | Status | Purpose |
|---|---|---|
| `@rustyflows/client` | Generated-client foundation | Typed HTTP transport generated from the canonical OpenAPI document, plus pinned workflow/package schemas |
| `@rustyflows/workflow` | Planned in rustyflows-app#146 | Hand-written workflow builder that compiles to governed workflow package JSON |

Python is intentionally developed in the separate `rustyflows-python-sdk`
repository after the TypeScript package, validation, and release patterns are
proven. Swift is not a near-term SDK lane.

## Current Transport Contract

`@rustyflows/client` covers the developer-facing API categories needed by the
governed runtime and SDK roadmap:

- workflow CRUD, preflight, run, stream, resume, and gate resolution
- run history, checkpoints, gates, aggregates, and conversation history
- policy and ruleset CRUD
- systems and provider credential metadata
- platform API keys and service accounts
- usage, billing activity/rollups, subscription limits, and audit logs

The generated client is a low-level transport package with bounded execution
transport helpers and a saved-workflow server example. It does not provide
authoring DSLs, a validation bridge, deployment helpers, or a local runtime.

## Contract Flow

```text
rustyflows-app Rust DTOs and utoipa annotations
  -> apps/api/openapi.json
  -> pinned artifacts in packages/typescript-client
  -> openapi-typescript generated paths/components
  -> openapi-fetch typed client
```

The app repository owns API behavior and schema compatibility. This repository
pins reviewed snapshots so installs and generated output are deterministic.
Use `bun run sync:artifacts` only against the intended sibling app checkout,
then review the artifact and generated-code diffs together.

## Roadmap And Dependency Chain

The generated transport client is the first TypeScript SDK slice:

1. `rustyflows-app#145` / this PR — generated TypeScript client and canonical transport coverage.
2. `rustyflows-app#142` — finalized ruleset runtime/schema shape.
3. `rustyflows-app#146` — workflow builder DSL.
4. `rustyflows-app#147` — policy and ruleset builders.
5. `rustyflows-app#148` — canonical CLI/cloud validation bridge.
6. `rustyflows-app#149` and `#150` — quote-and-buy and invoice-approval examples.
7. `rustyflows-app#151` and `#213` — quickstart, CI example, and API/SDK docs hub.
8. `rustyflows-app#226` / `#114` — post-TypeScript Python generated client and SDK.

Post-MVP local transport, bundleable runtime, and local model adapter constraints
remain under `rustyflows-app#224`; they should shape interfaces without
expanding this generated-client PR.

## Open-Source And Publication Gate

Merging implementation is separate from publishing to npm. Public publication
is blocked by `rustyflows-app#227`, which owns:

- Apache-2.0 licensing and aligned package metadata
- contribution, conduct, security, issue, and PR templates
- independent package SemVer, changelogs, and tag conventions
- required CI and package dry-run gates
- npm trusted publishing through OIDC
- provenance/attestation and release-artifact source records
- npm organization and package ownership

No package should be published until that gate is complete and the final release
step is explicitly approved.

## Development

```bash
bun install --frozen-lockfile
bun run check:generated
bun run typecheck
bun run test
bun run build
bun run pack:dry-run
```

See [`packages/typescript-client/README.md`](packages/typescript-client/README.md)
for authentication, usage, artifact refresh, and package-level details.
