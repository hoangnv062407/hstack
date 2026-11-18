---
name: setup-pstack
description: Configure optional hstack model and reasoning choices per engineering role for the active harness.
---

# Set up hstack model choices

1. Read the active harness adapter for the role settings path and model syntax. Determine the models and effort levels available in this session. Keep the host defaults unless the user wants role overrides.
2. Read any existing hstack role settings before changing them. Use one `role: value` line per configured role. Preserve existing choices outside the request. When using the Cursor rule path, add frontmatter with `alwaysApply: true`. Other hosts can read the Markdown settings file directly. The settings are local to the active host unless the project intentionally shares host-compatible values.
3. Supported roles are `feature, refactoring`, `bug-fix`, `perf-issue`, `hillclimb`, `judgment and prose`, `arena runners`, `arena cross-judge pool`, `swarm workers`, and `interrogate reviewers`. Panel roles accept comma-separated seats. `inherit-parent` asks the host to use its default. When a requested panel needs independent models or vendors, disclose any constraint the available models cannot satisfy.
4. When the user requests a default reasoning budget, choose a level accepted by the host. Record it with `# budget` and retain the `# defaults: 3` settings marker used by the router. Confirm the file path and the roles that changed.
5. When the project needs reusable runtime or formal proof, use `/create-verification-skill` or `/create-formal-verification-skill`.
