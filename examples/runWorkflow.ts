import {
  createRustyFlowsClient,
  RustyFlowsApiError,
  type WorkflowRunRequest
} from "../packages/typescript-client/src/index.js";

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} before running this server-side example`);
  return value;
};

const client = createRustyFlowsClient({
  baseUrl: required("RUSTYFLOWS_API_URL"),
  token: required("RUSTYFLOWS_TOKEN"),
  organizationId: required("RUSTYFLOWS_ORGANIZATION_ID")
});
// Persist this key with the logical submission. Reuse it after a lost response;
// do not generate a new key merely because this process was restarted.
const key = required("RUSTYFLOWS_IDEMPOTENCY_KEY");
const body = {
  workflow_id: required("RUSTYFLOWS_WORKFLOW_ID"),
  input: { message: "Hello from the server-side SDK example" }
} satisfies WorkflowRunRequest;

try {
  const { data, response } = await client.POST("/api/workflows/run", {
    params: { header: { "Idempotency-Key": key } },
    body
  });
  if ((response.status !== 200 && response.status !== 202) || data === undefined) {
    throw new Error("The run endpoint returned no supported typed success outcome");
  }
  // 202 means durable waiting, not a completed workflow. Inspect recorded state
  // before responding to an interaction; never replay start to reconnect.
  console.log(response.status === 202 ? "Run waiting for input" : "Run completed");
  console.log(data);
} catch (error) {
  if (error instanceof RustyFlowsApiError) {
    console.error(`RustyFlows rejected the run: ${error.status} ${error.code}: ${error.message}`);
    process.exitCode = 1;
  } else {
    // A lost response is ambiguous: retain the original key/body and inspect the
    // recorded run or retry that same submission within its 24-hour retention.
    throw error;
  }
}
