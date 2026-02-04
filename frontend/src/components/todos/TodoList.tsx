'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../../lib/api';
import { TodoItem } from './TodoItem';
import { Skeleton } from "@/components/ui/skeleton";

export const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      console.log('Fetching tasks...');
      const { data } = await api.get('/todos');
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();

    const handleTodoUpdate = () => {
      console.log('Received todo-updated event');
      fetchTasks();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('todo-updated', handleTodoUpdate);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('todo-updated', handleTodoUpdate);
      }
    };
  }, [fetchTasks]);

  const handleUpdate = async (id: string, data: any) => {
    await api.patch(`/todos/${id}`, data);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/todos/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[72px] w-full rounded-xl bg-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-muted-foreground text-lg">No tasks yet.</p>
          <p className="text-muted-foreground/70 text-sm mt-2">
            Create your first task above!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TodoItem key={task.id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
