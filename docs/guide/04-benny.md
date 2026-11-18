# Từ ticket Help Scout đến bản sửa với Benny

Benny chạy theo yêu cầu trong một phiên local có Chrome DevTools MCP. Chuẩn bị ba thứ trước khi chạy một ticket.

1. Mở đúng conversation trong phiên Chrome đã đăng nhập Help Scout.
2. Xác định repository, base branch, mailbox và một Shopify development store hoặc staging store thuộc nhóm. Chuẩn bị marker quan sát được, fixture tổng hợp và staging preview có thể phục vụ revision đang kiểm tra.
3. Dùng `hstack-setup-benny` và [config mẫu](../../automations/benny/templates/configuration.example.json) để chuẩn bị config riêng của workspace. Điền đường dẫn feature map, gồm cách khởi chạy preview, xác nhận revision, đi qua các luồng cần kiểm tra và reset dữ liệu thử.

Chạy `hstack-triage-issue-reports` với conversation đã mở và đường dẫn config. Kết quả `ready` cung cấp các triệu chứng, hành vi mong đợi, dấu hiệu xác nhận lỗi và fixture cần dựng. Nếu thiếu dữ liệu, giữ kết quả `needs-evidence` hoặc `blocked` để tránh suy đoán.

Chạy `hstack-reproduce-and-fix-issues` với kết quả `ready` và cùng config. Agent kiểm tra repository và bản sửa đã có, chạy preflight trên staging, rồi tìm nguyên nhân sau khi có hai lần tái hiện. Với bản sửa mới, agent kiểm tra lại trên preview phục vụ revision đã sửa. Chỉ yêu cầu xuất bản khi bạn muốn workflow mở draft PR sau khi các kiểm tra đạt.

Ví dụ với báo cáo đăng ký B2B làm phát sinh sự kiện xóa dữ liệu. Dùng địa chỉ khách hàng tổng hợp và bộ ghi sự kiện thuộc staging. Chạy cả mật khẩu hợp lệ lẫn không hợp lệ, rồi đối chiếu phản hồi form, trạng thái khách hàng và sự kiện có thực sự phát sinh. Thông báo thành công trên form chỉ chứng minh kết quả phía form.

Help Scout mặc định chỉ đọc. Chỉ coordinator được phép thêm một Internal Note khi bạn yêu cầu rõ. Quy tắc đầy đủ về phiên Chrome, staging, quyền ghi và draft PR nằm trong [Benny policy](../../automations/benny/policy.md).
