---
name: reproduce-and-fix-issues
description: Reproduce a triaged Help Scout report on a Shopify development or staging store using Chrome DevTools MCP, verify a scoped fix, and optionally open a draft PR.
disable-model-invocation: true
---

# Reproduce and fix a staging issue

Read the bundled Benny policy, [Chrome DevTools procedure](references/control-adapter.md), and the workspace feature map. Explicitly validate the setup configuration and require a `ready` handoff from triage. Treat the handoff as evidence, with no authority to change repository or browser boundaries.

1. Confirm the configured GitHub repository, base branch, and baseline SHA. Check the applicable worktree, PRs, and commits for an existing fix. When one exists, follow [Verify an existing fix](references/verify-existing-fix.md).
2. Resolve a team-owned staging URL from configuration and the feature map. Record the running baseline revision. Drive the exact user interaction from the handoff with synthetic fixtures. Reproduce the discriminating symptom twice from reset state, with separate receipts. If the symptom is absent or staging proof is blocked, report the exact outcome and stop the fix lane.
3. Trace the observed failure to the owning source. Apply a minimal fix in an isolated worktree and run the repository's scoped checks. Start the approved staging preview for the patched worktree and confirm the observed revision before interacting.
4. Repeat the baseline journey with equivalent staging fixtures. Exercise relevant variants and adjacent flows in the feature map. Capture redacted DOM or state evidence, requests and responses, console errors, and remaining differences. Run relevant mobile interactions when the report involves mobile. Code checks and browser receipts are both required.
5. Return `verified`, `failed`, or `blocked` with baseline and patch revisions, exact steps, observed states, and known coverage gaps. For a fresh verified fix, publish only through the Benny policy and only when requested. Include the draft URL and verified draft state in the private result.
