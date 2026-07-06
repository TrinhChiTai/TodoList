from sqlalchemy import asc
from sqlalchemy import desc
from sqlalchemy import or_

from sqlalchemy.orm import Session

from . import models
from . import schemas
def get_todos(

    db: Session,

    page: int = 1,

    limit: int = 5,

    keyword: str = "",

    status: str = "all",

    sort: str = "newest"

):

    query = db.query(models.Todo)

    if keyword:

        query = query.filter(

            or_(

                models.Todo.title.contains(keyword),

                models.Todo.description.contains(keyword)

            )

        )

    if status == "completed":

        query = query.filter(

            models.Todo.completed == True

        )

    elif status == "pending":

        query = query.filter(

            models.Todo.completed == False

        )

    if sort == "newest":

        query = query.order_by(

            desc(models.Todo.created_at)

        )

    elif sort == "oldest":

        query = query.order_by(

            asc(models.Todo.created_at)

        )

    elif sort == "az":

        query = query.order_by(

            asc(models.Todo.title)

        )

    elif sort == "za":

        query = query.order_by(

            desc(models.Todo.title)

        )

    total = query.count()

    todos = (

        query

        .offset(

            (page - 1) * limit

        )

        .limit(limit)

        .all()

    )

    return total, todos
def get_todo(

    db: Session,

    todo_id: int

):

    return (

        db.query(

            models.Todo

        )

        .filter(

            models.Todo.id == todo_id

        )

        .first()

    )
def create_todo(

    db: Session,

    todo: schemas.TodoCreate

):

    item = models.Todo(

        title=todo.title.strip(),

        description=(todo.description or "").strip()

    )

    db.add(item)

    db.commit()

    db.refresh(item)

    return item
def update_todo(

    db: Session,

    todo_id: int,

    todo: schemas.TodoUpdate

):

    item = get_todo(

        db,

        todo_id

    )

    if not item:

        return None

    item.title = todo.title.strip()

    item.description=(todo.description or "").strip()

    item.completed = todo.completed

    db.commit()

    db.refresh(item)

    return item

def delete_todo(

    db: Session,

    todo_id: int

):

    item = get_todo(

        db,

        todo_id

    )

    if not item:

        return False

    db.delete(item)

    db.commit()

    return True
def toggle(

    db: Session,

    todo_id: int

):

    item = get_todo(

        db,

        todo_id

    )

    if not item:

        return None

    item.completed = not item.completed

    db.commit()

    db.refresh(item)

    return item