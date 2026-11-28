import { expect, it } from "vitest";
import { createRustyFlowsClient } from "./client";
import { RustyFlowsApiError, RustyFlowsTransportError } from "./errors";
import { assertIdempotencyKey, idempotencyHeaders } from "./idempotency";

it.each([undefined, null, 42, "", " ", "bad key", "\t", "\n", "\0", "\x7f", "é", "🚀", "a".repeat(129)])(
  "rejects an invalid runtime key before constructing submission headers: %j",
  (key) => {
    expect(() => assertIdempotencyKey(key)).toThrow(RustyFlowsTransportError);
    // JavaScript callers can supply values outside the TypeScript declaration.
    expect(() => idempotencyHeaders(key as string)).toThrow(RustyFlowsTransportError);
  }
);

it.each([undefined, "", "bad key", "é", "a".repeat(129)])(
  "does not send a workflow submission with an invalid or missing key: %j",
  async (key) => {
    let submissions = 0;
    const client = createRustyFlowsClient({
      baseUrl: "https://api.example.com",
      fetch: async () => {
        submissions++;
        throw new Error("An invalid submission reached fetch");
      }
    });
    const headers = key === undefined ? {} : { "Idempotency-Key": key };
    // Exercise the JavaScript surface, including truly omitted required headers.
    const submission = Reflect.apply(client.POST, client, ["/api/workflows/run", {
      headers,
      body: { workflow_id: "00000000-0000-0000-0000-000000000001", input: null }
    }]);
    await expect(submission).rejects.toMatchObject({
      name: "RustyFlowsTransportError", code: "invalid_idempotency_key"
    });
    expect(submissions).toBe(0);
  }
);

it.each([1, 128])("admits a %i-byte key through the actual client boundary", async (length) => {
  let submissions = 0;
  const client = createRustyFlowsClient({
    baseUrl: "https://api.example.com",
    fetch: async () => {
      submissions++;
      return Response.json({ code: "not_found", message: "Unavailable" }, {
        status: 404,
        headers: { "X-RustyFlows-API-Version": "1" }
      });
    }
  });
  const submission = Reflect.apply(client.POST, client, ["/api/workflows/run", {
    headers: idempotencyHeaders("a".repeat(length)),
    body: { workflow_id: "00000000-0000-0000-0000-000000000001", input: null }
  }]);
  // A typed server error proves admission; no key/header echo assertion is needed.
  await expect(submission).rejects.toBeInstanceOf(RustyFlowsApiError);
  expect(submissions).toBe(1);
});
