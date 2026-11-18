# Antigravity adapter

Read the [shared conventions](shared.md).

| Intent | Antigravity |
| --- | --- |
| Bundled skill | Invoke `/hstack-…`. The current IDE and CLI use `.agents/skills/`. The IDE also supports legacy `.agent/skills/`. Install a single layout. |
| Task / subagent type | Use the available native subagent tool with the named role in `.agents/agents/`. For a separate authorized local run, check `agy --help` and use `agy --agent <role> --print <brief>` from the intended workspace. |
| Read-only worker | Use enforceable read-only permissions when available. Plan mode or a prompt alone does not enforce isolation. Keep Benny browser and external actions with the coordinator. |
| Cloud / branch | Use a Git worktree at the exact base SHA for each writer. Run Benny locally with access to Chrome DevTools MCP. |
| Background, resume, attachments | Use native task and result controls. Resume by conversation ID if supported, or pass prior output and permitted file paths. |
| Rules and model settings | Use `AGENTS.md` or `.agents/rules/` with a valid trigger. Keep optional role overrides in `.agents/hstack/hstack-models.md` using host-supported model and effort values. |
| History and PRs | Use history for the current workspace and `gh` for GitHub operations. Cursor cloud state and Cursor Automations require Cursor. |
