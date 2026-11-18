# Cursor adapter

Read the [shared conventions](shared.md).

- Invoke `/hstack-…` or read the installed skill. Use the available subagent tool and the bundled `hstack-poteto-agent` or `hstack-comment-sicko` roles. Use read-only tool permissions for discovery when available.
- Isolate parallel writers with Git worktrees. Use cloud delegation only when authorized. Run Benny in the local authenticated session.
- Use Cursor's planning and question tools if available. Keep optional role settings in `~/.cursor/rules/hstack-models.mdc`. Workspace skills and rules live in `.cursor/skills/` and `.cursor/rules/`.
- Use the current workspace's exposed transcript path.
