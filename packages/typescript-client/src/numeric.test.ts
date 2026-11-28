import { describe, expect, it } from "vitest";
import {
  API_VERSION_HEADER, createRustyFlowsClient, isJsonFloat, jsonFloat, parseJson,
  readWorkflowStream, serializeJson,
  type components, type DataOpScalar, type JsonSafe, type JsonValue, type WorkflowStreamEvent, RustyFlowsApiError
} from "./index.js";
import { transportSchemas } from "./generated/transport-schemas.js";
import { assertTransportSchema, normalizeTransportValue } from "./transport-schema.js";

const signed = -9223372036854775808n;
const unsigned = 18446744073709551615n;
const numericText = '{"signed":-9223372036854775808,"unsigned":18446744073709551615,"floating":1.0,"large_float":1e20}';
// These are consumer-facing type regressions, checked again after regeneration.
const generatedJson: components["schemas"]["JsonValue"] = { signed, unsigned, floating: jsonFloat(1) };
const scalar: DataOpScalar = jsonFloat(1);
const division: JsonSafe<components["schemas"]["ColumnExpr"]> = {
  type: "Math", op: "div",
  left: { type: "Literal", value: scalar },
  right: { type: "Literal", value: 2 }
};

function assertNumericObject(value: unknown) {
  expect(value).toMatchObject({ signed, unsigned });
  const object = value as Record<string, unknown>;
  expect(isJsonFloat(object.floating)).toBe(true);
  expect(Number.prototype.valueOf.call(object.floating)).toBe(1);
  expect(isJsonFloat(object.large_float)).toBe(true);
  expect(Number.prototype.valueOf.call(object.large_float)).toBe(1e20);
}

function jsonResponse(text: string, length = false): Response {
  const headers = new Headers({ "content-type": "application/json", [API_VERSION_HEADER]: "1" });
  if (length) headers.set("content-length", String(new TextEncoder().encode(text).byteLength));
  return new Response(text, { headers });
}

describe("lossless public JSON codec", () => {
  it("retains exact signed/unsigned extremes and ordinary integer ergonomics", () => {
    expect(parseJson("-9223372036854775808")).toBe(signed);
    expect(parseJson("18446744073709551615")).toBe(unsigned);
    expect(parseJson("9007199254740993")).toBe(9007199254740993n);
    expect(parseJson("9007199254740991")).toBe(9007199254740991);
    expect(parseJson("1")).toBe(1);
    expect(serializeJson(generatedJson)).toBe('{"signed":-9223372036854775808,"unsigned":18446744073709551615,"floating":1.0}');
    expect(serializeJson([signed, unsigned])).toBe("[-9223372036854775808,18446744073709551615]");
  });

  it.each([
    ["1.0", 1], ["1e18", 1e18], ["1e20", 1e20], ["1e308", 1e308],
    ["9007199254740993.0", 9007199254740992], ["-0", -0], ["-0.0", -0],
    ["1e-400", 0], ["-1e-400", -0]
  ])("retains floating intent for %s through clone and save/reopen", (text, expected) => {
    const parsed = parseJson(text as string);
    expect(isJsonFloat(parsed)).toBe(true);
    expect(Object.is(Number.prototype.valueOf.call(parsed), expected)).toBe(true);
    const reopened = parseJson(serializeJson(structuredClone(parsed)));
    expect(isJsonFloat(reopened)).toBe(true);
    expect(Object.is(Number.prototype.valueOf.call(reopened), expected)).toBe(true);
  });

  it("keeps fractional primitive floats and 1.0 division intent without string coercion", () => {
    expect(parseJson("1.25")).toBe(1.25);
    expect(serializeJson(jsonFloat(1))).toBe("1.0");
    expect(serializeJson(jsonFloat(-0))).toBe("-0.0");
    expect(serializeJson(-0)).toBe("-0.0");
    const encoded = serializeJson(division);
    expect(encoded).toContain('"left":{"type":"Literal","value":1.0}');
    expect(encoded).toContain('"right":{"type":"Literal","value":2}');
    expect(serializeJson(parseJson(encoded))).toBe(encoded);
  });

  it.each(["", "+1", "01", "1.", ".1", "1e", "[1,]", '{"x":01}', "true false", '"\\x"'])(
    "rejects malformed input %s", (text) => expect(() => parseJson(text)).toThrow()
  );

  it.each(["1e309", "-1e309", "18446744073709551616", "-9223372036854775809"])(
    "rejects nonfinite or out-of-domain input %s", (text) => expect(() => parseJson(text)).toThrow()
  );

  it("rejects invalid UTF-8 and byte, numeric-token, depth and node overages", () => {
    expect(() => parseJson(new Uint8Array([0xff]))).toThrow();
    expect(() => parseJson('"é"', 3)).toThrow();
    expect(() => parseJson(`1.${"0".repeat(1024)}`)).toThrow();
    expect(() => parseJson(`${"[".repeat(129)}0${"]".repeat(129)}`)).toThrow();
    expect(() => parseJson(`[${new Array(200_000).fill("0").join(",")}]`)).toThrow();
    expect(() => serializeJson("é", 3)).toThrow();
    expect(() => serializeJson(new Array(200_000).fill(0))).toThrow();
  });

  it.each([1e20, Infinity, NaN, unsigned + 1n, signed - 1n, new Number(Infinity)])(
    "rejects ambiguous, nonfinite and out-of-domain authored numbers %s", (value) => expect(() => serializeJson(value)).toThrow()
  );

  it("rejects lossy non-JSON authoring instead of invoking accessors", () => {
    let invoked = false;
    const accessor = { get value() { invoked = true; return 1; } };
    expect(() => serializeJson(accessor)).toThrow();
    expect(invoked).toBe(false);
    expect(() => serializeJson([, 1])).toThrow();
    expect(() => serializeJson({ value: undefined })).toThrow();
    const cycle: Record<string, unknown> = {};
    cycle.self = cycle;
    expect(() => serializeJson(cycle)).toThrow();
    expect(() => jsonFloat(Infinity)).toThrow();
  });

  it("does not invoke inherited proto setters while parsing arbitrary objects", () => {
    const value = parseJson('{"__proto__":{"floating":1.0},"signed":-9223372036854775808}') as Record<string, JsonValue>;
    expect(Object.getPrototypeOf(value)).toBe(Object.prototype);
    expect(Object.hasOwn(value, "__proto__")).toBe(true);
    expect(serializeJson(value)).toBe('{"__proto__":{"floating":1.0},"signed":-9223372036854775808}');
  });
});

describe("generated JSON schema numeric kinds", () => {
  it("accepts precise arbitrary JSON while keeping native float boxes out of the object branch", () => {
    for (const value of [signed, unsigned, jsonFloat(1), jsonFloat(1e20), parseJson(numericText), generatedJson]) {
      expect(() => assertTransportSchema("JsonValue", value)).not.toThrow();
    }
    for (const value of [undefined, 1e20, Infinity, unsigned + 1n, new Number(Infinity)]) {
      expect(() => assertTransportSchema("JsonValue", value)).toThrow();
    }
  });

  it("normalizes schema-owned binary64 numbers but never arbitrary JSON", () => {
    expect(normalizeTransportValue({ type: "number", format: "double" }, jsonFloat(1))).toBe(1);
    expect(normalizeTransportValue({ type: "number", format: "double" }, 1)).toBe(1);
    expect(normalizeTransportValue({ type: "number", format: "double" }, signed)).toBe(Number(signed));
    const arbitrary = parseJson(numericText);
    expect(normalizeTransportValue({ $ref: "#/components/schemas/JsonValue" }, arbitrary)).toBe(arbitrary);
    expect(() => normalizeTransportValue({ type: "integer" }, jsonFloat(1))).toThrow();
    expect(transportSchemas.JsonValue).toBeDefined();
  });

  it("prepares typed floating request fields without mutating or invoking input accessors", () => {
    const schema = { type: "object", properties: { amount: { type: "number" } } };
    const input = { amount: 1e20 };
    const prepared = normalizeTransportValue(schema, input, "request");
    expect(serializeJson(prepared)).toBe('{"amount":100000000000000000000.0}');
    expect(input.amount).toBe(1e20);
    expect(isJsonFloat(input.amount)).toBe(false);
    let invoked = false;
    const accessor = { get amount() { invoked = true; return 1; } };
    expect(() => serializeJson(normalizeTransportValue(schema, accessor, "request"))).toThrow();
    expect(invoked).toBe(false);
  });
});

