# WorkflowAttachmentRequest

Attachment object accepted by workflow execution endpoints.

## Example Usage

```typescript
import { WorkflowAttachmentRequest } from "rustyflows/sdk/models/shared";

let value: WorkflowAttachmentRequest = {
  attachmentType: "<value>",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `attachmentType`   | *string*           | :heavy_check_mark: | N/A                |
| `filename`         | *string*           | :heavy_minus_sign: | N/A                |
| `mediaType`        | *string*           | :heavy_minus_sign: | N/A                |
| `url`              | *string*           | :heavy_minus_sign: | N/A                |