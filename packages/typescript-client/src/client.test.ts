import { describe, expect, it } from "vitest";

import { createRustyFlowsClient, normalizeRustyFlowsBaseUrl } from "./client";

describe("normalizeRustyFlowsBaseUrl", () => {
  it("normalizes the configured API location", () => {
    expect(normalizeRustyFlowsBaseUrl(" https://api.example.com/// ")).toBe(
      "https://api.example.com"
    );
  });
});

describe("createRustyFlowsClient", () => {
  it("rejects a non-boolean preflight verdict instead of exposing truthy false evidence", async () => {
    const client = createRustyFlowsClient({
      baseUrl: "https://api.example.com",
      fetch: async () => Response.json({ ok: "false", errors: [], warnings: [] }, {
        headers: { "X-RustyFlows-API-Version": "1" }
      })
    });
    await expect(client.POST("/api/workflows/preflight", { body: {} })).rejects.toMatchObject({
      name: "RustyFlowsTransportError", code: "protocol_error"
    });
  });

  it("refuses and cancels an unversioned native completion stream", async () => {
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      cancel() { cancelled = true; }
    }, { highWaterMark: 0 });
    const client = createRustyFlowsClient({
      baseUrl: "https://api.example.com",
      fetch: async () => new Response(body, { headers: { "content-type": "text/event-stream" } })
    });
    await expect(client.POST("/v1/chat/completions", {
      body: { model: "fixture-model", messages: [{ role: "user", content: "Check the policy." }], stream: true },
      parseAs: "stream"
    })).rejects.toMatchObject({ name: "RustyFlowsTransportError", code: "protocol_error" });
    expect(cancelled).toBe(true);
  });
});
