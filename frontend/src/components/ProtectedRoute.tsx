'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto bg-card/50 border border-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400" />
              <p className="text-muted-foreground">Loading your dashboard…</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!user) return null;
  return <>{children}</>;
};
