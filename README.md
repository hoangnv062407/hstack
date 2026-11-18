# hstack

hstack bundles engineering playbooks adapted from [pstack](https://github.com/cursor/plugins/tree/main/pstack), plus a local Help Scout support workflow for Shopify development and staging stores.

[Tài liệu hstack](docs/README.md) gồm hướng dẫn cài đặt, adapter theo harness, kiểm chứng bản sửa và luồng Benny.

## Build

Run with Node.js 22 or later. The generator uses the Node standard library.

```sh
node scripts/build-harnesses.mjs
node scripts/build-harnesses.mjs --check
```

Edit `core/`, `adapters/`, `automations/benny/`, `manifests/`, or `docs/` and rebuild. The build owns `dist/`. Deploy the whole selected layout, including its adapter and guides.

| Harness | Install layout | Support triage |
| --- | --- | --- |
| Cursor | Copy `dist/cursor/` to `~/.cursor/plugins/local/hstack/` and enable it in Customize. | `/hstack-triage-issue-reports` |
| Claude Code | Start a test session with `claude --plugin-dir ./dist/claude-code`, or add the generated local marketplace and install `hstack@hstack-local`. | `/hstack:hstack-triage-issue-reports` |
| Codex CLI | Copy `.agents/skills/hstack-*`, `.agents/hstack/`, and `.codex/agents/hstack-*.toml` from `dist/codex/` into the workspace. Merge the generated `AGENTS.md` entry into any existing file. | `$hstack-triage-issue-reports` |
| Antigravity | Copy `.agents/skills/hstack-*`, `.agents/hstack/`, and `.agents/agents/hstack-*.md` from `dist/antigravity/` into the workspace. Merge the generated `.agents/AGENTS.md` entry into any existing file. | `/hstack-triage-issue-reports` |

For a shared Codex and Antigravity checkout, install the shared skills and documentation once, keep both agent directories, and follow the adapter for the active harness.

Run `hstack-mode` for general engineering. For support, start with `hstack-setup-benny` and the [Benny workflow](automations/benny/README.md). Benny requires direct Chrome DevTools MCP access to the existing local Chrome session, an approved staging origin with an observable marker, and a staging preview that can run the code under test. Help Scout defaults to read-only. The publication path is a verified draft PR with an empty body.

The source carries the [pstack license](LICENSE). Bundled `deslop` carries its own upstream license in its skill directory.
