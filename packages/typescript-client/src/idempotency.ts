import { RustyFlowsTransportError } from "./errors.js";

export const IDEMPOTENCY_KEY_HEADER = "Idempotency-Key";

export function assertIdempotencyKey(key: unknown): asserts key is string {
  if (typeof key !== "string" || !/^[\x21-\x7e]{1,128}$/.test(key)) {
    throw new RustyFlowsTransportError("invalid_idempotency_key", "Idempotency-Key must contain 1..128 visible ASCII bytes");
  }
}

/** Create once per logical submission; persist and reuse for lost-response retries within 24 hours. */
export function createIdempotencyKey(): string { return globalThis.crypto.randomUUID(); }

export function idempotencyHeaders(key: string, headers?: HeadersInit): Headers {
  assertIdempotencyKey(key);
  const result = new Headers(headers);
  result.set(IDEMPOTENCY_KEY_HEADER, key);
  return result;
}
