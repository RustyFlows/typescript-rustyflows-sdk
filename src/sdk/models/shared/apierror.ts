import * as z from "zod/v3";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * Generic API error payload.
 */
export type ApiError = {
  error: string;
};

/** @internal */
export const ApiError$inboundSchema: z.ZodType<
  ApiError,
  z.ZodTypeDef,
  unknown
> = z.object({
  error: z.string(),
});

export function apiErrorFromJSON(
  jsonString: string,
): SafeParseResult<ApiError, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ApiError$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ApiError' from JSON`,
  );
}
