import { rustyflows } from '../rustyflows';

// Initialize the client
const client = new rustyflows({
  BASE: 'http://localhost:8080',
  TOKEN: 'rf_your_bearer_token_here',
  HEADERS: {
    'X-Organization-Id': 'your-org-uuid',
  },
});

async function main() {
  try {
    // 1. List workflows
    console.log('=== List Workflows ===');
    const list = await client.workflows.listWorkflows({ limit: 20 });
    console.log(`Found ${list.workflows?.length ?? 0} workflows`);
    list.workflows?.forEach(w => console.log(`  - ${w.name} (${w.id})`));

    if (!list.workflows?.length) return;

    // 2. Get a single workflow
    const firstId = list.workflows[0].id;
    console.log(`\n=== Get Workflow ${firstId} ===');
    const workflow = await client.workflows.getWorkflow({ id: firstId });
    console.log(`Name: ${workflow.name}`);
    console.log(`Version: ${workflow.version}`);

    // 3. Run a workflow
    console.log('\n=== Run Workflow ===');
    const runResult = await client.workflowExecution.workflowRun({
      requestBody: {
        workflow: workflow,
        input: { message: 'Hello from SDK' },
        environment_slug: 'dev',
      },
    });
    console.log('Run result:', runResult);

  } catch (err: any) {
    console.error('Error:', err.message);
    if (err.response) console.error('Response:', err.response);
  }
}

main();
