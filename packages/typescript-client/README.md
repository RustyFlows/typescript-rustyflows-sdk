# `@rustyflows/client`

Typed TypeScript transport for the RustyFlows API. The package combines
`openapi-typescript` generated paths/components with a small `openapi-fetch`
wrapper for base URL, authentication, organization context, and custom fetch
configuration.

This is a generated transport with small boundary helpers, not a workflow
authoring SDK or another execution runtime.

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

Use `headers` for request-wide headers and constructor `fetch` for a trusted
fetch implementation. Requests are pinned to the configured HTTP(S) origin,
including per-operation `baseUrl` overrides. Redirects are rejected before
credentials can be forwarded; a custom fetch must honor `Request.redirect`.
Per-operation fetch/Request/body-serializer/middleware overrides are rejected,
and guard-removal methods are not exposed. Same-origin per-operation headers
and cancellation remain supported.

Every API request sends `X-RustyFlows-API-Version: 1`; API responses must identify
that same major contract. HTTP rejection throws `RustyFlowsApiError` with the
canonical `code`, `message`, bounded `envelope.details`, status and headers.
Malformed envelopes/version negotiation and local boundary failures instead
throw `RustyFlowsTransportError`; they are not fabricated server errors.

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
  params: { header: { "Idempotency-Key": submissionKey } },
  body: {
    workflow_id: workflowId,
    input: {
      customer_id: "customer-123",
      invoice_total: 1250
    }
  }
});
```
Create a key once with `createIdempotencyKey()` (or supply your own 1..128 visible
ASCII bytes), retain it with the submission body, and reuse it on an ambiguous
lost-response retry. Required-key operations are derived from OpenAPI, not a
second endpoint list. The client never generates a new key inside a request,
retries automatically, or retries after the 24-hour retention. A new logical
submission needs a new key; changing the body under the same key conflicts.

`WorkflowRunRequest`, generated `JsonValue`, DataOp scalar literals and arbitrary
JSON responses retain the server's numeric kinds:

- Safe JSON integers use primitive `number`; exact wider i64/u64 integers use
  `bigint` (including `-9223372036854775808n` and `18446744073709551615n`).
- Non-integral finite binary64 values use primitive `number`.
- Integral binary64 values use native boxed `Number` (`JsonFloat`). Author them
  explicitly with `jsonFloat(1)`, `jsonFloat(1e20)` or `jsonFloat(-0)`. This matters
  for DataOp: a floating `1.0` divided by integer `2` yields `0.5`, not integer `0`.

```ts
import { jsonFloat, parseJson, serializeJson, type JsonValue } from "@rustyflows/client";

const input: JsonValue = { exact: 18446744073709551615n, floating: jsonFloat(1) };
const snapshot = serializeJson(structuredClone(input));
// {"exact":18446744073709551615,"floating":1.0} — numeric tokens, never strings.
const reopened = parseJson(snapshot);
```

Use `parseJson`/`serializeJson`, not native JSON parse/stringify, for arbitrary
workflow JSON, saved authoring state and preview payloads. `structuredClone`
retains both bigint and the native float wrapper. `isJsonFloat` identifies that
wrapper; `Number.prototype.valueOf.call(value)` reads its binary64 value.
This is transport JSON, not canonical package-hash bytes; consume server-owned
package digests instead of hashing this serializer's output.
The client uses the same codec for requests, JSON responses and typed SSE.
Schema-backed JSON responses are checked for their structural transport shape
before numeric normalization; malformed typed responses fail with `protocol_error`.
Schema-less JSON still receives the bounded JSON/numeric parsing rules, without
being promoted to a generated response type.
Schema-owned f64 DTO fields remain primitive `number` on receipt; their integer
tokens are accepted too. Schema-owned integer fields reject floating tokens.
Generated int64/uint64 fields accept `number | bigint`.

Runtime serialization rejects functions, undefined, symbols, non-finite numbers,
bare unsafe integral numbers (use bigint or explicit jsonFloat), out-of-range
integers, cycles, sparse arrays, accessors and nonnumeric class instances.
JSON parsing rejects malformed/nonfinite/out-of-range values. Both directions
bound depth to 128, values to 200,000 and numeric tokens to 1,024 characters on
input. Default JSON requests are bounded to 1 MiB, JSON responses to 8 MiB, and
error envelopes to 64 KiB. Endpoint-owned native downloads are separate.

## Knowledge Previews And Original Bytes

Preview text and passage ranges are bound to an immutable document version.
Ranges use UTF-8 byte offsets, not JavaScript UTF-16 string indices. Preserve the
returned `version_id` when opening an original; do not substitute the latest file.

```ts
const { data: preview } = await client.GET(
  "/api/knowledge/documents/{document_id}/preview",
  { params: { path: { document_id: documentId } } }
);

