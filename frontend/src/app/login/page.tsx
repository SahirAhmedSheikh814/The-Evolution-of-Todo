"use client";

import Link from "next/link";
import { LoginForm } from "../../components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  const { loading } = useAuth();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          {loading ? (
            // Skeleton Loader for Login Page
            <div className="space-y-8">
              <div className="text-center mb-8">
                {/* Title Skeleton */}
                <Skeleton className="h-10 w-2/3 mx-auto bg-white/5 mb-3" />
                {/* Subtitle Skeleton */}
                <Skeleton className="h-5 w-1/2 mx-auto bg-white/5" />
              </div>

              {/* Card Skeleton */}
              <Skeleton className="h-[400px] w-full rounded-2xl bg-white/5" />
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-3 text-foreground">
                  Welcome back
                </h1>
                <p className="text-muted-foreground">
                  Sign in to your TaskFlow account to continue.
                </p>
              </div>

              <div className="bg-card/50 border border-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                <LoginForm />

                <p className="mt-6 text-center text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
