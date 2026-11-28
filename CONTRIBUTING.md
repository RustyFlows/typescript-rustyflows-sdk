# Contributing to This Repository

The Rust API owns transport DTOs and semantics. Change its reviewed Rust source,
generate the app OpenAPI/workflow schemas, then sync the intended source checkout
with `RUSTYFLOWS_APP_DIR=... bun run sync:artifacts` and regenerate this repository.
Never hand-edit `packages/typescript-client/src/generated` or pinned artifacts.
The small authentication, origin, JSON, error, idempotency, and stream helpers are
hand-written here; focused fixes to those helpers are welcome.

## How to Report Issues

If you encounter any bugs or have suggestions for improvements, please open an issue on GitHub. When reporting an issue, please provide as much detail as possible to help us reproduce the problem. This includes:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected and actual behavior
- Any relevant logs, screenshots, or error messages
- Information about your environment (e.g., operating system, software versions)
    - For example can be collected using the `npx envinfo` command from your terminal if you have Node.js installed

## Issue Triage and Upstream Fixes

API/schema fixes belong upstream; SDK transport-helper fixes belong here.
Review pinned artifact hashes, source commit/dirty state, and generated output
together. `RUSTYFLOWS_APP_DIR=... bun run check:source` is the non-mutating
cross-repository artifact/provenance hook. The app's source/OpenAPI/web drift
checks must run before it; SDK-local generated drift alone is not that chain.
No npm release is authorized by implementation changes or a package dry run.

## Source compatibility CI prerequisites

- SDK CI checks out the exact app `source_commit` in
  `packages/typescript-client/artifacts/source.json`; CI rejects dirty provenance.
  Generate and synchronize final artifacts from a clean, committed canonical app
  checkout. Missing source or any source/generated mismatch fails the gate.
  SSH and HTTPS source clones are accepted, but synchronization always records
  `https://github.com/RustyFlows/rustyflows-app.git`. Resynchronize an older
  noncanonical manifest; local provenance checks enforce the same URL as CI.
- Provision a dedicated private GitHub App with **Contents: read** (plus GitHub's
  implicit metadata read), no other permissions or subscribed events, installed
  on **RustyFlows/rustyflows-app only**. Store its App ID in the SDK repository
  Actions variable `RUSTYFLOWS_APP_SOURCE_APP_ID` and private key only in the SDK
  Actions secret `RUSTYFLOWS_APP_SOURCE_APP_PRIVATE_KEY`. Do not reuse a personal
  token, runtime credential or an App with broader access; never put the private
  key in source, examples, artifacts or logs. Organization deploy-key restrictions
  remain unchanged.
  CI explicitly scopes its short-lived installation token to that repository and
  Contents:read, revokes it at job completion, and does not persist checkout
  credentials. The SDK-scoped `GITHUB_TOKEN` remains **Contents: read** and cannot
  read the private app repository. Missing App credentials fail before checkout;
  there is no deploy-key, personal-token, `dev` or copied-artifact fallback.
- App CI checks its Rust/OpenAPI/web/IR drift without an unpublished
  cross-repository SDK pin. SDK CI checks out its exact pinned app source and
  runs the complete source-to-SDK compatibility gate there. Use the same
  explicit local compatibility task for a coordinated consumer cutover; a
  mutable SDK branch or global pin is not a replacement for reviewed artifacts.
- From the intended app worktree, use the canonical wrappers with an absolute
  `SDK_DIR`: `task sync-sdk-artifacts SDK_DIR=/absolute/sdk`,
  `task generate-sdk SDK_DIR=/absolute/sdk`, then
  `task check-sdk-compatibility SDK_DIR=/absolute/sdk`. Install locked dependencies
  first with `task install-web` and `task install-sdk SDK_DIR=/absolute/sdk`.
  `task check-sdk-source SDK_DIR=/absolute/sdk` separately checks exact provenance.
  Compatibility includes generated drift, typechecking, tests, build, and package
  dry-run; it never publishes.


## Contact

If you have any questions or need further assistance, please feel free to reach out by opening an issue.

Thank you for your understanding and cooperation!

The Maintainers
