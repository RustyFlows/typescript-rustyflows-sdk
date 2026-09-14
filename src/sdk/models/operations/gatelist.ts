import * as z from "zod/v3";
import { remap as remap$ } from "../../../lib/primitives.js";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as shared from "../shared/index.js";

export type GateListRequest = {
  runId?: string | null | undefined;
  status?: string | null | undefined;
};

export type GateListResponse = shared.ApiError | Array<shared.WorkflowGateRow>;

/** @internal */
export type GateListRequest$Outbound = {
  run_id?: string | null | undefined;
  status?: string | null | undefined;
};

/** @internal */
export const GateListRequest$outboundSchema: z.ZodType<
  GateListRequest$Outbound,
  z.ZodTypeDef,
  GateListRequest
> = z.object({
  runId: z.nullable(z.string()).optional(),
  status: z.nullable(z.string()).optional(),
}).transform((v) => {
  return remap$(v, {
    runId: "run_id",
  });
});

export function gateListRequestToJSON(
  gateListRequest: GateListRequest,
): string {
  return JSON.stringify(GateListRequest$outboundSchema.parse(gateListRequest));
}

/** @internal */
export const GateListResponse$inboundSchema: z.ZodType<
  GateListResponse,
  z.ZodTypeDef,
  unknown
> = z.union([
  shared.ApiError$inboundSchema,
  z.array(shared.WorkflowGateRow$inboundSchema),
]);

export function gateListResponseFromJSON(
  jsonString: string,
): SafeParseResult<GateListResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GateListResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GateListResponse' from JSON`,
  );
}
