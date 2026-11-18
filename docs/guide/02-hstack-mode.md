# Dùng hstack-mode

`hstack-mode` đọc mục tiêu, chọn playbook và gọi các skill cần thiết theo từng bước. Dùng cú pháp trong [trang cài đặt](01-cai-dat.md) và thay `hstack-help` bằng `hstack-mode`.

Một yêu cầu tốt nêu hành vi đang sai hoặc cần bổ sung, điều kiện hoàn thành có thể kiểm tra và giới hạn thao tác. Ví dụ, trong Codex:

```text
$hstack-mode Kiểm tra vì sao bộ lọc mất lựa chọn sau khi tải lại trang.
Tái hiện bằng dữ liệu test, rồi sửa trong worktree riêng.
Hoàn thành khi bộ lọc giữ đúng lựa chọn sau reload và luồng xóa bộ lọc vẫn hoạt động.
```

| Công việc | Playbook thường dùng |
| --- | --- |
| Giải thích hành vi hoặc tìm nguyên nhân | Investigation |
| Tái hiện và sửa lỗi có triệu chứng cụ thể | Bug fix |
| Thêm hành vi mới | Feature |
| Đổi cấu trúc, giữ hành vi hiện tại | Refactoring |
| Chẩn đoán chậm với phép đo cụ thể | Perf issue |
| Ước lượng hoặc chia một thay đổi thành nhiều giai đoạn | Multi-phase plan |

Xem [router và danh sách playbook](../../core/skills/poteto-mode/SKILL.md) để biết điều kiện chọn từng nhánh. Khi chuyển chủ đề trong cùng phiên, nói rõ đây là việc mới và nêu mục tiêu mới để router chọn lại playbook.

Chọn skill trực tiếp khi bạn đã biết mình cần thao tác nào. `hstack-architect` phác thảo cấu trúc dữ liệu và ranh giới module. `hstack-tdd` dẫn dắt thay đổi bằng kiểm thử hành vi. `hstack-deslop` rà phần diff trước khi commit. Các nguyên tắc trong router giúp agent quyết định bước nào cần prototype, đo đạc hoặc đối chiếu độc lập.

Với ticket Help Scout, bắt đầu từ [Benny](04-benny.md) để luồng chạy dùng đúng tab, đúng staging và đúng quyền xuất bản.
