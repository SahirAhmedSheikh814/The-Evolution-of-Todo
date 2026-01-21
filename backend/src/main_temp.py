from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.api.auth import router as auth_router
from src.api.todos import router as todos_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    from src.core.db import init_db
    await init_db()
    yield
    # Shutdown

app = FastAPI(title="TodoApp", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(todos_router, prefix="/api/v1")

@app.get("/health")
async def health():
    return {"status": "ok"}
