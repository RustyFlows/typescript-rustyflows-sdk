import { describe, expect, it } from "vitest";
import { readWorkflowStream, type WorkflowStreamEvent } from "./stream.js";
import { isJsonFloat, serializeJson, type JsonValue } from "./json.js";

async function collect(response: Response): Promise<WorkflowStreamEvent[]> {
  const events: WorkflowStreamEvent[] = [];
  for await (const event of readWorkflowStream(response)) events.push(event);
  return events;
}

function response(wire: string): Response {
  return new Response(wire, { headers: { "content-type": "text/event-stream" } });
}

const done = 'event: done\ndata: {"type":"done"}\n\n';

describe("typed message content", () => {
  it("consumes ImageProcess metadata objects and unchanged ordinary strings", async () => {
    const metadata: Extract<WorkflowStreamEvent, { type: "message" }> = {
      type: "message",
      content: { width: 8, height: 3, format: "png", size_bytes: 128 },
      step: "image_process"
    };
    const text: Extract<WorkflowStreamEvent, { type: "message" }> = {
      type: "message", content: "ordinary text", step: "map"
    };
    const events = await collect(response(
      `event: message\ndata: ${serializeJson(metadata)}\n\n` +
      `event: message\ndata: ${serializeJson(text)}\n\n` + done
    ));
    expect(events).toEqual([metadata, text, { type: "done" }]);
    const image = events[0];
    expect(image?.type).toBe("message");
    if (image?.type === "message") {
      const content: JsonValue = image.content;
      expect(content).toEqual(metadata.content);
      expect(typeof content).toBe("object");
    }
  });

  it("retains exact integers and floating intent inside chunked message JSON", async () => {
    const content = '{"signed":-9223372036854775808,"unsigned":18446744073709551615,"floating":1.0,"nested":[1e20,null,true]}';
    const wire = `event: message\ndata: {"type":"message","content":${content},"step":"image_process"}\n\n` + done;
    const bytes = new TextEncoder().encode(wire);
    const events = await collect(new Response(new ReadableStream<Uint8Array>({
      start(controller) {
        for (let offset = 0; offset < bytes.length; offset += 7) {
          controller.enqueue(bytes.slice(offset, offset + 7));
        }
        controller.close();
      }
    }), { headers: { "content-type": "text/event-stream" } }));
    const message = events[0];
    expect(message?.type).toBe("message");
    if (message?.type !== "message") throw new Error("expected typed message");
    const value = message.content as Record<string, JsonValue>;
    expect(value.signed).toBe(-9223372036854775808n);
    expect(value.unsigned).toBe(18446744073709551615n);
    expect(isJsonFloat(value.floating)).toBe(true);
    expect(isJsonFloat((value.nested as JsonValue[])[0])).toBe(true);
    expect(serializeJson(value)).toBe('{"signed":-9223372036854775808,"unsigned":18446744073709551615,"floating":1.0,"nested":[100000000000000000000.0,null,true]}');
    expect(events[1]).toEqual({ type: "done" });
  });
});

describe("additive typed SSE events", () => {
  it("ignores a future event between known events without losing their outcome", async () => {
    const events = await collect(response(
      'event: summary\ndata: {"type":"summary","trace":{"output":"ready"}}\n\n' +
      'event: future_telemetry\ndata: {"type":"future_telemetry","count":18446744073709551615}\n\n' +
      'event: step_end\ndata: {"type":"step_end","step_index":0,"duration_ms":12}\n\n' + done
    ));
    expect(events).toEqual([
      { type: "summary", trace: { output: "ready" } },
      { type: "step_end", step_index: 0, duration_ms: 12 },
      { type: "done" }
    ]);
  });

  it.each([
    'event: future_telemetry\ndata: {"type":"done"}\n\n',
    'event: future_telemetry\ndata: {"count":2}\n\n',
    'event: future_telemetry\ndata: ["future_telemetry"]\n\n',
    'event: step_end\ndata: {"type":"step_end","step_index":"invalid","duration_ms":12}\n\n'
  ])("still rejects malformed framing or a known event's invalid payload: %s", async (wire) => {
    await expect(collect(response(wire + done))).rejects.toMatchObject({ code: "protocol_error" });
  });

  it("does not accept an unknown event as completion or allow it after done", async () => {
    const future = 'event: future_telemetry\ndata: {"type":"future_telemetry"}\n\n';
    await expect(collect(response(future))).rejects.toMatchObject({ code: "incomplete_stream" });
    await expect(collect(response(done + future))).rejects.toMatchObject({ code: "protocol_error" });
  });
});
