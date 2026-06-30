# `@rustyflows/client`

Generated TypeScript transport client for RustyFlows.

## Source Artifacts

- `artifacts/openapi.json` is the pinned OpenAPI input for generation.
- `schemas/workflow-ir.schema.json` and `schemas/governed-workflow-package.schema.json`
  are pinned workflow/package schema artifacts for SDK and editor consumers.

Regenerate after artifact updates:

```bash
bun run generate
```

Check generated drift:

```bash
bun run check:generated
```

## Usage

```ts
import { createRustyFlowsClient } from "@rustyflows/client";

const client = createRustyFlowsClient({
  baseUrl: "https://api.example.com",
  token: process.env.RUSTYFLOWS_TOKEN
});

const health = await client.GET("/health");
```
