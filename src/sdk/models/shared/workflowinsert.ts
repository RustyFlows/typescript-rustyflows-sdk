import * as z from "zod/v3";
import { remap as remap$ } from "../../../lib/primitives.js";

/**
 * Insert payload for creating a workflow.
 */
export type WorkflowInsert = {
  authConfigId?: string | null | undefined;
  boundaryConfig?: any | undefined;
  boundaryType?: string | undefined;
  defaultAuthConfigId?: string | null | undefined;
  defaultDatabaseConfigId?: string | null | undefined;
  defaultStorageConfigId?: string | null | undefined;
  defaultTestAccountId?: string | null | undefined;
  definition?: any | undefined;
  description?: string | null | undefined;
  executionScope?: string | undefined;
  identityStrategy?: string | undefined;
  name: string;
  nodePositions?: any | null | undefined;
  /**
   * Tenant organization ID — set server-side from auth context.
   */
  organizationId?: string | null | undefined;
  systemId?: string | null | undefined;
  visualNodes?: any | null | undefined;
};

/** @internal */
export type WorkflowInsert$Outbound = {
  auth_config_id?: string | null | undefined;
  boundary_config?: any | undefined;
  boundary_type?: string | undefined;
  default_auth_config_id?: string | null | undefined;
  default_database_config_id?: string | null | undefined;
  default_storage_config_id?: string | null | undefined;
  default_test_account_id?: string | null | undefined;
  definition?: any | undefined;
  description?: string | null | undefined;
  execution_scope?: string | undefined;
  identity_strategy?: string | undefined;
  name: string;
  node_positions?: any | null | undefined;
  organization_id?: string | null | undefined;
  system_id?: string | null | undefined;
  visual_nodes?: any | null | undefined;
};

/** @internal */
export const WorkflowInsert$outboundSchema: z.ZodType<
  WorkflowInsert$Outbound,
  z.ZodTypeDef,
  WorkflowInsert
> = z.object({
  authConfigId: z.nullable(z.string()).optional(),
  boundaryConfig: z.any().optional(),
  boundaryType: z.string().optional(),
  defaultAuthConfigId: z.nullable(z.string()).optional(),
  defaultDatabaseConfigId: z.nullable(z.string()).optional(),
  defaultStorageConfigId: z.nullable(z.string()).optional(),
  defaultTestAccountId: z.nullable(z.string()).optional(),
  definition: z.any().optional(),
  description: z.nullable(z.string()).optional(),
  executionScope: z.string().optional(),
  identityStrategy: z.string().optional(),
  name: z.string(),
  nodePositions: z.nullable(z.any()).optional(),
  organizationId: z.nullable(z.string()).optional(),
  systemId: z.nullable(z.string()).optional(),
  visualNodes: z.nullable(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    authConfigId: "auth_config_id",
    boundaryConfig: "boundary_config",
    boundaryType: "boundary_type",
    defaultAuthConfigId: "default_auth_config_id",
    defaultDatabaseConfigId: "default_database_config_id",
    defaultStorageConfigId: "default_storage_config_id",
    defaultTestAccountId: "default_test_account_id",
    executionScope: "execution_scope",
    identityStrategy: "identity_strategy",
    nodePositions: "node_positions",
    organizationId: "organization_id",
    systemId: "system_id",
    visualNodes: "visual_nodes",
  });
});

export function workflowInsertToJSON(workflowInsert: WorkflowInsert): string {
  return JSON.stringify(WorkflowInsert$outboundSchema.parse(workflowInsert));
}
