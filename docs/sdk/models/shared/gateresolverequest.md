# GateResolveRequest

Public gate-resolution payload. Authentication is supplied by headers.

## Example Usage

```typescript
import { GateResolveRequest } from "rustyflows/sdk/models/shared";

let value: GateResolveRequest = {
  response: "<value>",
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `attachments`                                                         | *any*[]                                                               | :heavy_minus_sign:                                                    | Optional attachments exposed to downstream steps.                     |
| `response`                                                            | *any*                                                                 | :heavy_check_mark:                                                    | Boolean for approval gates, string for input/select gates.            |
| `resume`                                                              | *boolean*                                                             | :heavy_minus_sign:                                                    | Resume workflow execution after resolving the gate. Defaults to true. |
| `stream`                                                              | *boolean*                                                             | :heavy_minus_sign:                                                    | Stream resumed workflow output as SSE. Defaults to false.             |
| `systemId`                                                            | *string*                                                              | :heavy_minus_sign:                                                    | Original System identity used to select the same runtime backend.     |