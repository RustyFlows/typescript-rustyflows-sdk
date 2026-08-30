# ListWorkflowsRequest

## Example Usage

```typescript
import { ListWorkflowsRequest } from "rustyflows/sdk/models/operations";

let value: ListWorkflowsRequest = {};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `limit`                                                  | *number*                                                 | :heavy_minus_sign:                                       | Maximum number of workflows to return (default: 20).     |
| `offset`                                                 | *number*                                                 | :heavy_minus_sign:                                       | Number of workflows to skip for pagination (default: 0). |
| `q`                                                      | *string*                                                 | :heavy_minus_sign:                                       | Optional search query to filter workflows by name.       |