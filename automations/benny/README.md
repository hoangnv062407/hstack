# Benny

Benny runs on demand in a local harness session with direct Chrome DevTools MCP access. It takes one Help Scout conversation through triage, staging reproduction and verification, and optionally a draft PR.

1. Run `hstack-setup-benny` once for the workspace. Prepare a workspace-owned configuration from the [example](templates/configuration.example.json).
2. Run `hstack-triage-issue-reports` with an open Help Scout conversation and the configuration path.
3. Run `hstack-reproduce-and-fix-issues` with the accepted triage output and configuration path. Pass the intent to publish a draft explicitly if desired.

Use the [Benny policy](policy.md) throughout. Help Scout is read-only by default. The coordinator may add one internal note only on explicit request. No scheduler or webhook is installed by this pack.
