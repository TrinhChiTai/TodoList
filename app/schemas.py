from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


# ==========================
# Thêm Todo
# ==========================
class TodoCreate(BaseModel):
    title: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    description: Optional[str] = Field(
        default="",
        max_length=500
    )


# ==========================
# Sửa Todo
# ==========================
class TodoUpdate(BaseModel):
    title: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    description: Optional[str] = Field(
        default="",
        max_length=500
    )

    completed: bool


# ==========================
# Trả dữ liệu Todo
# ==========================
class TodoResponse(BaseModel):

    id: int

    title: str

    description: str = ""

    completed: bool

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


# ==========================
# Metadata phân trang
# ==========================
class Pagination(BaseModel):

    page: int

    limit: int

    total: int

    total_pages: int


# ==========================
# Kết quả trả về
# ==========================
class TodoListResponse(BaseModel):

    items: list[TodoResponse]

    pagination: Pagination