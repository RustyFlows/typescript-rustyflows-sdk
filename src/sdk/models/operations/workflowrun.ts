import * as z from "zod/v3";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as shared from "../shared/index.js";

export type WorkflowRunResponse = shared.ApiError | any | any;

/** @internal */
export const WorkflowRunResponse$inboundSchema: z.ZodType<
  WorkflowRunResponse,
  z.ZodTypeDef,
  unknown
> = z.union([shared.ApiError$inboundSchema, z.any(), z.any()]);

export function workflowRunResponseFromJSON(
  jsonString: string,
): SafeParseResult<WorkflowRunResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkflowRunResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkflowRunResponse' from JSON`,
  );
}
