# WorkflowListResponse

Paginated list of workflows.

## Example Usage

```typescript
import { WorkflowListResponse } from "rustyflows/sdk/models/shared";

let value: WorkflowListResponse = {
  total: 394980,
  workflows: [],
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `total`                                                                   | *number*                                                                  | :heavy_check_mark:                                                        | N/A                                                                       |
| `workflows`                                                               | [shared.WorkflowListRow](../../../sdk/models/shared/workflowlistrow.md)[] | :heavy_check_mark:                                                        | N/A                                                                       |