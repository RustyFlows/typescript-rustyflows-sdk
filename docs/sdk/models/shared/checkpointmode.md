# CheckpointMode

Checkpoint mode for workflow run tracking and resume support.

## Example Usage

```typescript
import { CheckpointMode } from "rustyflows/sdk/models/shared";

let value: CheckpointMode = "on_failure";
```

## Values

```typescript
"none" | "per_step" | "on_failure"
```