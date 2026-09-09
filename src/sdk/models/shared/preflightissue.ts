import * as z from "zod/v3";
import { remap as remap$ } from "../../../lib/primitives.js";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type Location = {};

export type Related = {};

export type PreflightIssue = {
  code: string;
  help?: string | null | undefined;
  location?: Location | undefined;
  message: string;
  metadata?: { [k: string]: string } | undefined;
  path: string;
  referenceId?: string | null | undefined;
  related?: Array<Related> | undefined;
  severity: string;
  stepKind?: string | null | undefined;
  stepName?: string | null | undefined;
};

/** @internal */
export const Location$inboundSchema: z.ZodType<
  Location,
  z.ZodTypeDef,
  unknown
> = z.object({});

export function locationFromJSON(
  jsonString: string,
): SafeParseResult<Location, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Location$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Location' from JSON`,
  );
}

/** @internal */
export const Related$inboundSchema: z.ZodType<Related, z.ZodTypeDef, unknown> =
  z.object({});

export function relatedFromJSON(
  jsonString: string,
): SafeParseResult<Related, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Related$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Related' from JSON`,
  );
}

/** @internal */
export const PreflightIssue$inboundSchema: z.ZodType<
  PreflightIssue,
  z.ZodTypeDef,
  unknown
> = z.object({
  code: z.string(),
  help: z.nullable(z.string()).optional(),
  location: z.lazy(() => Location$inboundSchema).optional(),
  message: z.string(),
  metadata: z.record(z.string()).optional(),
  path: z.string(),
  reference_id: z.nullable(z.string()).optional(),
  related: z.array(z.lazy(() => Related$inboundSchema)).optional(),
  severity: z.string(),
  step_kind: z.nullable(z.string()).optional(),
  step_name: z.nullable(z.string()).optional(),
}).transform((v) => {
  return remap$(v, {
    "reference_id": "referenceId",
    "step_kind": "stepKind",
    "step_name": "stepName",
  });
});

export function preflightIssueFromJSON(
  jsonString: string,
): SafeParseResult<PreflightIssue, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PreflightIssue$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PreflightIssue' from JSON`,
  );
}
