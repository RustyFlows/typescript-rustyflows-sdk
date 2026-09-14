# WorkflowResponse

Single workflow wrapper.

## Example Usage

```typescript
import { WorkflowResponse } from "rustyflows/sdk/models/shared";

let value: WorkflowResponse = {
  workflow: {
    createdAt: "1722567502650",
    definition: "<value>",
    id: "c9f0fcd4-208e-4f91-8101-882d4724a779",
    isActive: false,
    name: "<value>",
    updatedAt: "1735676434900",
    version: 820558,
  },
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `workflow`                                                              | [shared.WorkflowFullRow](../../../sdk/models/shared/workflowfullrow.md) | :heavy_check_mark:                                                      | Full workflow row including node_positions for the editor.              |