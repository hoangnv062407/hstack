---
name: setup-benny
description: Set up the local Benny support-to-fix workflow for a team-owned repository and Shopify staging store.
disable-model-invocation: true
---

# Set up Benny

Read the bundled Benny policy before configuring the workspace.

1. Use the already authenticated Chrome session. Discover the direct Chrome DevTools MCP connection and list pages without changing tabs or session configuration. Verify that the intended Help Scout conversation can be selected by URL and identifier. Stop browser setup on a connection or permission error.
2. Identify the GitHub repository, base branch, Help Scout origin and mailbox, and team-owned staging origin. Require evidence of staging ownership and a staging marker that can be observed through Chrome DevTools MCP. Confirm the preview can serve a local worktree revision with isolated test fixtures and integrations.
3. Save a workspace-owned JSON file following the bundled Benny configuration example. Preserve existing configuration and keep secrets in the team's existing secret management. Require a repository in `OWNER/REPO` form, a valid base branch, exact HTTPS origins without paths, an explicit mailbox, nonempty marker selector, attribute and value, and a project-relative feature map path. Reject example placeholders and paths outside the workspace.
4. Populate the project's feature map for affected routes, fixtures, checks, preview startup and revision markers. Use the sample in the reproduce skill's `references` folder. From the workspace root run `node <preflight-path> <config-path> validate` using the script linked by the Benny policy and check the base branch with `git check-ref-format --branch`.
5. Run a read-only triage to verify ticket selection. Verify staging origin and marker before using reproduction. No customer reply, tracker write or automation registration is part of setup.
