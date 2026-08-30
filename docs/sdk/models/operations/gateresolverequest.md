# GateResolveRequest

## Example Usage

```typescript
import { GateResolveRequest } from "rustyflows/sdk/models/operations";

let value: GateResolveRequest = {
  gateResolveRequest: {
    response: "<value>",
  },
  gateId: "ae9a8c96-3361-45a8-8400-e04f1b06f93a",
};
```

## Fields

| Field                                                                         | Type                                                                          | Required                                                                      | Description                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `gateResolveRequest`                                                          | [shared.GateResolveRequest](../../../sdk/models/shared/gateresolverequest.md) | :heavy_check_mark:                                                            | N/A                                                                           |
| `gateId`                                                                      | *string*                                                                      | :heavy_check_mark:                                                            | Pending workflow gate ID                                                      |