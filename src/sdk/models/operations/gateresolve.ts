import * as z from "zod/v3";
import { remap as remap$ } from "../../../lib/primitives.js";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as shared from "../shared/index.js";

export type GateResolveRequest = {
  gateResolveRequest: shared.GateResolveRequest;
  /**
   * Pending workflow gate ID
   */
  gateId: string;
};

export type GateResolveResponse = shared.ApiError | any;

/** @internal */
export type GateResolveRequest$Outbound = {
  GateResolveRequest: shared.GateResolveRequest$Outbound;
  gate_id: string;
};

/** @internal */
export const GateResolveRequest$outboundSchema: z.ZodType<
  GateResolveRequest$Outbound,
  z.ZodTypeDef,
  GateResolveRequest
> = z.object({
  gateResolveRequest: shared.GateResolveRequest$outboundSchema,
  gateId: z.string(),
}).transform((v) => {
  return remap$(v, {
    gateResolveRequest: "GateResolveRequest",
    gateId: "gate_id",
  });
});

export function gateResolveRequestToJSON(
  gateResolveRequest: GateResolveRequest,
): string {
  return JSON.stringify(
    GateResolveRequest$outboundSchema.parse(gateResolveRequest),
  );
}

/** @internal */
export const GateResolveResponse$inboundSchema: z.ZodType<
  GateResolveResponse,
  z.ZodTypeDef,
  unknown
> = z.union([shared.ApiError$inboundSchema, z.any()]);

export function gateResolveResponseFromJSON(
  jsonString: string,
): SafeParseResult<GateResolveResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GateResolveResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GateResolveResponse' from JSON`,
  );
}
