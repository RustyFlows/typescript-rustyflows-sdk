import { describe, expect, it } from "vitest";

import { createRustyFlowsClient, normalizeRustyFlowsBaseUrl } from "./client";
import type { components, paths } from "./generated/openapi";

type RequiredTransportPath =
  | "/api/workflows/preflight"
  | "/api/workflows/resume"
  | "/api/workflows/gates/{gate_id}/resolve"
  | "/api/analytics/runs/{run_id}/checkpoints"
  | "/api/control-plane/policies"
  | "/api/control-plane/rulesets"
  | "/api/control-plane/systems"
  | "/api/control-plane/credentials"
  | "/api/control-plane/platform-api-keys"
  | "/api/control-plane/service-accounts"
  | "/api/control-plane/usage/billing-events"
  | "/api/control-plane/audit-logs"
  | "/api/control-plane/subscription";

type MissingTransportPath = Exclude<RequiredTransportPath, keyof paths>;
const requiredTransportPathsPresent: MissingTransportPath extends never ? true : never = true;

type WorkflowRunRequest = components["schemas"]["WorkflowRunRequest"];
const structuredWorkflowInput: WorkflowRunRequest["input"] = {
  customer_id: "customer-123"
};

describe("normalizeRustyFlowsBaseUrl", () => {
  it("trims whitespace and trailing slashes", () => {
    expect(normalizeRustyFlowsBaseUrl(" https://api.example.com/// ")).toBe(
      "https://api.example.com"
    );
  });

  it("rejects empty base URLs", () => {
    expect(() => normalizeRustyFlowsBaseUrl("  ")).toThrow("baseUrl is required");
  });
});

describe("createRustyFlowsClient", () => {
  it("keeps the required SDK transport paths and structured input contract", () => {
    expect(requiredTransportPathsPresent).toBe(true);
    expect(structuredWorkflowInput).toEqual({ customer_id: "customer-123" });
  });

  it("adds auth and organization headers to typed requests", async () => {
    const requests: Request[] = [];
    const fetchMock: typeof fetch = async (input, init) => {
      const request = input instanceof Request ? input : new Request(input, init);
      requests.push(request);

      return new Response(JSON.stringify({ ok: true }), {
        headers: { "content-type": "application/json" },
        status: 200
      });
    };

    const client = createRustyFlowsClient({
      baseUrl: "https://api.example.com/",
      fetch: fetchMock,
      organizationId: "org_123",
      token: "rf_test_token"
    });

    await client.GET("/health");

    expect(requests).toHaveLength(1);
    expect(requests[0]?.url).toBe("https://api.example.com/health");
    expect(requests[0]?.headers.get("authorization")).toBe("Bearer rf_test_token");
    expect(requests[0]?.headers.get("x-organization-id")).toBe("org_123");
  });
});
