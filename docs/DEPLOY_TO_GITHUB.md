# Đưa portfolio lên GitHub Pages — từng bước

Repo phù hợp nhất của bạn là:

`BaldPeekHao/BaldPeekHao.github.io`

Vì repo có đúng tên `<username>.github.io`, URL public mục tiêu sẽ là:

`https://baldpeekhao.github.io`

## Bước 0 — chuẩn bị trước khi upload

1. Mở `config.js`.
2. Điền LinkedIn và email thật.
3. Nếu muốn nút Resume trên website:
   - copy PDF CV cuối cùng vào cùng thư mục với `index.html`;
   - đổi tên thành `resume.pdf`;
   - đặt `resume: "resume.pdf"` trong `config.js`.
4. Mở `index.html` trên máy để kiểm tra giao diện.
5. Đọc `SECURITY_CHECKLIST.md` trước khi tạo link trực tiếp đến source code của 3 project.

---

# Cách A — dùng GitHub Desktop / terminal (khuyến nghị)

## 1. Backup website cũ

Trong terminal:

```bash
git clone https://github.com/BaldPeekHao/BaldPeekHao.github.io.git
cd BaldPeekHao.github.io
git checkout -b backup-old-portfolio
git push -u origin backup-old-portfolio
git checkout main
```

Branch `backup-old-portfolio` sẽ giữ website cũ.

## 2. Xóa nội dung website cũ ở branch `main`

Không xóa thư mục `.git`.

Ví dụ trên Windows PowerShell, đứng trong repo:

```powershell
Get-ChildItem -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
```

Hoặc xóa thủ công mọi file/folder trừ `.git`.

## 3. Copy portfolio mới vào repo

Copy toàn bộ nội dung của folder `BaldPeekHao-Portfolio` vào root của repo đã clone.

Sau khi copy, cấu trúc phải bắt đầu như sau:

```text
BaldPeekHao.github.io/
├─ index.html
├─ styles.css
├─ app.js
├─ config.js
├─ .nojekyll
├─ assets/
├─ docs/
└─ README.md
```

Không được thành:

```text
BaldPeekHao.github.io/BaldPeekHao-Portfolio/index.html
```

`index.html` phải nằm ngay root.

## 4. Commit

```bash
git add .
git commit -m "Launch 2026 interactive portfolio"
git push origin main
```

## 5. Kiểm tra GitHub Pages

Vào repository trên GitHub:

`Settings → Pages`

Nếu cần chọn source, chọn:

- **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

Sau đó chờ deployment hoàn tất và mở:

`https://baldpeekhao.github.io`

---

# Cách B — upload bằng giao diện GitHub web

Cách này dễ nhưng với nhiều asset sẽ chậm hơn.

1. Mở repo `BaldPeekHao/BaldPeekHao.github.io`.
2. Backup website cũ trước hoặc tạo branch backup.
3. Xóa file cũ trên `main`.
4. Chọn `Add file → Upload files`.
5. Kéo toàn bộ file/folder của portfolio vào.
6. Commit trực tiếp vào `main`.
7. Vào `Settings → Pages` và dùng `main / root` nếu Pages chưa được cấu hình.

---

# Sau khi live — test như recruiter

Mở website bằng cửa sổ Incognito/private để chắc chắn không phụ thuộc cache của máy bạn.

Kiểm tra:

- desktop 1440px;
- laptop 1366px;
- mobile ~390px;
- AI Milly: Start → language → mic;
- Aladin: Customer/Vendor/Shipper + Add to cart;
- Phương Nam: Booking/Menu/Admin;
- GitHub button;
- LinkedIn/email/resume nếu bạn đã điền;
- không có API key/credential hiển thị trong source public.

---

# Gắn vào CV / Resume

Dòng header nên dùng:

`Portfolio: baldpeekhao.github.io  |  GitHub: github.com/BaldPeekHao  |  LinkedIn: ...`

Nếu CV có icon/link clickable, hyperlink chữ `Portfolio` tới:

`https://baldpeekhao.github.io`

## Ưu tiên link

1. Portfolio
2. LinkedIn
3. GitHub

Portfolio là showroom; GitHub là technical evidence.

---

# Custom domain (tùy chọn sau này)

Không cần mua domain ngay để nộp job. `baldpeekhao.github.io` đã đủ sạch và miễn phí.

Khi muốn nâng cấp branding, có thể mua domain dạng:

- `tuonghao.dev`
- `haotruong.dev`
- `tuonghaotruong.com`

Sau đó trỏ domain về GitHub Pages. Chỉ nên làm sau khi nội dung portfolio đã ổn định.
