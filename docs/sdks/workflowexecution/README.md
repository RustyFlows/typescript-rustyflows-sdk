# WorkflowExecution

## Overview

Workflow runtime execution endpoints

### Available Operations

* [workflowResume](#workflowresume) - Resume a previously failed or paused workflow run.
* [workflowRun](#workflowrun) - Run a workflow (non-streaming).
* [workflowStreamPost](#workflowstreampost) - Stream a workflow via POST (SSE).

## workflowResume

Body: `WorkflowResumeReq`
- `run_id`: UUID of the workflow run to resume.
- `from_step` (optional): Override which step to resume from.
- `stream` (default false): Whether to stream SSE events.
- `variables` (optional): Override variables to merge before resuming.
- `provider_params` (optional): Override provider params.

The run must have status "failed" or "paused". On success, returns the
workflow output (JSON or SSE stream depending on `stream` flag).

### Example Usage

<!-- UsageSnippet language="typescript" operationID="workflow_resume" method="post" path="/api/workflows/resume" -->
```typescript
import { SDK } from "rustyflows";

const sdk = new SDK({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await sdk.workflowExecution.workflowResume({
    runId: "fdc8292e-699b-4818-8f07-ac22e5fdde9f",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "rustyflows/core.js";
import { workflowExecutionWorkflowResume } from "rustyflows/funcs/workflowExecutionWorkflowResume.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await workflowExecutionWorkflowResume(sdk, {
    runId: "fdc8292e-699b-4818-8f07-ac22e5fdde9f",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("workflowExecutionWorkflowResume failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [shared.WorkflowResumeRequest](../../sdk/models/shared/workflowresumerequest.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.WorkflowResumeResponse](../../sdk/models/operations/workflowresumeresponse.md)\>**

### Errors

| Error Type      | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4XX, 5XX        | \*/\*           |

## workflowRun

Body: `WorkflowRunReq`
- Provide either `workflow` (inline) or `workflow_id` (DB lookup; currently unsupported).
- `input`: primary JSON input for the workflow; strings remain supported.
- `variables` (optional): key/value map for templating and routing.
- `provider_params` (optional): per-call LLM config.
Authentication is derived from the `Authorization` header; request bodies
cannot select the runtime bearer.

Returns JSON string: final workflow output or error.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="workflow_run" method="post" path="/api/workflows/run" -->
```typescript
import { SDK } from "rustyflows";

const sdk = new SDK({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await sdk.workflowExecution.workflowRun({
    input: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "rustyflows/core.js";
import { workflowExecutionWorkflowRun } from "rustyflows/funcs/workflowExecutionWorkflowRun.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await workflowExecutionWorkflowRun(sdk, {
    input: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("workflowExecutionWorkflowRun failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [shared.WorkflowRunRequest](../../sdk/models/shared/workflowrunrequest.md)                                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.WorkflowRunResponse](../../sdk/models/operations/workflowrunresponse.md)\>**

### Errors

| Error Type      | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4XX, 5XX        | \*/\*           |

## workflowStreamPost

Body: `WorkflowRunReq`
This endpoint always streams events for each step, where possible.
See event schema in response below.

Events (JSON):
- {"type":"meta","provider":"workflow","workflow":"<name|inline>"}
- {"type":"meta","provider":"<llm>","endpoint":"...","model":"..."}    // forwarded from prompt steps
- {"type":"delta","content":"..."}                                     // incremental tokens
- {"type":"message","content":"...","step":"map|router|parallel"}      // synthetic step messages
- {"type":"final","content":"..."}                                     // final workflow text
- {"type":"error","message":"..."}                                     // on errors
- {"type":"done"}

### Example Usage

<!-- UsageSnippet language="typescript" operationID="workflow_stream_post" method="post" path="/api/workflows/stream" -->
```typescript
import { SDK } from "rustyflows";

const sdk = new SDK({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await sdk.workflowExecution.workflowStreamPost({
    input: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "rustyflows/core.js";
import { workflowExecutionWorkflowStreamPost } from "rustyflows/funcs/workflowExecutionWorkflowStreamPost.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await workflowExecutionWorkflowStreamPost(sdk, {
    input: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("workflowExecutionWorkflowStreamPost failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [shared.WorkflowRunRequest](../../sdk/models/shared/workflowrunrequest.md)                                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.WorkflowStreamPostResponse](../../sdk/models/operations/workflowstreampostresponse.md)\>**

### Errors

| Error Type      | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4XX, 5XX        | \*/\*           |