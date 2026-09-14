import { SDKCore } from "../core.js";
import { encodeJSON } from "../lib/encodings.js";
import { matchStatusCode } from "../lib/http.js";
import * as M from "../lib/matchers.js";
import { compactMap } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../sdk/models/errors/httpclienterrors.js";
import { ResponseValidationError } from "../sdk/models/errors/responsevalidationerror.js";
import { SDKBaseError } from "../sdk/models/errors/sdkbaseerror.js";
import { SDKValidationError } from "../sdk/models/errors/sdkvalidationerror.js";
import * as operations from "../sdk/models/operations/index.js";
import * as shared from "../sdk/models/shared/index.js";
import { APICall, APIPromise } from "../sdk/types/async.js";
import { Result } from "../sdk/types/fp.js";

/**
 * Stream a workflow via POST (SSE).
 *
 * @remarks
 * Body: `WorkflowRunReq`
 * This endpoint always streams events for each step, where possible.
 * See event schema in response below.
 *
 * Events (JSON):
 * - {"type":"meta","provider":"workflow","workflow":"<name|inline>"}
 * - {"type":"meta","provider":"<llm>","endpoint":"...","model":"..."}    // forwarded from prompt steps
 * - {"type":"delta","content":"..."}                                     // incremental tokens
 * - {"type":"message","content":"...","step":"map|router|parallel"}      // synthetic step messages
 * - {"type":"final","content":"..."}                                     // final workflow text
 * - {"type":"error","message":"..."}                                     // on errors
 * - {"type":"done"}
 */
export function workflowExecutionWorkflowStreamPost(
  client: SDKCore,
  request: shared.WorkflowRunRequest,
  options?: RequestOptions,
): APIPromise<
  Result<
    operations.WorkflowStreamPostResponse,
    | SDKBaseError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >
> {
  return new APIPromise($do(
    client,
    request,
    options,
  ));
}

async function $do(
  client: SDKCore,
  request: shared.WorkflowRunRequest,
  options?: RequestOptions,
): Promise<
  [
    Result<
      operations.WorkflowStreamPostResponse,
      | SDKBaseError
      | ResponseValidationError
      | ConnectionError
      | RequestAbortedError
      | RequestTimeoutError
      | InvalidRequestError
      | UnexpectedClientError
      | SDKValidationError
    >,
    APICall,
  ]
> {
  const parsed = safeParse(
    request,
    (value) => shared.WorkflowRunRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload, { explode: true });

  const path = pathToFunc("/api/workflows/stream")();

  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  }));

  const secConfig = await extractSecurity(client._options.bearerAuth);
  const securityInput = secConfig == null ? {} : { bearerAuth: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "workflow_stream_post",
    oAuth2Scopes: null,

    resolvedSecurity: requestSecurity,

    securitySource: client._options.bearerAuth,
    retryConfig: options?.retries
      || client._options.retryConfig
      || { strategy: "none" },
    retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
  };

  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path: path,
    headers: headers,
    body: body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    isErrorStatusCode: (statusCode: number) =>
      matchStatusCode({ status: statusCode } as Response, []),
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes,
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;

  const [result] = await M.match<
    operations.WorkflowStreamPostResponse,
    | SDKBaseError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >(
    M.text(200, operations.WorkflowStreamPostResponse$inboundSchema, {
      ctype: "text/event-stream",
    }),
    M.text(400, operations.WorkflowStreamPostResponse$inboundSchema, {
      ctype: "text/event-stream",
    }),
    M.text(404, operations.WorkflowStreamPostResponse$inboundSchema, {
      ctype: "text/event-stream",
    }),
  )(response, req);
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }

  return [result, { status: "complete", request: req, response }];
}
