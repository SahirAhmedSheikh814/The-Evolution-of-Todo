'use client';

import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";

interface TodoItemProps {
  task: any;
  onUpdate: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    await onUpdate(task.id, { title, description });
    setIsOpen(false);
  };

  // Reset state when sheet opens/task changes
  React.useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
  }, [task, isOpen]);

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-colors hover:bg-white/10">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onUpdate(task.id, { is_completed: !task.is_completed })}
          className="mt-1 h-5 w-5 cursor-pointer rounded border-white/20 bg-background/40 text-blue-500 focus:ring-blue-500"
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base md:text-lg break-words ${
              task.is_completed ? "line-through text-muted-foreground/60" : "text-foreground"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`mt-1 text-sm break-words ${
                task.is_completed ? "text-muted-foreground/50" : "text-muted-foreground"
              }`}
            >
              {task.description}
            </p>
          )}
          <p className="mt-2 text-xs text-muted-foreground/70">
            Created: {new Date(task.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:bg-blue-500/10 hover:text-blue-300"
              title="Edit task"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Task</SheetTitle>
              <SheetDescription>
                Make changes to your task here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex h-11 w-full rounded-md border border-white/10 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  placeholder="Task title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background resize-none"
                  placeholder="Add a description..."
                />
              </div>
            </div>
            <SheetFooter>
              <div className="flex w-full gap-2">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">Cancel</Button>
                </SheetClose>
                <Button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                >
                  Save Changes
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="h-10 w-10 text-muted-foreground hover:bg-red-500/10 hover:text-red-300"
          title="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
