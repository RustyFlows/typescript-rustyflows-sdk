import createClient, { type ClientOptions } from "openapi-fetch";

import type { paths } from "./generated/openapi.js";

export interface RustyFlowsClientOptions {
  baseUrl: string;
  token?: string;
  organizationId?: string;
  headers?: HeadersInit;
  fetch?: typeof globalThis.fetch;
}

export type RustyFlowsClient = ReturnType<typeof createRustyFlowsClient>;

export function createRustyFlowsClient(options: RustyFlowsClientOptions) {
  const headers = new Headers(options.headers);

  if (options.token) {
    headers.set("authorization", `Bearer ${options.token}`);
  }
  if (options.organizationId) {
    headers.set("x-organization-id", options.organizationId);
  }

  const clientOptions: ClientOptions = {
    baseUrl: normalizeRustyFlowsBaseUrl(options.baseUrl),
    headers
  };

  const customFetch = options.fetch;
  if (customFetch) {
    clientOptions.fetch = (request) => customFetch(request);
  }

  return createClient<paths>(clientOptions);
}

export function normalizeRustyFlowsBaseUrl(baseUrl: string): string {
  const trimmed = baseUrl.trim();

  if (!trimmed) {
    throw new Error("RustyFlows baseUrl is required");
  }

  return trimmed.replace(/\/+$/, "");
}
