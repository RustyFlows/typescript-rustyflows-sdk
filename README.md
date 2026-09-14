# rustyflows - TypeScript SDK

TypeScript client for the RustyFlows Workflows API.

## Installation

```bash
npm install rustyflows
# or
yarn add rustyflows
# or
pnpm add rustyflows
```

## Quick Start

```typescript
import { rustyflows } from 'rustyflows';

const client = new rustyflows({
  BASE: 'http://localhost:8080',           // API base URL
  TOKEN: 'rf_your_bearer_token',           // Bearer token
  HEADERS: {
    'X-Organization-Id': 'your-org-uuid',  // Tenant context
  },
});

async function main() {
  // 1. List workflows
  const list = await client.workflows.listWorkflows({ limit: 20 });
  console.log(`Found ${list.workflows?.length ?? 0} workflows`);

  // 2. Get a single workflow
  const workflow = await client.workflows.getWorkflow({ id: 'uuid-here' });

  // 3. Run a workflow
  const result = await client.workflowExecution.workflowRun({
    requestBody: {
      workflow: workflow,
      input: { message: 'Hello' },
      environment_slug: 'dev',
    },
  });
  console.log('Run result:', result);
}

main();
```

## Core API

| Service | Method | Description |
|---------|--------|-------------|
| `workflows` | `listWorkflows({limit, offset, q})` | Paginated list of workflows |
| `workflows` | `getWorkflow({id})` | Get a single workflow details |
| `workflows` | `createWorkflow({requestBody})` | Create a workflow |
| `workflows` | `updateWorkflow({id, requestBody})` | Update a workflow |
| `workflows` | `deleteWorkflow({id})` | Delete a workflow |
| `workflowExecution` | `workflowRun({requestBody})` | Run a workflow (non-streaming) |
| `workflowExecution` | `workflowStreamPost({requestBody})` | Run a workflow (SSE streaming) |
| `workflowExecution` | `workflowResume({requestBody})` | Resume a workflow run |
| `workflowGates` | `resolveGate({gateId, requestBody})` | Resolve a human-in-the-loop gate |
| `workflowValidation` | `workflowPreflight({requestBody})` | Preflight validate a workflow |

## Authentication

Configure authentication via the constructor:

```typescript
const client = new rustyflows({
  BASE: 'https://api.rustyflows.com',
  TOKEN: 'rf_...',           // Bearer token
  HEADERS: {
    'X-Organization-Id': 'org-uuid',  // Tenant context (required)
  },
});
```

- `TOKEN` → `Authorization: Bearer <token>`
- `HEADERS['X-Organization-Id']` → `X-Organization-Id` header

## Running the Example

```bash
npm install
npm run example
```

## Type Safety

The SDK is generated from the OpenAPI spec, providing full TypeScript types for all requests and responses.

<!-- Start Summary [summary] -->
## Summary

RustyFlows API: AI Workflow Orchestration Framework — OpenAPI specification.

