# WorkflowPreflightResponse

## Example Usage

```typescript
import { WorkflowPreflightResponse } from "rustyflows/sdk/models/shared";

let value: WorkflowPreflightResponse = {
  errors: [],
  ok: true,
  warnings: [],
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `errors`                                                                | [shared.PreflightIssue](../../../sdk/models/shared/preflightissue.md)[] | :heavy_check_mark:                                                      | N/A                                                                     |
| `ok`                                                                    | *boolean*                                                               | :heavy_check_mark:                                                      | N/A                                                                     |
| `resolvedEnvironmentId`                                                 | *string*                                                                | :heavy_minus_sign:                                                      | N/A                                                                     |
| `warnings`                                                              | [shared.PreflightIssue](../../../sdk/models/shared/preflightissue.md)[] | :heavy_check_mark:                                                      | N/A                                                                     |