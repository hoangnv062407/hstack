# Claude Code adapter

Read the [shared conventions](shared.md).

| Intent | Claude Code |
| --- | --- |
| Bundled skill | Invoke `/hstack:hstack-…` or read the installed `SKILL.md`. |
| Task / subagent type | Use `Agent` with a supported type, such as `hstack:hstack-poteto-agent`, `hstack:hstack-comment-sicko`, or `general-purpose`. Use enforceable read-only tool permissions when required. |
| Cloud / branch | Use `isolation: "worktree"` for parallel edits when supported. Give the worker the exact base SHA. |
| Background, resume, attachments | Use fields accepted by the active Agent tool. Pass file paths or prior findings in the brief when a field is unavailable. |
| Model and reasoning | Translate Cursor defaults only where there is a host equivalent. Keep optional role overrides in `~/.claude/rules/hstack-models.md`. |
| Questions, plans, and workspace rules | Use `AskUserQuestion` and available task tools. Workspace skills and rules live in `.claude/skills/` and `.claude/rules/`. Use `CLAUDE.md` for workspace guidance. |
| History and PRs | Use the current workspace's history and `gh` for GitHub operations. Cursor cloud status, Bugbot triggers, and Cursor Automations require Cursor. |
