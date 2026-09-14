# WorkflowResumeRequest

Public request body for resuming a failed or paused workflow run.
Authentication is injected from the bearer header and is not part of this contract.

## Example Usage

```typescript
import { WorkflowResumeRequest } from "rustyflows/sdk/models/shared";

let value: WorkflowResumeRequest = {
  runId: "a7e410f1-e6ed-4e9b-9927-0042d2a95930",
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `deploymentId`                                                        | *string*                                                              | :heavy_minus_sign:                                                    | N/A                                                                   |
| `environmentId`                                                       | *string*                                                              | :heavy_minus_sign:                                                    | N/A                                                                   |
| `fromStep`                                                            | *number*                                                              | :heavy_minus_sign:                                                    | N/A                                                                   |
| `providerParams`                                                      | [shared.ProviderParams](../../../sdk/models/shared/providerparams.md) | :heavy_minus_sign:                                                    | N/A                                                                   |
| `runId`                                                               | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `stream`                                                              | *boolean*                                                             | :heavy_minus_sign:                                                    | N/A                                                                   |
| `systemId`                                                            | *string*                                                              | :heavy_minus_sign:                                                    | N/A                                                                   |
| `variables`                                                           | Record<string, *string*>                                              | :heavy_minus_sign:                                                    | N/A                                                                   |