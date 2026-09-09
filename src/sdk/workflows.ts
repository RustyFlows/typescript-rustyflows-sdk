import { workflowsCreateWorkflow } from "../funcs/workflowsCreateWorkflow.js";
import { workflowsDeleteWorkflow } from "../funcs/workflowsDeleteWorkflow.js";
import { workflowsGetWorkflow } from "../funcs/workflowsGetWorkflow.js";
import { workflowsListWorkflows } from "../funcs/workflowsListWorkflows.js";
import { workflowsUpdateWorkflow } from "../funcs/workflowsUpdateWorkflow.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "./models/operations/index.js";
import * as shared from "./models/shared/index.js";
import { unwrapAsync } from "./types/fp.js";

export class Workflows extends ClientSDK {
  /**
   * POST /api/workflows
   */
  async createWorkflow(
    request: shared.WorkflowInsert,
    options?: RequestOptions,
  ): Promise<operations.CreateWorkflowResponse> {
    return unwrapAsync(workflowsCreateWorkflow(
      this,
      request,
      options,
    ));
  }

  /**
   * DELETE /api/workflows/{id}
   */
  async deleteWorkflow(
    request: operations.DeleteWorkflowRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteWorkflowResponse> {
    return unwrapAsync(workflowsDeleteWorkflow(
      this,
      request,
      options,
    ));
  }

  /**
   * GET /api/workflows/{id}
   */
  async getWorkflow(
    request: operations.GetWorkflowRequest,
    options?: RequestOptions,
  ): Promise<operations.GetWorkflowResponse> {
    return unwrapAsync(workflowsGetWorkflow(
      this,
      request,
      options,
    ));
  }

  /**
   * GET /api/workflows
   */
  async listWorkflows(
    request?: operations.ListWorkflowsRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListWorkflowsResponse> {
    return unwrapAsync(workflowsListWorkflows(
      this,
      request,
      options,
    ));
  }

  /**
   * PUT /api/workflows/{id}
   */
  async updateWorkflow(
    request: operations.UpdateWorkflowRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateWorkflowResponse> {
    return unwrapAsync(workflowsUpdateWorkflow(
      this,
      request,
      options,
    ));
  }
}
