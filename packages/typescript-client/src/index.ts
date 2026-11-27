import type { components } from "./generated/openapi.js";
import type { JsonSafe } from "./json.js";

export { API_CONTRACT_MAJOR, API_VERSION_HEADER, createRustyFlowsClient, normalizeRustyFlowsBaseUrl } from "./client.js";
export type { RustyFlowsClient, RustyFlowsClientOptions } from "./client.js";
export type { components, operations, paths, webhooks } from "./generated/openapi.js";

export type GovernedWorkflowPackage = JsonSafe<components["schemas"]["GovernedWorkflowPackage"]>;
export type Workflow = JsonSafe<components["schemas"]["Workflow"]>;
export type WorkflowRunRequest = JsonSafe<components["schemas"]["WorkflowRunRequest"]>;
export { RustyFlowsApiError, RustyFlowsTransportError } from "./errors.js";
export type { ApiError, ApiErrorCode, TransportErrorCode } from "./errors.js";
export { createIdempotencyKey, idempotencyHeaders, IDEMPOTENCY_KEY_HEADER } from "./idempotency.js";
export { MAX_JSON_REQUEST_BYTES, MAX_JSON_RESPONSE_BYTES, MAX_STREAM_FRAME_BYTES, isJsonFloat, jsonFloat, parseJson, serializeJson } from "./json.js";
export type { DataOpScalar, JsonFloat, JsonSafe, JsonValue } from "./json.js";
export { readWorkflowStream, reconnectWorkflowRun } from "./stream.js";
export type { WorkflowStreamEvent, WorkflowStreamDone } from "./stream.js";
