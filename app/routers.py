from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from . import crud
from . import schemas
from .utils import pagination

router = APIRouter(tags=["Todos"])


# =========================
# Danh sách Todo
# =========================
@router.get(
    "/todos",
    response_model=schemas.TodoListResponse
)
def get_todos(
    page: int = 1,
    limit: int = 5,
    keyword: str = "",
    status: str = "all",
    sort: str = "newest",
    db: Session = Depends(get_db)
):

    if page < 1:
        page = 1

    if limit < 1:
        limit = 5

    total, todos = crud.get_todos(
        db=db,
        page=page,
        limit=limit,
        keyword=keyword,
        status=status,
        sort=sort
    )

    return {
        "items": todos,
        "pagination": pagination(
            total,
            page,
            limit
        )
    }


# =========================
# Lấy Todo theo ID
# =========================
@router.get(
    "/todos/{todo_id}",
    response_model=schemas.TodoResponse
)
def get_todo(
    todo_id: int,
    db: Session = Depends(get_db)
):

    todo = crud.get_todo(
        db,
        todo_id
    )

    if not todo:
        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    return todo


# =========================
# Thêm Todo
# =========================
@router.post(
    "/todos",
    response_model=schemas.TodoResponse,
    status_code=201
)
def create_todo(
    todo: schemas.TodoCreate,
    db: Session = Depends(get_db)
):

    return crud.create_todo(
        db,
        todo
    )


# =========================
# Cập nhật Todo
# =========================
@router.put(
    "/todos/{todo_id}",
    response_model=schemas.TodoResponse
)
def update_todo(
    todo_id: int,
    todo: schemas.TodoUpdate,
    db: Session = Depends(get_db)
):

    item = crud.update_todo(
        db,
        todo_id,
        todo
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    return item


# =========================
# Toggle Complete
# =========================
@router.patch(
    "/todos/{todo_id}/toggle",
    response_model=schemas.TodoResponse
)
def toggle_todo(
    todo_id: int,
    db: Session = Depends(get_db)
):

    item = crud.toggle(
        db,
        todo_id
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    return item


# =========================
# Delete
# =========================
@router.delete(
    "/todos/{todo_id}"
)
def delete_todo(
    todo_id: int,
    db: Session = Depends(get_db)
):

    success = crud.delete_todo(
        db,
        todo_id
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    return {
        "message": "Todo deleted successfully"
    }