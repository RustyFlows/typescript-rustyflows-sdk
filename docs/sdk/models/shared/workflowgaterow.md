# WorkflowGateRow

A row from the workflow_gates table.

## Example Usage

```typescript
import { WorkflowGateRow } from "rustyflows/sdk/models/shared";

let value: WorkflowGateRow = {
  createdAt: "1715255457481",
  gateType: "<value>",
  id: "e0afd897-4c13-4180-bdf7-35b0f0399c03",
  metadata: "<value>",
  prompt: "<value>",
  runId: "12362409-d037-41fc-942c-5ae1556afb3d",
  status: "<value>",
  stepIndex: 720702,
  stepTraces: "<value>",
  updatedAt: "1735673445263",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `contextSnapshot`  | *any*              | :heavy_minus_sign: | N/A                |
| `createdAt`        | *string*           | :heavy_check_mark: | N/A                |
| `deploymentId`     | *string*           | :heavy_minus_sign: | N/A                |
| `environmentId`    | *string*           | :heavy_minus_sign: | N/A                |
| `expiresAt`        | *string*           | :heavy_minus_sign: | N/A                |
| `gateType`         | *string*           | :heavy_check_mark: | N/A                |
| `id`               | *string*           | :heavy_check_mark: | N/A                |
| `metadata`         | *any*              | :heavy_check_mark: | N/A                |
| `options`          | *any*              | :heavy_minus_sign: | N/A                |
| `organizationId`   | *string*           | :heavy_minus_sign: | N/A                |
| `prompt`           | *string*           | :heavy_check_mark: | N/A                |
| `resolvedAt`       | *string*           | :heavy_minus_sign: | N/A                |
| `resolvedBy`       | *string*           | :heavy_minus_sign: | N/A                |
| `response`         | *any*              | :heavy_minus_sign: | N/A                |
| `runId`            | *string*           | :heavy_check_mark: | N/A                |
| `status`           | *string*           | :heavy_check_mark: | N/A                |
| `stepIndex`        | *number*           | :heavy_check_mark: | N/A                |
| `stepName`         | *string*           | :heavy_minus_sign: | N/A                |
| `stepTraces`       | *any*              | :heavy_check_mark: | N/A                |
| `timeoutAction`    | *string*           | :heavy_minus_sign: | N/A                |
| `updatedAt`        | *string*           | :heavy_check_mark: | N/A                |