describe("consumer request, response and SSE preservation", () => {
  it.each([false, true])("preserves request and response JSON with explicit content-length=%s", async (length) => {
    let requestText = "";
    const responseText = `{"content":"ok","trace":{"run_id":"00000000-0000-0000-0000-000000000001","total_ms":1,"steps":[${numericText}]}}`;
    const client = createRustyFlowsClient({
      baseUrl: "https://api.example.com",
      fetch: async (request) => {
        requestText = await new Request(request).text();
        return jsonResponse(responseText, length);
      }
    });
    const input = parseJson(numericText);
    const { data } = await client.POST("/api/workflows/run", {
      params: { header: { "Idempotency-Key": "numeric-preservation" } },
      body: { workflow_id: "00000000-0000-0000-0000-000000000002", input, provider_params: { temperature: 1e20 } }
    });
    expect(requestText).toContain('"signed":-9223372036854775808');
    expect(requestText).toContain('"unsigned":18446744073709551615');
    expect(requestText).toContain('"floating":1.0');
    expect(requestText).toContain('"temperature":100000000000000000000.0');
    if (!data || !("trace" in data)) throw new Error("Expected a completed workflow response");
    assertNumericObject(data.trace.steps[0]);
  });

  it("does not normalize arbitrary unsafe integral input merely because typed DTO floats exist", async () => {
    let fetched = false;
    const client = createRustyFlowsClient({
      baseUrl: "https://api.example.com",
      fetch: async () => { fetched = true; return jsonResponse("{}"); }
    });
    await expect(client.POST("/api/workflows/run", {
      params: { header: { "Idempotency-Key": "ambiguous-integer" } },
      body: { workflow_id: "00000000-0000-0000-0000-000000000002", input: { unsafe: 1e20 } }
    })).rejects.toThrow();
    expect(fetched).toBe(false);
  });

  it("preserves numeric types in canonical API rejection details", async () => {
    const client = createRustyFlowsClient({
      baseUrl: "https://api.example.com",
      fetch: async () => new Response(`{"code":"invalid_input","message":"Rejected","details":${numericText}}`, {
        status: 400, headers: { "content-type": "application/json", [API_VERSION_HEADER]: "1" }
      })
    });
    try { await client.GET("/health"); throw new Error("Expected canonical rejection"); }
    catch (error) {
      expect(error).toBeInstanceOf(RustyFlowsApiError);
      if (error instanceof RustyFlowsApiError) assertNumericObject(error.envelope.details);
    }
  });

  it("preserves arbitrary response.json() and cloned response consumption", async () => {
    const client = createRustyFlowsClient({ baseUrl: "https://api.example.com", fetch: async () => jsonResponse(numericText) });
    const { response } = await client.GET("/health", { parseAs: "stream" });
    const clone = response.clone();
    assertNumericObject(await clone.json());
    assertNumericObject(await response.json());
  });

  it("never falls through to a native JSON parser for an unexpected response media type", async () => {
    const client = createRustyFlowsClient({
      baseUrl: "https://api.example.com",
      fetch: async () => new Response(numericText, { headers: { "content-type": "text/plain" } })
    });
    await expect(client.GET("/health")).rejects.toThrow("Expected an application/json response");
  });

  it("validates and preserves summary JSON across chunked SSE and keeps typed floats ergonomic", async () => {
    const text = `event: summary\ndata: {"type":"summary","trace":${numericText}}\n\nevent: knowledge_results\ndata: {"type":"knowledge_results","step_index":0,"source_ids":[],"query":"q","results_count":1,"top_similarity":1.0}\n\nevent: done\ndata: {"type":"done"}\n\n`;
    const bytes = new TextEncoder().encode(text);
    const response = new Response(new ReadableStream<Uint8Array>({
      start(controller) { for (let index = 0; index < bytes.length; index += 7) controller.enqueue(bytes.slice(index, index + 7)); controller.close(); }
    }), { headers: { "content-type": "text/event-stream" } });
    const events: WorkflowStreamEvent[] = [];
    for await (const event of readWorkflowStream(response)) events.push(event);
    const summary = events[0];
    expect(summary?.type).toBe("summary");
    if (summary?.type === "summary") assertNumericObject(summary.trace);
    const knowledge = events[1];
    expect(knowledge?.type).toBe("knowledge_results");
    if (knowledge?.type === "knowledge_results") expect(knowledge.top_similarity).toBe(1);
    expect(events[2]?.type).toBe("done");
  });

  it("preserves exact u64 typed SSE fields", async () => {
    const response = new Response('event: step_end\ndata: {"type":"step_end","step_index":0,"duration_ms":18446744073709551615}\n\nevent: done\ndata: {"type":"done"}\n\n', { headers: { "content-type": "text/event-stream" } });
    const events: WorkflowStreamEvent[] = [];
    for await (const event of readWorkflowStream(response)) events.push(event);
    const step = events[0];
    expect(step?.type).toBe("step_end");
    if (step?.type === "step_end") expect(step.duration_ms).toBe(unsigned);
  });

  it("rejects a floating token in a generated integer SSE field", async () => {
    const response = new Response('event: step_end\ndata: {"type":"step_end","step_index":0,"duration_ms":1.0}\n\nevent: done\ndata: {"type":"done"}\n\n', { headers: { "content-type": "text/event-stream" } });
    await expect((async () => { for await (const _ of readWorkflowStream(response)) { /* consume */ } })()).rejects.toThrow();
  });
});
