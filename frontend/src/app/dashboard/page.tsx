"use client";

import { useRouter } from "next/navigation";

import { ProtectedRoute } from "../../components/ProtectedRoute";
import { TodoList } from "../../components/todos/TodoList";
import { CreateTodo } from "../../components/todos/CreateTodo";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="relative min-h-[calc(100vh-4rem)] pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  {user?.email ? `Signed in as ${user.email}` : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 bg-white/5 px-4 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
              >
                Logout
              </button>
            </div>

            <div className="bg-card/50 border border-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Create a task
                </h2>
                <CreateTodo onTaskCreated={() => window.dispatchEvent(new Event('todo-updated'))} />
              </div>

              <div className="h-px bg-white/10 my-8" />

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Your tasks
                </h2>
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
