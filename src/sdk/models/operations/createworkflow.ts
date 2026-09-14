import * as z from "zod/v3";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as shared from "../shared/index.js";

export type CreateWorkflowResponse = shared.ApiError | shared.WorkflowResponse;

/** @internal */
export const CreateWorkflowResponse$inboundSchema: z.ZodType<
  CreateWorkflowResponse,
  z.ZodTypeDef,
  unknown
> = z.union([
  shared.ApiError$inboundSchema,
  shared.WorkflowResponse$inboundSchema,
]);

export function createWorkflowResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateWorkflowResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateWorkflowResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateWorkflowResponse' from JSON`,
  );
}
