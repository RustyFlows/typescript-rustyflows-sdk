import type { components } from "./generated/openapi.js";

export type ApiError = components["schemas"]["ApiError"];
export type ApiErrorCode = components["schemas"]["ApiErrorCode"];

export class RustyFlowsApiError extends Error {
  readonly name = "RustyFlowsApiError";
  readonly code: ApiErrorCode;
  constructor(readonly status: number, readonly envelope: ApiError, readonly headers: Headers) {
    super(envelope.message);
    this.code = envelope.code;
  }
}

export type TransportErrorCode = "origin_mismatch" | "invalid_json" | "over_limit" | "protocol_error" | "incomplete_stream" | "invalid_idempotency_key";

/** A local transport failure, never fabricated as a server ApiError. */
export class RustyFlowsTransportError extends Error {
  readonly name = "RustyFlowsTransportError";
  constructor(readonly code: TransportErrorCode, message: string) { super(message); }
}
