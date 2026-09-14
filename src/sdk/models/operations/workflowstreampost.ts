import * as z from "zod/v3";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type WorkflowStreamPostResponse = string | string | string;

/** @internal */
export const WorkflowStreamPostResponse$inboundSchema: z.ZodType<
  WorkflowStreamPostResponse,
  z.ZodTypeDef,
  unknown
> = z.union([z.string(), z.string(), z.string()]);

export function workflowStreamPostResponseFromJSON(
  jsonString: string,
): SafeParseResult<WorkflowStreamPostResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkflowStreamPostResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkflowStreamPostResponse' from JSON`,
  );
}
