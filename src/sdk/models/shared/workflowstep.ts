import * as z from "zod/v3";

/**
 * A workflow step (one of: Prompt, Map, Router, Parallel, Tool, Loop, ImageProcess, Generate, Gate, Supervisor, FanOut, Knowledge, DataOp, Ruleset, ReportGenerate)
 */
export type WorkflowStep = {};

/** @internal */
export type WorkflowStep$Outbound = {};

/** @internal */
export const WorkflowStep$outboundSchema: z.ZodType<
  WorkflowStep$Outbound,
  z.ZodTypeDef,
  WorkflowStep
> = z.object({});

export function workflowStepToJSON(workflowStep: WorkflowStep): string {
  return JSON.stringify(WorkflowStep$outboundSchema.parse(workflowStep));
}
