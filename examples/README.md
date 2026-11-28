# Saved-workflow server example

The example runs an already-saved canvas workflow using its organization-scoped
ID through the generated API client. It does not embed another runtime.

From the repository root, install the pinned workspace dependencies with
`bun install --frozen-lockfile`. Copy `.env.template` to `examples/.env`, fill in
the API URL, server-side credential, organization ID, saved workflow ID, and
one retained idempotency key, then run from this directory:

```bash
bun run runWorkflow.ts
```

The generated request and result are typechecked by the root `typecheck` command.
HTTP rejection is caught as `RustyFlowsApiError`, retaining status and canonical
code. A 202 result is waiting, not proof of completion. Missing/wrong-tenant
saved IDs remain API authorization/not-found decisions, not SDK fallbacks.

Retain the same key **and body** after an ambiguous network failure. Retry only
within the API's 24-hour retention; do not automatically retry after expiry.
For reconnect use `reconnectWorkflowRun` to inspect recorded run/interactions
with an explicit gap, not the start/resume POST. A new logical submission needs
a new key. Keep credentials out of browser bundles.

Equivalent raw API: `POST /api/workflows/run` with bearer and
`X-Organization-Id`, `X-RustyFlows-API-Version: 1`, `Idempotency-Key`, and JSON
`{"workflow_id":"<saved ID>","input":{"message":"Hello from the server-side SDK example"}}`.
