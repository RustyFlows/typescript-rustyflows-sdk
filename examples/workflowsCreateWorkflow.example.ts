import dotenv from "dotenv";
dotenv.config();
/**
 * Example usage of the rustyflows SDK
 *
 * To run this example from the examples directory:
 * npm run build && npx tsx workflowsCreateWorkflow.example.ts
 */

import { SDK } from "rustyflows";

const sdk = new SDK({
  serverURL: "https://api.example.com",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function main() {
  const result = await sdk.workflows.createWorkflow({
    definition: "<value>",
    name: "<value>",
  });

  console.log(result);
}

main().catch(console.error);
