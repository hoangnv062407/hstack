# Cài đặt hstack

Từ thư mục mã nguồn hstack, chạy bằng Node.js 22 trở lên. Generator dùng thư viện chuẩn của Node.js.

```sh
node scripts/build-harnesses.mjs
node scripts/build-harnesses.mjs --check
```

Chọn gói trong `dist/` theo harness. Giữ nguyên cây thư mục, kể cả thư mục bắt đầu bằng dấu chấm và thư mục tài liệu đi kèm.

| Harness | Cài đặt | Mở hướng dẫn trong phiên mới |
| --- | --- | --- |
| Cursor | Chép nội dung `dist/cursor/` vào `~/.cursor/plugins/local/hstack/`, rồi bật hstack trong Customize. | `/hstack-help` |
| Claude Code | Từ mã nguồn hstack, chạy `claude --plugin-dir ./dist/claude-code` để thử. Để cài qua marketplace local, thêm thư mục `dist/claude-code` làm marketplace rồi cài `hstack@hstack-local`. | `/hstack:hstack-help` |
| Codex CLI | Từ `dist/codex/`, chép `.agents/skills/hstack-*`, `.agents/hstack/` và `.codex/agents/hstack-*.toml` vào đúng vị trí trong workspace đích. Gộp phần hướng dẫn từ `AGENTS.md` của gói vào file hiện có. | `$hstack-help` hoặc chọn trong `/skills` |
| Antigravity | Từ `dist/antigravity/`, chép `.agents/skills/hstack-*`, `.agents/hstack/` và `.agents/agents/hstack-*.md` vào đúng vị trí trong workspace đích. Gộp hướng dẫn từ `.agents/AGENTS.md` của gói vào file đích. | `/hstack-help` |

Nếu một repo dùng cả Codex và Antigravity, cài cây skill và tài liệu chung một lần rồi giữ cả hai thư mục agent. Tên `hstack-*` cho phép cài hstack cùng pstack.

Với Claude Code, nếu chọn cài qua marketplace local, chạy hai lệnh sau từ thư mục mã nguồn hstack:

```sh
claude plugin marketplace add ./dist/claude-code
claude plugin install hstack@hstack-local
```

Một ca kỹ thuật nhỏ là cách thử đầu tiên, chẳng hạn yêu cầu `hstack-mode` phân tích một lỗi cục bộ và nêu cách tái hiện trước khi sửa. Dùng `hstack-setup` khi bạn muốn đổi model hoặc reasoning effort theo vai trò. Chỉ dùng những giá trị harness hiện tại hỗ trợ.

[Tiếp theo · Dùng hstack-mode](02-hstack-mode.md)
