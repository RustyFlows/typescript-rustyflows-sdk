# WorkflowRunRequestProviderParams

Optional per-call provider configuration.
Not all fields are used by every provider.

## Example Usage

```typescript
import { WorkflowRunRequestProviderParams } from "rustyflows/sdk/models/shared";

let value: WorkflowRunRequestProviderParams = {};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `candidateCount`   | *number*           | :heavy_minus_sign: | N/A                |
| `maxTokens`        | *number*           | :heavy_minus_sign: | N/A                |
| `temperature`      | *number*           | :heavy_minus_sign: | N/A                |
| `topK`             | *number*           | :heavy_minus_sign: | N/A                |
| `topP`             | *number*           | :heavy_minus_sign: | N/A                |