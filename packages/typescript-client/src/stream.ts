import type { components } from "./generated/openapi.js";
import { streamEventTypes, transportSchemas } from "./generated/transport-schemas.js";
import type { RustyFlowsClient } from "./client.js";
import { RustyFlowsTransportError } from "./errors.js";
import { MAX_STREAM_FRAME_BYTES, parseJson } from "./json.js";
import { assertTransportSchema, normalizeTransportValue } from "./transport-schema.js";

export type WorkflowStreamEvent = components["schemas"]["StreamEvent"];
export type WorkflowStreamDone = Extract<WorkflowStreamEvent, { type: "done" }>;

const knownEventTypes = new Set(streamEventTypes);

/** RustyFlows typed SSE only; OpenAI data-only SSE is a separate protocol. */
export async function* readWorkflowStream(response: Response): AsyncGenerator<WorkflowStreamEvent> {
  if (!response.ok || response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() !== "text/event-stream" || !response.body) {
    await response.body?.cancel();
    throw new RustyFlowsTransportError("protocol_error", "Expected a successful text/event-stream response");
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let lineParts: string[] = [];
  let frameBytes = 0;
  let eventName: string | undefined;
  let data: string[] = [];
  let fields = new Set<string>();
  let terminal = false;
  let ended = false;
  let pendingCR = false;
  const count = (bytes: number) => {
    frameBytes += bytes;
    if (frameBytes > MAX_STREAM_FRAME_BYTES) throw new RustyFlowsTransportError("over_limit", "SSE frame exceeds 6 MiB");
  };
  const decode = (bytes?: Uint8Array, streaming = false): string => {
    try { return decoder.decode(bytes, { stream: streaming }); }
    catch { throw new RustyFlowsTransportError("protocol_error", "SSE contains invalid UTF-8"); }
  };
  const finishLine = (): WorkflowStreamEvent | undefined => {
    const line = lineParts.join("") + decode();
    lineParts = [];
    if (line === "") {
      frameBytes = 0;
      if (!fields.size && !data.length) return;
      if (!eventName || !data.length) throw new RustyFlowsTransportError("protocol_error", "SSE frames require event and JSON data");
      if (terminal) throw new RustyFlowsTransportError("protocol_error", "SSE event follows terminal done");
      const event = parseJson(data.join("\n"));
      if (event === null || typeof event !== "object" || Array.isArray(event)
        || !("type" in event) || typeof event.type !== "string" || event.type !== eventName) {
        throw new RustyFlowsTransportError("protocol_error", "SSE event and JSON type disagree");
      }
      eventName = undefined;
      data = [];
      fields = new Set();
      if (!knownEventTypes.has(event.type)) return;
      assertTransportSchema("StreamEvent", event);
      terminal = event.type === "done";
      return normalizeTransportValue(transportSchemas.StreamEvent, event) as WorkflowStreamEvent;
    }
    if (line.startsWith(":")) return;
    const colon = line.indexOf(":");
    const field = colon < 0 ? line : line.slice(0, colon);
    let value = colon < 0 ? "" : line.slice(colon + 1);
    if (value.startsWith(" ")) value = value.slice(1);
    if (field === "data") { data.push(value); return; }
    if (!["event", "id", "retry"].includes(field) || fields.has(field)) {
      throw new RustyFlowsTransportError("protocol_error", "Unknown or duplicate SSE field");
    }
    fields.add(field);
    if (field === "event") eventName = value;
    if ((field === "id" && value.includes("\0")) || (field === "retry" && !/^\d+$/.test(value))) {
      throw new RustyFlowsTransportError("protocol_error", "Invalid SSE field value");
    }
    // IDs/retry hints are metadata only: this SDK never reconnects or re-executes automatically.
  };
  try {
    for (;;) {
      const next = await reader.read();
      if (next.done) { ended = true; break; }
      const chunk = next.value;
      let offset = 0;
      while (offset < chunk.length) {
        if (pendingCR) {
          if (chunk[offset] === 10) { count(1); offset++; }
          pendingCR = false;
          const event = finishLine();
          if (event) yield event;
          if (offset === chunk.length) break;
        }
        let end = offset;
        while (end < chunk.length && chunk[end] !== 10 && chunk[end] !== 13) end++;
        count(end - offset);
        if (end > offset) lineParts.push(decode(chunk.subarray(offset, end), true));
        offset = end;
        if (offset < chunk.length) {
          count(1);
          pendingCR = chunk[offset] === 13;
          offset++;
          if (!pendingCR) {
            const event = finishLine();
            if (event) yield event;
          }
        }
      }
    }
    if (pendingCR) {
      const event = finishLine();
      if (event) yield event;
    }
    if (lineParts.length || fields.size || data.length || !terminal) {
      throw new RustyFlowsTransportError("incomplete_stream", "Stream ended without a complete typed done; inspect recorded run state before recovery");
    }
  } finally {
    try { if (!ended) await reader.cancel(); } finally { reader.releaseLock(); }
  }
}

/** Recorded state, not token replay. Never starts, resumes, resolves, or cancels work. */
export async function reconnectWorkflowRun(client: RustyFlowsClient, runId: string, options: { systemId?: string; signal?: AbortSignal } = {}) {
  const query = options.systemId ? { system_id: options.systemId } : {};
  const init = { params: { path: { run_id: runId }, query }, ...(options.signal ? { signal: options.signal } : {}) };
  const [run, interactions] = await Promise.all([
    client.GET("/api/analytics/runs/{run_id}", init),
    client.GET("/api/analytics/runs/{run_id}/gates", init)
  ]);
  if (run.data === undefined || interactions.data === undefined) {
    throw new RustyFlowsTransportError("protocol_error", "Recorded run inspection returned no snapshot");
  }
  return { gap: true as const, run: run.data, interactions: interactions.data };
}
