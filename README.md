# 📋 Ứng dụng Quản lý Công việc (Todo List)

## Giới thiệu

Đây là ứng dụng **Quản lý công việc (Todo List)** được xây dựng bằng **Python FastAPI**, **SQLite**, **SQLAlchemy**, **JavaScript** và **Tailwind CSS**.

Dự án được phát triển nhằm đáp ứng yêu cầu bài test **Intern Developer**, tập trung vào việc xây dựng một ứng dụng CRUD hoàn chỉnh với giao diện trực quan, mã nguồn rõ ràng và dễ bảo trì.

---

# 🚀 Chức năng

Ứng dụng hỗ trợ đầy đủ các chức năng sau:

- Hiển thị danh sách công việc
- Thêm công việc mới
- Chỉnh sửa công việc
- Xóa công việc
- Đánh dấu hoàn thành / chưa hoàn thành
- Tìm kiếm công việc theo tiêu đề
- Lọc công việc theo trạng thái
- Sắp xếp danh sách công việc
- Phân trang dữ liệu
- Giao diện Responsive trên nhiều thiết bị
- Thông báo sau khi thao tác thành công
- Hộp thoại xác nhận trước khi xóa

---

# 🛠 Công nghệ sử dụng

## Backend

- Python 3
- FastAPI
- SQLAlchemy
- SQLite

## Frontend

- HTML5
- Tailwind CSS
- JavaScript (Vanilla JavaScript)

## Khác

- Jinja2
- Uvicorn

---

# 📁 Cấu trúc thư mục

```text
TodoList/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   └── routers.py
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
├── templates/
│   └── index.html
│
├── requirements.txt
├── README.md
├── .gitignore
└── todo.db
```

---

# ⚙️ Yêu cầu môi trường

- Python 3.10 trở lên
- pip

---

# 📥 Hướng dẫn cài đặt

## Bước 1: Clone dự án

```bash
git clone https://github.com/TrinhChiTai/TodoList.git
```

Di chuyển vào thư mục dự án

```bash
cd TodoList
```

---

## Bước 2: Tạo môi trường ảo

Windows

```bash
python -m venv venv
```

Kích hoạt môi trường

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Bước 3: Cài đặt thư viện

```bash
pip install -r requirements.txt
```

---

## Bước 4: Chạy ứng dụng

```bash
uvicorn app.main:app --reload
```

Sau khi chạy thành công, mở trình duyệt tại:

```
http://127.0.0.1:8000
```

---

# 📦 Thư viện sử dụng

```
fastapi
uvicorn
sqlalchemy
jinja2
python-multipart
```

---

# 🗄 Cơ sở dữ liệu

Ứng dụng sử dụng cơ sở dữ liệu **SQLite**.

Tên file:

```
todo.db
```

Các bảng sẽ được tạo tự động khi chạy ứng dụng lần đầu.

---

# 📄 API
Sau khi chạy ứng dụng:

```
http://127.0.0.1:8000
```

FastAPI tự động cung cấp tài liệu API:

- Swagger UI

```
http://127.0.0.1:8000/docs
```

- ReDoc

```
http://127.0.0.1:8000/redoc
```

---

## Danh sách API
| Phương thức | Endpoint | Chức năng |
|-------------|----------|-----------|
| GET | /todos | Lấy danh sách công việc |
| GET | /todos/{id} | Lấy thông tin công việc |
| POST | /todos | Thêm công việc |
| PUT | /todos/{id} | Cập nhật công việc |
| DELETE | /todos/{id} | Xóa công việc |
| PATCH | /todos/{id}/toggle | Đổi trạng thái hoàn thành |

---

# 🔍 Tìm kiếm

Ví dụ:

```
GET /todos?keyword=học
```

Ứng dụng sẽ trả về các công việc có tiêu đề chứa từ khóa.

---

# 🎯 Lọc trạng thái

Hiển thị:

- Tất cả
- Đã hoàn thành
- Chưa hoàn thành

---

# ↕️ Sắp xếp

Hỗ trợ các kiểu sắp xếp:

- Mới nhất
- Cũ nhất
- A → Z
- Z → A

---

# 📄 Phân trang

Danh sách công việc được chia thành nhiều trang.

Người dùng có thể:

- Chuyển trang trước
- Chuyển trang sau
- Chọn trực tiếp số trang

---

# ✅ Kiểm tra dữ liệu

Ứng dụng kiểm tra dữ liệu trước khi lưu.

Các quy tắc:

- Không được để trống tiêu đề
- Tiêu đề tối đa 100 ký tự
- Mô tả tối đa 500 ký tự
- Không cho phép dữ liệu không hợp lệ

---

# 📱 Giao diện Responsive

Ứng dụng hoạt động tốt trên:

- Máy tính
- Laptop
- Máy tính bảng
- Điện thoại

---

# ⚠️ Xử lý lỗi

Ứng dụng xử lý các trường hợp phổ biến như:

- Không tìm thấy công việc
- Tiêu đề để trống
- Dữ liệu không hợp lệ
- Lỗi truy vấn cơ sở dữ liệu
- Sai tham số tìm kiếm
- Sai tham số sắp xếp
- Sai số trang

---


---

# 👨‍💻 Tác giả

**Trịnh Chí Tài**

Bài test tuyển dụng vị trí **Intern Developer**

GitHub:

```
https://github.com/TrinhChiTai/TodoList
```

---
