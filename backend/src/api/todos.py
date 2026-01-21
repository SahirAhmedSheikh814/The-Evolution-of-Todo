from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from pydantic import BaseModel
from src.core.db import get_session
from src.models.user import User
from src.models.task import Task
from src.api.deps import get_current_user

router = APIRouter(prefix="/todos", tags=["todos"])

class TodoCreate(BaseModel):
    title: str
    description: str | None = None

class TodoUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    is_completed: bool | None = None

class TodoResponse(BaseModel):
    id: str
    title: str
    description: str | None
    is_completed: bool
    user_id: str
    created_at: str
    updated_at: str

    @classmethod
    def from_task(cls, task: Task) -> "TodoResponse":
        return cls(
            id=str(task.id),
            title=task.title,
            description=task.description,
            is_completed=task.is_completed,
            user_id=str(task.user_id),
            created_at=task.created_at.isoformat(),
            updated_at=task.updated_at.isoformat(),
        )


@router.post("", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(todo_in: TodoCreate, current_user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    todo = Task(title=todo_in.title, description=todo_in.description, user_id=current_user.id)
    session.add(todo)
    await session.commit()
    await session.refresh(todo)
    return TodoResponse.from_task(todo)

@router.get("", response_model=list[TodoResponse])
async def list_todos(current_user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    stmt = select(Task).where(Task.user_id == current_user.id)
    result = await session.execute(stmt)
    todos = result.scalars().all()
    return [TodoResponse.from_task(todo) for todo in todos]

@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo(todo_id: str, current_user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    stmt = select(Task).where(Task.id == todo_id, Task.user_id == current_user.id)
    result = await session.execute(stmt)
    todo = result.scalar_one_or_none()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return TodoResponse.from_task(todo)

@router.patch("/{todo_id}", response_model=TodoResponse)
async def update_todo(todo_id: str, todo_in: TodoUpdate, current_user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    stmt = select(Task).where(Task.id == todo_id, Task.user_id == current_user.id)
    result = await session.execute(stmt)
    todo = result.scalar_one_or_none()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if todo_in.title is not None:
        todo.title = todo_in.title
    if todo_in.description is not None:
        todo.description = todo_in.description
    if todo_in.is_completed is not None:
        todo.is_completed = todo_in.is_completed
    await session.commit()
    await session.refresh(todo)
    return TodoResponse.from_task(todo)

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: str, current_user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    stmt = select(Task).where(Task.id == todo_id, Task.user_id == current_user.id)
    result = await session.execute(stmt)
    todo = result.scalar_one_or_none()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    await session.delete(todo)
    await session.commit()
    return None
