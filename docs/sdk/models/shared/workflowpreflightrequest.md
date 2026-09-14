# WorkflowPreflightRequest

## Example Usage

```typescript
import { WorkflowPreflightRequest } from "rustyflows/sdk/models/shared";

let value: WorkflowPreflightRequest = {};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `definition`                                                              | *any*                                                                     | :heavy_minus_sign:                                                        | N/A                                                                       |
| `environmentId`                                                           | *string*                                                                  | :heavy_minus_sign:                                                        | Exact environment identity to validate for a plan or run.                 |
| `environmentSlug`                                                         | *string*                                                                  | :heavy_minus_sign:                                                        | Organization-scoped environment slug to resolve for a plan or run.        |
| `purpose`                                                                 | [shared.PreflightPurpose](../../../sdk/models/shared/preflightpurpose.md) | :heavy_minus_sign:                                                        | N/A                                                                       |
| `systemId`                                                                | *string*                                                                  | :heavy_minus_sign:                                                        | N/A                                                                       |
| `testAccountId`                                                           | *string*                                                                  | :heavy_minus_sign:                                                        | N/A                                                                       |
| `workflowId`                                                              | *string*                                                                  | :heavy_minus_sign:                                                        | N/A                                                                       |