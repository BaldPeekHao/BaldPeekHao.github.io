# Security checklist trước khi public source code

## Quan trọng — Aladin

Trong bản ZIP được dùng để thiết kế portfolio, `model/schema.js` có một MongoDB Atlas connection URI được hard-code trực tiếp trong source và URI đó chứa credential.

### Việc nên làm ngay

1. Vào MongoDB Atlas.
2. Xóa hoặc rotate credential/database user đã xuất hiện trong source cũ.
3. Không chỉ sửa file rồi nghĩ là xong: nếu credential từng được push lên GitHub, nó vẫn có thể tồn tại trong git history.
4. Chuyển connection string sang environment variable.

Ví dụ:

```js
mongoose.connect(process.env.MONGODB_URI)
```

Tạo `.env.example`:

```text
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@HOST/DB_NAME
```

Đảm bảo `.env` nằm trong `.gitignore`.

### Nếu credential đã từng nằm trong repo public

Rotate credential là bước bắt buộc. Xóa chuỗi khỏi commit mới không làm secret cũ biến mất khỏi lịch sử.

Nếu muốn làm sạch lịch sử trước khi đưa repo cho recruiter, tạo một repository showcase sạch từ source đã sanitize thường đơn giản và an toàn hơn force-rewrite repo học tập cũ.

---

## AI Milly

Bản project đã có `.env.example` và ignore `/backend/.env` + `/backend/credentials.json`, đây là hướng đúng.

Trước khi public:

- kiểm tra không có file `.env` thật;
- không có GCP service-account JSON;
- không có OpenAI / Google / ElevenLabs key;
- không public patient data, audio hoặc transcript thật;
- demo recruiter nên dùng dữ liệu giả/synthetic.

---

## Hoa Vien Phuong Nam / Southern Park

Project dùng một client-side data SDK và app identifier phía client.

Trước khi public/live demo:

- kiểm tra access rules phía backend;
- không dựa vào việc “ẩn ID trong frontend” như một security boundary;
- đảm bảo admin routes và mutations yêu cầu authorization thật ở server/service layer;
- không đưa dữ liệu khách hàng, số điện thoại đặt bàn hoặc booking history thật vào repo/demo.

---

## Cách link source code chuyên nghiệp

Không cần public toàn bộ mọi repo cũ.

Khuyến nghị tạo ba repo recruiter-facing sạch:

```text
BaldPeekHao/ai-milly
BaldPeekHao/aladin-commerce
BaldPeekHao/hoa-vien-phuong-nam
```

Mỗi repo nên có:

- README mạnh;
- screenshots / architecture;
- tech stack;
- contribution/role của bạn ghi trung thực;
- setup instructions;
- `.env.example`;
- không secrets;
- không production customer data;
- license/attribution phù hợp;
- team-project acknowledgement nếu project là bài nhóm.
