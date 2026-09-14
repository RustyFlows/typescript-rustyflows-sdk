import * as z from "zod/v3";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as shared from "../shared/index.js";

export type DeleteWorkflowRequest = {
  /**
   * Workflow ID
   */
  id: string;
};

export type DeleteWorkflowResponse = shared.ApiError | shared.DeleteResponse;

/** @internal */
export type DeleteWorkflowRequest$Outbound = {
  id: string;
};

/** @internal */
export const DeleteWorkflowRequest$outboundSchema: z.ZodType<
  DeleteWorkflowRequest$Outbound,
  z.ZodTypeDef,
  DeleteWorkflowRequest
> = z.object({
  id: z.string(),
});

export function deleteWorkflowRequestToJSON(
  deleteWorkflowRequest: DeleteWorkflowRequest,
): string {
  return JSON.stringify(
    DeleteWorkflowRequest$outboundSchema.parse(deleteWorkflowRequest),
  );
}

/** @internal */
export const DeleteWorkflowResponse$inboundSchema: z.ZodType<
  DeleteWorkflowResponse,
  z.ZodTypeDef,
  unknown
> = z.union([
  shared.ApiError$inboundSchema,
  shared.DeleteResponse$inboundSchema,
]);

export function deleteWorkflowResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteWorkflowResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteWorkflowResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteWorkflowResponse' from JSON`,
  );
}
