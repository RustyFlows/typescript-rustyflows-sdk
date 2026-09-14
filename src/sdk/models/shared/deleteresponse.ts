import * as z from "zod/v3";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * Generic success message (used for delete responses).
 */
export type DeleteResponse = {
  message: string;
};

/** @internal */
export const DeleteResponse$inboundSchema: z.ZodType<
  DeleteResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  message: z.string(),
});

export function deleteResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteResponse' from JSON`,
  );
}
