import * as z from "zod/v3";
import { remap as remap$ } from "../../../lib/primitives.js";
import { safeParse } from "../../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * Full workflow row including node_positions for the editor.
 */
export type WorkflowFullRow = {
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
  id: string;
  identityStrategy?: string | undefined;
  isActive: boolean;
  name: string;
  nodePositions?: any | null | undefined;
  /**
   * The system this workflow belongs to.
   */
  systemId?: string | null | undefined;
  updatedAt: string;
  version: number;
  /**
   * Visual-only canvas metadata (e.g., reroute waypoints). Opaque JSON blob owned by the frontend.
   */
  visualNodes?: any | null | undefined;
};

/** @internal */
export const WorkflowFullRow$inboundSchema: z.ZodType<
  WorkflowFullRow,
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
  id: z.string(),
  identity_strategy: z.string().optional(),
  is_active: z.boolean(),
  name: z.string(),
  node_positions: z.nullable(z.any()).optional(),
  system_id: z.nullable(z.string()).optional(),
  updated_at: z.string(),
  version: z.number().int(),
  visual_nodes: z.nullable(z.any()).optional(),
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
    "identity_strategy": "identityStrategy",
    "is_active": "isActive",
    "node_positions": "nodePositions",
    "system_id": "systemId",
    "updated_at": "updatedAt",
    "visual_nodes": "visualNodes",
  });
});

export function workflowFullRowFromJSON(
  jsonString: string,
): SafeParseResult<WorkflowFullRow, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkflowFullRow$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkflowFullRow' from JSON`,
  );
}
