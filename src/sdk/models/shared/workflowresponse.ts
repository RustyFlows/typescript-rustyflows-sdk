import * as z from "zod/v3";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import {
  WorkflowFullRow,
  WorkflowFullRow$inboundSchema,
} from "./workflowfullrow.js";

/**
 * Single workflow wrapper.
 */
export type WorkflowResponse = {
  /**
   * Full workflow row including node_positions for the editor.
   */
  workflow: WorkflowFullRow;
};

/** @internal */
export const WorkflowResponse$inboundSchema: z.ZodType<
  WorkflowResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  workflow: WorkflowFullRow$inboundSchema,
});

export function workflowResponseFromJSON(
  jsonString: string,
): SafeParseResult<WorkflowResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkflowResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkflowResponse' from JSON`,
  );
}
