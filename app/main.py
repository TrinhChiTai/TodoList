from fastapi import FastAPI
from fastapi import Request

from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .database import Base
from .database import engine

from .routers import router

import app.models

# ==========================
# Tạo Database
# ==========================

Base.metadata.create_all(bind=engine)

# ==========================
# Khởi tạo FastAPI
# ==========================

app = FastAPI(
    title="Todo List API",
    version="1.0.0"
)

# ==========================
# Router
# ==========================

app.include_router(router)

# ==========================
# Static
# ==========================

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)

# ==========================
# Template
# ==========================

templates = Jinja2Templates(
    directory="templates"
)

# ==========================
# Home
# ==========================

@app.get("/")
def home(request: Request):

    return templates.TemplateResponse(
        "index.html",
        {
            "request": request
        }
    )