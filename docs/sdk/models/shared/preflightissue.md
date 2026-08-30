# PreflightIssue

## Example Usage

```typescript
import { PreflightIssue } from "rustyflows/sdk/models/shared";

let value: PreflightIssue = {
  code: "<value>",
  message: "<value>",
  path: "/Library",
  severity: "<value>",
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `code`                                                    | *string*                                                  | :heavy_check_mark:                                        | N/A                                                       |
| `help`                                                    | *string*                                                  | :heavy_minus_sign:                                        | N/A                                                       |
| `location`                                                | [shared.Location](../../../sdk/models/shared/location.md) | :heavy_minus_sign:                                        | N/A                                                       |
| `message`                                                 | *string*                                                  | :heavy_check_mark:                                        | N/A                                                       |
| `metadata`                                                | Record<string, *string*>                                  | :heavy_minus_sign:                                        | N/A                                                       |
| `path`                                                    | *string*                                                  | :heavy_check_mark:                                        | N/A                                                       |
| `referenceId`                                             | *string*                                                  | :heavy_minus_sign:                                        | N/A                                                       |
| `related`                                                 | [shared.Related](../../../sdk/models/shared/related.md)[] | :heavy_minus_sign:                                        | N/A                                                       |
| `severity`                                                | *string*                                                  | :heavy_check_mark:                                        | N/A                                                       |
| `stepKind`                                                | *string*                                                  | :heavy_minus_sign:                                        | N/A                                                       |
| `stepName`                                                | *string*                                                  | :heavy_minus_sign:                                        | N/A                                                       |