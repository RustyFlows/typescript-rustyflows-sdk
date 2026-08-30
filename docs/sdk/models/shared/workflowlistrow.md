# WorkflowListRow

Summary row for workflow list (excludes node_positions for lighter payloads).

## Example Usage

```typescript
import { WorkflowListRow } from "rustyflows/sdk/models/shared";

let value: WorkflowListRow = {
  createdAt: "1713150609257",
  definition: "<value>",
  id: "21ee4b27-7dcb-4f43-8cfb-4da9ae1ee3f2",
  isActive: false,
  name: "<value>",
  updatedAt: "1735657929910",
  version: 656470,
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `authConfigId`                                                    | *string*                                                          | :heavy_minus_sign:                                                | N/A                                                               |
| `boundaryConfig`                                                  | *any*                                                             | :heavy_minus_sign:                                                | N/A                                                               |
| `boundaryType`                                                    | *string*                                                          | :heavy_minus_sign:                                                | N/A                                                               |
| `createdAt`                                                       | *string*                                                          | :heavy_check_mark:                                                | N/A                                                               |
| `defaultAuthConfigId`                                             | *string*                                                          | :heavy_minus_sign:                                                | Per-workflow auth config override.                                |
| `defaultDatabaseConfigId`                                         | *string*                                                          | :heavy_minus_sign:                                                | Per-workflow database config override.                            |
| `defaultStorageConfigId`                                          | *string*                                                          | :heavy_minus_sign:                                                | Per-workflow storage config override.                             |
| `defaultTestAccountId`                                            | *string*                                                          | :heavy_minus_sign:                                                | Default BYO test account for runs of this workflow.               |
| `definition`                                                      | *any*                                                             | :heavy_check_mark:                                                | N/A                                                               |
| `description`                                                     | *string*                                                          | :heavy_minus_sign:                                                | N/A                                                               |
| `executionScope`                                                  | *string*                                                          | :heavy_minus_sign:                                                | N/A                                                               |
| `exposeAsMcp`                                                     | *boolean*                                                         | :heavy_minus_sign:                                                | Whether this workflow is exposed as an MCP tool (default: false). |
| `id`                                                              | *string*                                                          | :heavy_check_mark:                                                | N/A                                                               |
| `identityStrategy`                                                | *string*                                                          | :heavy_minus_sign:                                                | N/A                                                               |
| `isActive`                                                        | *boolean*                                                         | :heavy_check_mark:                                                | N/A                                                               |
| `name`                                                            | *string*                                                          | :heavy_check_mark:                                                | N/A                                                               |
| `systemId`                                                        | *string*                                                          | :heavy_minus_sign:                                                | The system this workflow belongs to.                              |
| `updatedAt`                                                       | *string*                                                          | :heavy_check_mark:                                                | N/A                                                               |
| `version`                                                         | *number*                                                          | :heavy_check_mark:                                                | N/A                                                               |