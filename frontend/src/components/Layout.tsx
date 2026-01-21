'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            TaskFlow
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white/10 bg-white/5 px-4 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 text-sm font-semibold text-white transition-colors hover:from-blue-700 hover:to-purple-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        <main className="max-w-5xl mx-auto">{children}</main>
      </div>
    </div>
  );
};
