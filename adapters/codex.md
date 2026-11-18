# Codex CLI adapter

Read the [shared conventions](shared.md).

| Intent | Codex |
| --- | --- |
| Bundled skill | Use `$hstack-…` or select it via `/skills`. Workspace skills live in `.agents/skills/`. |
| Task / subagent type | Use an authorized native subagent with the role in `.codex/agents/`. When the user requires Antigravity delegation, follow the [Antigravity adapter](antigravity.md). |
| Read-only worker | Use an enforceable read-only sandbox, for example `codex exec --sandbox read-only -C <workspace> -` with a bounded brief on stdin. The filesystem sandbox alone does not remove MCP access. Keep Benny browser and external actions with the coordinator. |
| Cloud / branch | Use `git worktree add -b <branch> <path> <base-sha>` and start the writer there. Cursor cloud and dashboard operations are unavailable. |
| Background, resume, attachments | Use native wait and result actions when offered. For separate runs, reference saved results and any attachments by file path. |
| Questions, plans, model settings | Use session facilities when offered. Merge workspace guidance into `AGENTS.md`. Keep optional model overrides in `.agents/hstack/hstack-models.md` and pass only values accepted by this host. |
| History and PRs | Use history exposed for the current workspace and `gh` for GitHub operations. |
