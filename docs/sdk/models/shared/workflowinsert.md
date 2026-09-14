# WorkflowInsert

Insert payload for creating a workflow.

## Example Usage

```typescript
import { WorkflowInsert } from "rustyflows/sdk/models/shared";

let value: WorkflowInsert = {
  definition: "<value>",
  name: "<value>",
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `authConfigId`                                              | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `boundaryConfig`                                            | *any*                                                       | :heavy_minus_sign:                                          | N/A                                                         |
| `boundaryType`                                              | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `defaultAuthConfigId`                                       | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `defaultDatabaseConfigId`                                   | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `defaultStorageConfigId`                                    | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `defaultTestAccountId`                                      | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `definition`                                                | *any*                                                       | :heavy_check_mark:                                          | N/A                                                         |
| `description`                                               | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `executionScope`                                            | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `identityStrategy`                                          | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `name`                                                      | *string*                                                    | :heavy_check_mark:                                          | N/A                                                         |
| `nodePositions`                                             | *any*                                                       | :heavy_minus_sign:                                          | N/A                                                         |
| `organizationId`                                            | *string*                                                    | :heavy_minus_sign:                                          | Tenant organization ID — set server-side from auth context. |
| `systemId`                                                  | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `visualNodes`                                               | *any*                                                       | :heavy_minus_sign:                                          | N/A                                                         |