import * as z from "zod/v3";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as shared from "../shared/index.js";

export type WorkflowPreflightResponse =
  | shared.WorkflowPreflightResponse
  | shared.ApiError;

/** @internal */
export const WorkflowPreflightResponse$inboundSchema: z.ZodType<
  WorkflowPreflightResponse,
  z.ZodTypeDef,
  unknown
> = z.union([
  shared.WorkflowPreflightResponse$inboundSchema,
  shared.ApiError$inboundSchema,
]);

export function workflowPreflightResponseFromJSON(
  jsonString: string,
): SafeParseResult<WorkflowPreflightResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkflowPreflightResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkflowPreflightResponse' from JSON`,
  );
}
