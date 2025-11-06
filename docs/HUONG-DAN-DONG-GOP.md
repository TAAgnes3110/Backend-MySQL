# Hướng dẫn Đóng góp

Cảm ơn bạn đã quan tâm đến việc đóng góp cho **TAAgnes Backend**!

## Thông tin dự án

- **Tên dự án**: TAAgnes Backend
- **Tác giả**: TAAgnes
- **Email**: taagnes3110@gmail.com
- **Mô tả**: Mẫu thiết kế backend với MySQL của TAAgnes

## Thiết lập Phát triển

1. Fork và clone repository
2. Cài đặt các dependencies: `npm install`
3. Tạo file `.env` từ `.env.example`
4. Cấu hình cơ sở dữ liệu
5. Chạy migrations: `npm run migrate`
6. Chạy development server: `npm run dev`

## Phong cách Code

- Sử dụng ESLint và Prettier
- Chạy `npm run lint` trước khi commit
- Chạy `npm run format` để định dạng code

## Kiểm thử

- Viết test cho các tính năng mới
- Chạy `npm test` để kiểm tra
- Đảm bảo coverage > 80%

## Thông điệp Commit

Sử dụng định dạng: `type(scope): message`

- `feat`: Tính năng mới
- `fix`: Sửa lỗi
- `docs`: Cập nhật tài liệu
- `style`: Định dạng, không ảnh hưởng code
- `refactor`: Tái cấu trúc code
- `test`: Thêm/sửa test
- `chore`: Cập nhật build tasks, dependencies

## Pull Requests

1. Tạo branch mới từ `master`
2. Commit các thay đổi
3. Push và tạo Pull Request
4. Mô tả rõ ràng về thay đổi

