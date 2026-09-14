import * as z from "zod/v3";
import { remap as remap$ } from "../../../lib/primitives.js";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import {
  PreflightIssue,
  PreflightIssue$inboundSchema,
} from "./preflightissue.js";

export type WorkflowPreflightResponse = {
  errors: Array<PreflightIssue>;
  ok: boolean;
  resolvedEnvironmentId?: string | null | undefined;
  warnings: Array<PreflightIssue>;
};

/** @internal */
export const WorkflowPreflightResponse$inboundSchema: z.ZodType<
  WorkflowPreflightResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  errors: z.array(PreflightIssue$inboundSchema),
  ok: z.boolean(),
  resolved_environment_id: z.nullable(z.string()).optional(),
  warnings: z.array(PreflightIssue$inboundSchema),
}).transform((v) => {
  return remap$(v, {
    "resolved_environment_id": "resolvedEnvironmentId",
  });
});

export function workflowPreflightResponseFromJSON(
  jsonString: string,
): SafeParseResult<WorkflowPreflightResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkflowPreflightResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkflowPreflightResponse' from JSON`,
  );
}