Authenticated endpoints accept a session JWT or `pk_` platform API key through the `Authorization: Bearer ...` header. Tenant-scoped calls should also send `X-Organization-Id`.
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [rustyflows - TypeScript SDK](#rustyflows-typescript-sdk)
  * [Installation](#installation)
  * [Quick Start](#quick-start)
  * [Core API](#core-api)
  * [Authentication](#authentication)
  * [Running the Example](#running-the-example)
  * [Type Safety](#type-safety)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication-1)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add <UNSET>
```

### PNPM

```bash
pnpm add <UNSET>
```

### Bun

```bash
bun add <UNSET>
```

### Yarn

```bash
yarn add <UNSET>
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

```typescript
import { SDK } from "rustyflows";

const sdk = new SDK({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await sdk.workflows.createWorkflow({
    definition: "<value>",
    name: "<value>",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name         | Type | Scheme      |
| ------------ | ---- | ----------- |
| `bearerAuth` | http | HTTP Bearer |

To authenticate with the API the `bearerAuth` parameter must be set when initializing the SDK client instance. For example:
```typescript
import { SDK } from "rustyflows";

const sdk = new SDK({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await sdk.workflows.createWorkflow({
    definition: "<value>",
    name: "<value>",
  });

  console.log(result);
}

run();

```
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [WorkflowExecution](docs/sdks/workflowexecution/README.md)

* [workflowResume](docs/sdks/workflowexecution/README.md#workflowresume) - Resume a previously failed or paused workflow run.
* [workflowRun](docs/sdks/workflowexecution/README.md#workflowrun) - Run a workflow (non-streaming).
* [workflowStreamPost](docs/sdks/workflowexecution/README.md#workflowstreampost) - Stream a workflow via POST (SSE).

### [WorkflowGates](docs/sdks/workflowgates/README.md)

* [gateList](docs/sdks/workflowgates/README.md#gatelist) - List workflow gates.
* [gateResolve](docs/sdks/workflowgates/README.md#gateresolve)

### [WorkflowValidation](docs/sdks/workflowvalidation/README.md)

* [workflowPreflight](docs/sdks/workflowvalidation/README.md#workflowpreflight)

### [Workflows](docs/sdks/workflows/README.md)

* [createWorkflow](docs/sdks/workflows/README.md#createworkflow) - POST /api/workflows
* [deleteWorkflow](docs/sdks/workflows/README.md#deleteworkflow) - DELETE /api/workflows/{id}
* [getWorkflow](docs/sdks/workflows/README.md#getworkflow) - GET /api/workflows/{id}
* [listWorkflows](docs/sdks/workflows/README.md#listworkflows) - GET /api/workflows
* [updateWorkflow](docs/sdks/workflows/README.md#updateworkflow) - PUT /api/workflows/{id}

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`workflowExecutionWorkflowResume`](docs/sdks/workflowexecution/README.md#workflowresume) - Resume a previously failed or paused workflow run.
- [`workflowExecutionWorkflowRun`](docs/sdks/workflowexecution/README.md#workflowrun) - Run a workflow (non-streaming).
- [`workflowExecutionWorkflowStreamPost`](docs/sdks/workflowexecution/README.md#workflowstreampost) - Stream a workflow via POST (SSE).
- [`workflowGatesGateList`](docs/sdks/workflowgates/README.md#gatelist) - List workflow gates.
- [`workflowGatesGateResolve`](docs/sdks/workflowgates/README.md#gateresolve)
- [`workflowsCreateWorkflow`](docs/sdks/workflows/README.md#createworkflow) - POST /api/workflows
- [`workflowsDeleteWorkflow`](docs/sdks/workflows/README.md#deleteworkflow) - DELETE /api/workflows/{id}
- [`workflowsGetWorkflow`](docs/sdks/workflows/README.md#getworkflow) - GET /api/workflows/{id}
- [`workflowsListWorkflows`](docs/sdks/workflows/README.md#listworkflows) - GET /api/workflows
- [`workflowsUpdateWorkflow`](docs/sdks/workflows/README.md#updateworkflow) - PUT /api/workflows/{id}
- [`workflowValidationWorkflowPreflight`](docs/sdks/workflowvalidation/README.md#workflowpreflight)

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { SDK } from "rustyflows";

const sdk = new SDK({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await sdk.workflows.createWorkflow({
    definition: "<value>",
    name: "<value>",
  }, {
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { SDK } from "rustyflows";

const sdk = new SDK({
  serverURL: "https://api.example.com",
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await sdk.workflows.createWorkflow({
    definition: "<value>",
    name: "<value>",
  });

  console.log(result);
}

run();

```
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

[`SDKBaseError`](./src/sdk/models/errors/sdkbaseerror.ts) is the base class for all HTTP error responses. It has the following properties:

| Property            | Type       | Description                                            |
| ------------------- | ---------- | ------------------------------------------------------ |
| `error.message`     | `string`   | Error message                                          |
| `error.statusCode`  | `number`   | HTTP response status code eg `404`                     |
| `error.headers`     | `Headers`  | HTTP response headers                                  |
| `error.body`        | `string`   | HTTP body. Can be empty string if no body is returned. |
| `error.rawResponse` | `Response` | Raw HTTP response                                      |

### Example
```typescript
import { SDK } from "rustyflows";
import * as errors from "rustyflows/sdk/models/errors";

const sdk = new SDK({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  try {
    const result = await sdk.workflows.createWorkflow({
      definition: "<value>",
      name: "<value>",
    });

    console.log(result);
  } catch (error) {
    if (error instanceof errors.SDKBaseError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);
    }
  }
}

run();

```

### Error Classes
**Primary error:**
* [`SDKBaseError`](./src/sdk/models/errors/sdkbaseerror.ts): The base class for HTTP error responses.

<details><summary>Less common errors (6)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/sdk/models/errors/httpclienterrors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/sdk/models/errors/httpclienterrors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/sdk/models/errors/httpclienterrors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/sdk/models/errors/httpclienterrors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/sdk/models/errors/httpclienterrors.ts): Unrecognised or unexpected error.


**Inherit from [`SDKBaseError`](./src/sdk/models/errors/sdkbaseerror.ts)**:
* [`ResponseValidationError`](./src/sdk/models/errors/responsevalidationerror.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>
<!-- End Error Handling [errors] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to:
- route requests through a proxy server using [undici](https://www.npmjs.com/package/undici)'s ProxyAgent
- use the `"beforeRequest"` hook to add a custom header and a timeout to requests
- use the `"requestError"` hook to log errors

```typescript
import { SDK } from "rustyflows";
import { ProxyAgent } from "undici";
import { HTTPClient } from "rustyflows/lib/http";

const dispatcher = new ProxyAgent("http://proxy.example.com:8080");

const httpClient = new HTTPClient({
  // 'fetcher' takes a function that has the same signature as native 'fetch'.
  fetcher: (input, init) =>
    // 'dispatcher' is specific to undici and not part of the standard Fetch API.
    fetch(input, { ...init, dispatcher } as RequestInit),
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new SDK({ httpClient: httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { SDK } from "rustyflows";

const sdk = new SDK({ debugLogger: console });
```
<!-- End Debugging [debug] -->
