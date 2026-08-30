# Condition

Conditional execution configuration for any step.

## Example Usage

```typescript
import { Condition } from "rustyflows/sdk/models/shared";

let value: Condition = {
  template: "<value>",
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `template`                                                              | *string*                                                                | :heavy_check_mark:                                                      | Template expression that should evaluate to "true" to execute the step. |