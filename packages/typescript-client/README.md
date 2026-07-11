# `@rustyflows/client`

Typed TypeScript transport for the RustyFlows API. The package combines
`openapi-typescript` generated paths/components with a small `openapi-fetch`
wrapper for base URL, authentication, organization context, and custom fetch
configuration.

This is the low-level generated client, not the hand-written workflow SDK.

## Authentication And Tenant Context

Authenticated endpoints accept either:

- a RustyFlows/Supabase session JWT, or
- a `pk_` platform API key.

Both are sent through `Authorization: Bearer <token>`. Tenant-scoped API-key
calls require `X-Organization-Id`; JWT calls should also send it when the caller
already knows the active organization rather than relying on auto-resolution.

```ts
import { createRustyFlowsClient } from "@rustyflows/client";

const client = createRustyFlowsClient({
  baseUrl: "https://api.example.com",
  token: process.env.RUSTYFLOWS_TOKEN,
  organizationId: process.env.RUSTYFLOWS_ORGANIZATION_ID
});
```

Use the optional `headers` field for additional request-wide headers and
`fetch` for test doubles, tracing, or an environment-specific fetch
implementation. Per-operation options from `openapi-fetch` remain available for
request-specific headers and cancellation.

## Transport Coverage

The pinned OpenAPI contract includes:

- workflows: CRUD, preflight, run, stream, resume, gates
- run inspection: history, checkpoints, gates, aggregates, conversations
- governance: policy and ruleset CRUD
- tenant configuration: systems and provider credential metadata
- automation identities: platform API keys and service accounts
- operations: usage, billing activity/rollups, stored-data usage, subscriptions, audit logs

Example workflow preflight:

```ts
const { data, error } = await client.POST("/api/workflows/preflight", {
  body: {
    purpose: "run",
    definition: governedPackage
  }
});

if (error || !data?.ok) {
  throw new Error("Workflow preflight failed");
}
```

Example structured workflow input:

```ts
const result = await client.POST("/api/workflows/run", {
  body: {
    workflow_id: workflowId,
    input: {
      customer_id: "customer-123",
      invoice_total: 1250
    }
  }
});
```

## Public Types And Schemas

The package root exports generated OpenAPI `paths`, `operations`, `components`,
and `webhooks`, plus convenience aliases for `GovernedWorkflowPackage`,
`Workflow`, and `WorkflowRunRequest`.

Pinned JSON schemas are available through package exports:

```ts
import governedPackageSchema from "@rustyflows/client/schemas/governed-workflow-package.schema.json";
import workflowIrSchema from "@rustyflows/client/schemas/workflow-ir.schema.json";
```

These schemas are inputs for SDK/editor tooling. Canonical validation remains in
Rust and is exposed through the CLI/backend; the TypeScript validation bridge is
tracked separately.

## Artifact Source And Regeneration

- `artifacts/openapi.json` is the pinned API input for transport generation.
- `artifacts/source.json` records the source repository commit, dirty state, and SHA-256 digest of every pinned artifact.
- `schemas/workflow-ir.schema.json` is the canonical Workflow IR bundle.
- `schemas/governed-workflow-package.schema.json` is the governed-package entrypoint.

From the repository root, with `rustyflows-app` in the default sibling path:

```bash
bun run sync:artifacts
bun --filter '@rustyflows/client' generate
```

Override the source checkout when needed:

```bash
RUSTYFLOWS_APP_DIR=/absolute/path/to/rustyflows-app bun run sync:artifacts
```

Always review the pinned artifacts and generated TypeScript in the same change.
`check:generated` verifies that committed TypeScript matches the committed
OpenAPI snapshot; the app repository independently guards its canonical spec.

## Validation

```bash
bun install --frozen-lockfile
bun run check:generated
bun run typecheck
bun run test
bun run build
bun run pack:dry-run
```

Public npm publishing remains blocked by the SDK open-source/release-readiness
gate; a successful package dry run is not publication approval.