if (preview?.original_available) {
  const { data: original } = await client.GET(
    "/api/knowledge/documents/{document_id}/versions/{version_id}/original",
    {
      params: {
        path: { document_id: preview.document_id, version_id: preview.version_id }
      },
      headers: { Accept: "application/pdf, application/octet-stream" },
      parseAs: "arrayBuffer"
    }
  );
  // original is an ArrayBuffer, not transport JSON.
}
```

When `original_available` is false, display `unavailable_reason` rather than
reconstructing a historical original from a live URL. Original reads still
require current source authority; retaining a version ID does not retain access.

## Typed Streams And Recorded-State Reconnect

```ts
import { readWorkflowStream, reconnectWorkflowRun } from "@rustyflows/client";

const { response } = await client.POST("/api/workflows/stream", {
  params: { header: { "Idempotency-Key": submissionKey } },
  headers: { Accept: "text/event-stream" },
  body: { workflow_id: workflowId, input: { message: "Hello" } },
  parseAs: "stream"
});
for await (const event of readWorkflowStream(response)) {
  // event is generated StreamEvent; error and done remain distinct typed events.
  console.log(event.type);
}
// After disconnect, inspect only recorded state; this does not restart execution.
const snapshot = await reconnectWorkflowRun(client, runId, { systemId });
console.log(snapshot.gap, snapshot.run, snapshot.interactions);
```

The parser requires valid UTF-8, bounded frames (6 MiB including metadata),
matching `event`/JSON `type`, canonical generated event schemas, and a typed
`done`. EOF without done, malformed/oversized frames, and post-done events are
failures. Done ends the stream; it does **not** prove the run completed.
Message `content` is a lossless JSON value: ImageProcess metadata remains an
object, while ordinary text and transformed-image data URLs remain strings.
Inspect its type before rendering; do not parse text messages as encoded JSON.
Reconnect performs observational run/gate GETs with the selected system scope,
returns `gap: true`, and never replays tokens or provider/tool work. Inspect the
recorded state before choosing an explicit continuation mutation and its key.
OpenAI data-only SSE (`[DONE]`) is a separate owning protocol, not input for this
parser.

See the [server-side saved-workflow example](../../examples/README.md) for an
organization-scoped saved ID, typed success/rejection and equivalent raw HTTP.


## Public Types And Schemas

The package root exports generated OpenAPI `paths`, `operations`, `components`,
and `webhooks`, plus convenience aliases for `GovernedWorkflowPackage`,
`Workflow`, `WorkflowRunRequest`, `JsonValue`, `DataOpScalar` and `JsonFloat`.

Pinned JSON schemas are available through package exports:

```ts
import governedPackageSchema from "@rustyflows/client/schemas/governed-workflow-package.schema.json" with { type: "json" };
import workflowIrSchema from "@rustyflows/client/schemas/workflow-ir.schema.json" with { type: "json" };
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

Always review pinned artifacts and generated TypeScript together. The type
generator maps canonical arbitrary JSON/scalar schemas to the precise public
numeric representation. Runtime error/event schemas, schema-aware request and
response normalization, and required-key operation metadata come from that same
OpenAPI, without hand-maintained shadow wire DTOs. `check:generated` guards both
generated files against the committed snapshot.
The blocking cross-repository hook is:

```bash
RUSTYFLOWS_APP_DIR=/absolute/path/to/intended-app-checkout bun run check:source
```

It compares all canonical artifact bytes/digests and the source commit/dirty
state without modifying either checkout. The app integration gate must run
Rust-source/OpenAPI and monorepo web drift checks first, then invoke this hook
and SDK generation drift. SDK-local CI alone cannot establish upstream freshness.

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
