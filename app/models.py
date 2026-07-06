from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import String

from datetime import datetime

from .database import Base


class Todo(Base):

    __tablename__ = "todos"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(100),
        nullable=False
    )

    description = Column(
        String(500),
        nullable=False,
        default=""
    )

    completed = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )