import * as z from "zod/v3";
import { remap as remap$ } from "../../../lib/primitives.js";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * Summary row for workflow list (excludes node_positions for lighter payloads).
 */
export type WorkflowListRow = {
  authConfigId?: string | null | undefined;
  boundaryConfig?: any | undefined;
  boundaryType?: string | undefined;
  createdAt: string;
  /**
   * Per-workflow auth config override.
   */
  defaultAuthConfigId?: string | null | undefined;
  /**
   * Per-workflow database config override.
   */
  defaultDatabaseConfigId?: string | null | undefined;
  /**
   * Per-workflow storage config override.
   */
  defaultStorageConfigId?: string | null | undefined;
  /**
   * Default BYO test account for runs of this workflow.
   */
  defaultTestAccountId?: string | null | undefined;
  definition?: any | undefined;
  description?: string | null | undefined;
  executionScope?: string | undefined;
  /**
   * Whether this workflow is exposed as an MCP tool (default: false).
   */
  exposeAsMcp?: boolean | undefined;
  id: string;
  identityStrategy?: string | undefined;
  isActive: boolean;
  name: string;
  /**
   * The system this workflow belongs to.
   */
  systemId?: string | null | undefined;
  updatedAt: string;
  version: number;
};

/** @internal */
export const WorkflowListRow$inboundSchema: z.ZodType<
  WorkflowListRow,
  z.ZodTypeDef,
  unknown
> = z.object({
  auth_config_id: z.nullable(z.string()).optional(),
  boundary_config: z.any().optional(),
  boundary_type: z.string().optional(),
  created_at: z.string(),
  default_auth_config_id: z.nullable(z.string()).optional(),
  default_database_config_id: z.nullable(z.string()).optional(),
  default_storage_config_id: z.nullable(z.string()).optional(),
  default_test_account_id: z.nullable(z.string()).optional(),
  definition: z.any().optional(),
  description: z.nullable(z.string()).optional(),
  execution_scope: z.string().optional(),
  expose_as_mcp: z.boolean().optional(),
  id: z.string(),
  identity_strategy: z.string().optional(),
  is_active: z.boolean(),
  name: z.string(),
  system_id: z.nullable(z.string()).optional(),
  updated_at: z.string(),
  version: z.number().int(),
}).transform((v) => {
  return remap$(v, {
    "auth_config_id": "authConfigId",
    "boundary_config": "boundaryConfig",
    "boundary_type": "boundaryType",
    "created_at": "createdAt",
    "default_auth_config_id": "defaultAuthConfigId",
    "default_database_config_id": "defaultDatabaseConfigId",
    "default_storage_config_id": "defaultStorageConfigId",
    "default_test_account_id": "defaultTestAccountId",
    "execution_scope": "executionScope",
    "expose_as_mcp": "exposeAsMcp",
    "identity_strategy": "identityStrategy",
    "is_active": "isActive",
    "system_id": "systemId",
    "updated_at": "updatedAt",
  });
});

export function workflowListRowFromJSON(
  jsonString: string,
): SafeParseResult<WorkflowListRow, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkflowListRow$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkflowListRow' from JSON`,
  );
}
