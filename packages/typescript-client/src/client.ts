import createClient, { type Client } from "openapi-fetch";

import type { paths } from "./generated/openapi.js";
import { idempotentOperations, requestSchemas, responseSchemas } from "./generated/transport-schemas.js";
import { RustyFlowsApiError, RustyFlowsTransportError } from "./errors.js";
import { assertIdempotencyKey, IDEMPOTENCY_KEY_HEADER } from "./idempotency.js";
import { parseJson, readBoundedBody, serializeJson, type JsonSafe } from "./json.js";
import { assertTransportSchema, assertTransportValue, normalizeTransportValue } from "./transport-schema.js";

export const API_VERSION_HEADER = "X-RustyFlows-API-Version";
export const API_CONTRACT_MAJOR = "1";

export interface RustyFlowsClientOptions {
  baseUrl: string;
  token?: string;
  organizationId?: string;
  headers?: HeadersInit;
  /** Trusted fetch implementation; it must honor Request.redirect = "error". */
  fetch?: typeof globalThis.fetch;
}

export type RustyFlowsClient = Omit<Client<JsonSafe<paths>>, "use" | "eject">;

export function createRustyFlowsClient(options: RustyFlowsClientOptions): RustyFlowsClient {
  const baseUrl = normalizeRustyFlowsBaseUrl(options.baseUrl);
  const origin = new URL(baseUrl).origin;
  const headers = new Headers(options.headers);
  if (options.token) headers.set("authorization", `Bearer ${options.token}`);
  if (options.organizationId) headers.set("x-organization-id", options.organizationId);
  headers.set(API_VERSION_HEADER, API_CONTRACT_MAJOR);
  const fetcher = options.fetch ?? globalThis.fetch;
  const client = createClient<JsonSafe<paths>>({
    baseUrl, headers, bodySerializer: (body) => serializeJson(body),
    fetch: async (request) => {
      // Enforce at the final network boundary, including per-call baseUrl overrides.
      if (new URL(request.url).origin !== origin) {
        throw new RustyFlowsTransportError("origin_mismatch", "Requests must stay on the configured API origin");
      }
      const response = await fetcher(new Request(request, { redirect: "error" }));
      if (response.redirected || (response.url && new URL(response.url).origin !== origin)
        || (response.status >= 300 && response.status < 400)) {
        await response.body?.cancel();
        throw new RustyFlowsTransportError("origin_mismatch", "API redirects are not followed");
      }
      const pathname = new URL(request.url).pathname;
      if ((pathname.includes("/api/") || pathname.endsWith("/v1/chat/completions"))
        && response.headers.get(API_VERSION_HEADER) !== API_CONTRACT_MAJOR) {
        await response.body?.cancel();
        throw new RustyFlowsTransportError("protocol_error", "Missing or unsupported API response version");
      }
      const contentType = response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
      if (!response.ok) {
        if (contentType !== "application/json") {
          await response.body?.cancel();
          throw new RustyFlowsTransportError("protocol_error", "API rejection must use the canonical JSON error envelope");
        }
        const bytes = await readBoundedBody(response, 64 * 1024);
        const envelope = parseJson(bytes);
        assertTransportSchema("ApiError", envelope);
        throw new RustyFlowsApiError(response.status, envelope, response.headers);
      }
      if (contentType === "application/json" && response.status !== 204 && response.status !== 205 && request.method !== "HEAD") {
        const bytes = await readBoundedBody(response);
        const boundedHeaders = new Headers(response.headers);
        // openapi-fetch otherwise falls back to native JSON.parse for chunked bodies.
        boundedHeaders.set("content-length", String(bytes.byteLength));
        return new Response(bytes, { status: response.status, statusText: response.statusText, headers: boundedHeaders });
      }
      // SSE is consumed with readWorkflowStream; native downloads keep their owning bounds.
      return response;
    }
  });
  client.use({
    onRequest({ request, schemaPath }) {
      request.headers.set(API_VERSION_HEADER, API_CONTRACT_MAJOR);
      if (idempotentOperations.some((operation) => operation.path === schemaPath && operation.method === request.method)) {
        assertIdempotencyKey(request.headers.get(IDEMPOTENCY_KEY_HEADER));
      }
    },
    async onResponse({ request, schemaPath, response, options }) {
      if (response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() !== "application/json") {
        if (options.parseAs === "json" && response.body && request.method !== "HEAD" && response.status !== 204 && response.status !== 205) {
          await response.body.cancel();
          throw new RustyFlowsTransportError("protocol_error", "Expected an application/json response; use an explicit native download parse mode otherwise");
        }
        return;
      }
      const schemas = responseSchemas[`${request.method} ${schemaPath}`];
      const schema = schemas?.[String(response.status)] ?? schemas?.[`${Math.trunc(response.status / 100)}XX`] ?? schemas?.default;
      const lossless = (body: Response): Response => {
        const clone = body.clone.bind(body);
        Object.defineProperties(body, {
          json: { value: async () => {
            const value = parseJson(new Uint8Array(await body.arrayBuffer()));
            if (schema !== undefined) assertTransportValue(schema, value);
            return normalizeTransportValue(schema, value);
          } },
          clone: { value: () => lossless(clone()) }
        });
        return body;
      };
      return lossless(response);
    }
  });
  const wrap = <Fn>(method: Fn, httpMethod?: string): Fn => ((...args: unknown[]) => {
    const index = httpMethod ? 1 : 2;
    const init = args[index];
    if (init !== null && typeof init === "object") {
      for (const name of ["fetch", "Request", "bodySerializer", "middleware"]) {
        if ((init as Record<string, unknown>)[name] !== undefined) {
          throw new RustyFlowsTransportError("protocol_error", `Per-call ${name} cannot bypass the guarded transport`);
        }
      }
    }
    const methodName = httpMethod ?? String(args[0]).toUpperCase();
    const schemaPath = args[httpMethod ? 0 : 1];
    const schema = requestSchemas[`${methodName} ${schemaPath}`];
    args[index] = {
      ...(init !== null && typeof init === "object" ? init : {}),
      bodySerializer: (body: unknown) => serializeJson(normalizeTransportValue(schema, body, "request"))
    };
    return (method as (...values: unknown[]) => unknown)(...args);
  }) as Fn;
  // Do not expose middleware ejection or an alternate unguarded transport.
  return {
    request: wrap(client.request), GET: wrap(client.GET, "GET"), POST: wrap(client.POST, "POST"),
    PUT: wrap(client.PUT, "PUT"), PATCH: wrap(client.PATCH, "PATCH"), DELETE: wrap(client.DELETE, "DELETE"),
    HEAD: wrap(client.HEAD, "HEAD"), OPTIONS: wrap(client.OPTIONS, "OPTIONS"), TRACE: wrap(client.TRACE, "TRACE")
  };
}

export function normalizeRustyFlowsBaseUrl(baseUrl: string): string {
  const trimmed = baseUrl.trim();
  if (!trimmed) throw new Error("RustyFlows baseUrl is required");
  const url = new URL(trimmed);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new RustyFlowsTransportError("origin_mismatch", "API baseUrl must be an HTTP(S) URL without credentials, query, or fragment");
  }
  return url.href.replace(/\/+$/, "");
}
