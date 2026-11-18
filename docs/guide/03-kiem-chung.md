# Kiểm chứng và mở draft PR

Ghi trước một hành vi phân biệt bản lỗi với bản đúng. Với lỗi UI, ghi đường dẫn, viewport, thao tác chính xác, trạng thái quan sát được và yêu cầu mạng liên quan. Với CLI hoặc backend, chạy lệnh hay hành trình qua runtime thực và giữ đầu ra đủ để đối chiếu.

1. Chạy bản gốc và ghi lại triệu chứng. Với Benny, tái hiện hai lần từ trạng thái đã reset trên Shopify staging.
2. Áp dụng bản sửa trong worktree riêng. Chạy các kiểm tra dự án liên quan và xác nhận preview đang phục vụ đúng revision.
3. Lặp lại hành trình với điều kiện tương đương. Kiểm tra những luồng kế cận bị ảnh hưởng, như kết quả thành công, lỗi nhập liệu hoặc giao diện mobile khi ticket đề cập.
4. Ghi kết quả trước và sau, revision, lệnh kiểm tra và giới hạn của bằng chứng. Khi báo cáo lỗi liên quan đến tích hợp downstream, quan sát chính tích hợp staging hoặc bộ ghi sự kiện thử nghiệm.

Có thể tạo skill `verify-<app>` bằng `hstack-create-verification-skill` để lưu cách chạy app, fixture và các hành trình chính. Với một thuộc tính cần chứng minh trong phạm vi mô hình, dùng `hstack-create-formal-verification-skill`.

Khi người dùng đã yêu cầu xuất bản, [playbook mở PR](../../core/skills/poteto-mode/playbooks/opening-a-pr.md) yêu cầu draft, tiêu đề kỹ thuật và body rỗng. Giữ bằng chứng support ở kênh riêng và xác nhận lại trạng thái draft sau khi mở. Chính sách cho ticket Help Scout nằm trong [quy tắc Benny](../../automations/benny/policy.md).
