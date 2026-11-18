# Xử lý sự cố

| Triệu chứng | Cách kiểm tra |
| --- | --- |
| Skill không hiện | Kiểm tra cú pháp gọi theo harness, tên thư mục đã cài và vị trí workspace. Mở phiên mới rồi tìm `hstack-help` trong danh sách skill. |
| Skill hiện nhưng link adapter lỗi | Đối chiếu gói đã cài với `dist/<harness>`. Chép cả cây tài liệu cùng skill, giữ cấu trúc thư mục. |
| Build báo `dist is out of date` | Chạy `node scripts/build-harnesses.mjs` rồi kiểm tra lại. Nếu `dist/` là thư mục do bạn tự tạo, kiểm tra và di chuyển thư mục đó trước để dành tên `dist/` cho generator. |
| Model override không có hiệu lực | Kiểm tra đường dẫn model rule trong adapter và các giá trị model, effort mà phiên đang dùng hỗ trợ. |
| Chrome DevTools MCP không liệt kê trang | Ghi lỗi kết nối, timeout hoặc quyền chính xác và dừng các thao tác browser của ca đó. Các hành trình Help Scout và storefront dùng trực tiếp Chrome DevTools MCP. |
| Staging preflight từ chối URL hoặc marker | So khớp origin HTTPS đầy đủ, kiểm tra redirect và đọc marker trên đúng tab. Dừng thao tác khi origin, phiên bản hoặc cấu hình tích hợp của preview chưa xác định được. |
| Draft đã tồn tại | Kiểm tra repository, base, head và trạng thái draft. Benny kiểm chứng bản sửa hiện có qua luồng riêng để tránh tạo PR trùng. |

Khi báo một lỗi, ghi harness và phiên bản, entry point đang dùng, lệnh hoặc thao tác tái hiện, kết quả quan sát thực tế và lỗi đầu tiên. Lọc dữ liệu khách hàng, token và thông tin nội bộ trước khi chia sẻ.
