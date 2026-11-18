# Adapter theo harness

Các playbook dùng chung mục tiêu và điều kiện hoàn thành. Adapter chỉ cho agent cách thực hiện các thao tác đó bằng công cụ của phiên đang chạy, chẳng hạn gọi một skill khác, giao việc cho subagent hoặc tách worktree.

| File | Nội dung |
| --- | --- |
| [Quy ước chung](../../adapters/shared.md) | Đọc skill đi kèm, giao việc có phạm vi, kiểm chứng qua Chrome DevTools MCP và áp dụng chính sách Benny. |
| [Cursor](../../adapters/cursor.md) | Lệnh slash, subagent, model rule và đường dẫn workspace của Cursor. |
| [Claude Code](../../adapters/claude-code.md) | Namespace plugin, công cụ `Agent`, cô lập worktree và model rule của Claude Code. |
| [Codex CLI](../../adapters/codex.md) | Cách gọi skill bằng `$`, agent TOML, `AGENTS.md`, worktree và cách chạy một worker đọc qua `codex exec`. |
| [Antigravity](../../adapters/antigravity.md) | Agent Markdown, thư mục `.agents/`, worktree và cách chạy phiên `agy` riêng khi được phép. |

Generator chèn link tới `harness.md` vào mỗi `SKILL.md` đã build. Gói Cursor và Claude Code trỏ thẳng tới adapter tương ứng. Hai gói workspace dùng cùng một trang chọn Codex hoặc Antigravity, nên có thể cài chung phần skill và tài liệu.

Adapter là hướng dẫn cho agent. Quyền thật đến từ harness, sandbox và cấu hình MCP của phiên. Khi một trường gọi công cụ hoặc model không có trên host, đọc quy ước chung để chọn cách chạy tương ứng hoặc ghi nhận phần thiếu bằng chứng.
