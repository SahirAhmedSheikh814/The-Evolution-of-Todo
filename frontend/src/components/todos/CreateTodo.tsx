'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema } from '../../lib/validations';
import { api } from '../../lib/api';

interface CreateTodoProps {
  onTaskCreated: () => void;
}

export const CreateTodo: React.FC<CreateTodoProps> = ({ onTaskCreated }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(todoSchema)
  });

  const onSubmit = async (data: any) => {
    await api.post('/todos', data);
    reset();
    onTaskCreated();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6"
    >
      <div className="mb-4">
        <label className="text-sm font-medium text-foreground">Title</label>
        <input
          {...register('title')}
          placeholder="What needs to be done?"
          className="mt-2 flex h-11 w-full rounded-md border border-white/10 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {errors.title && (
          <div className="mt-2 text-sm text-red-300">{String(errors.title.message)}</div>
        )}
      </div>

      <div className="mb-5">
        <label className="text-sm font-medium text-foreground">Description</label>
        <textarea
          {...register('description')}
          placeholder="Add a description (optional)"
          className="mt-2 w-full rounded-md border border-white/10 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background resize-none"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:from-blue-700 hover:to-purple-700"
      >
        Add Task
      </button>
    </form>
  );
};
