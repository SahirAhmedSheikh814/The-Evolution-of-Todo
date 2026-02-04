from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.db import init_db
from src.api import auth, todos, chat

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    yield
    # Shutdown

app = FastAPI(title="Todo App API", lifespan=lifespan)

# CORS Configuration
# This is critical for the PATCH request to work with credentials (cookies)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://taskflow-seven-smoky.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(todos.router, prefix="/api/v1")
app.include_router(chat.router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "ok"}
