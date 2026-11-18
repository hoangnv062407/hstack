# Tùy chỉnh hstack

| Nội dung cần đổi | Nguồn cần sửa |
| --- | --- |
| Hành vi chung của một skill hoặc playbook | `core/skills/` |
| Vai trò agent | `core/agents/` |
| Cách gọi công cụ, model, worktree hoặc skill theo host | `adapters/` |
| Điều kiện triage, preflight hoặc xuất bản của Benny | `automations/benny/` |
| Tên, phiên bản hoặc metadata gói | `manifests/` |
| Hướng dẫn cho người dùng | `docs/` |

Khi thêm skill, đặt `SKILL.md` trong thư mục có tên trùng trường `name` trong frontmatter. Dùng tên chữ thường nối bằng dấu gạch ngang. Một mô tả tốt nêu tình huống áp dụng. Đặt ví dụ và tài liệu đọc thêm cạnh skill rồi dùng link tương đối để file đi cùng gói.

Để chỉnh model theo vai trò, chạy `hstack-setup` ở harness đích. Vai trò không cấu hình tiếp tục dùng mặc định phù hợp của harness. Với một nhóm reviewers dùng chung repo, chỉ chia sẻ model overrides mà cả hai host có thể hiểu.

Sau khi chỉnh nguồn, chạy lại build và `--check`. Kiểm tra skill xuất hiện trong harness cần dùng. Nếu sửa bước gọi công cụ hoặc một hành trình app, chạy thử bước đó trong đúng môi trường của nó. Thư mục `dist/` do generator quản lý và được tạo lại từ mã nguồn.
