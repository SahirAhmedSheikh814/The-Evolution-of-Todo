'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../lib/validations';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    setError('');
    try {
      await registerUser(data.email, data.password);
      router.push('/dashboard');
    } catch (err: any) {
      let msg = err.response?.data?.detail || err.response?.data?.message || err.response?.data?.error || 'Registration failed';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-6 mb-8 rounded-2xl border-4 border-red-600 bg-gradient-to-br from-red-100 to-orange-100 text-red-900 font-bold text-lg shadow-2xl ring-8 ring-red-300/50">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Email</label>
        <input
          {...register('email')}
          type="email"
          className="flex h-11 w-full rounded-md border border-white/10 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          placeholder="Enter your email"
        />
        {errors.email && (
          <div className="text-sm text-red-300">{String(errors.email.message)}</div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Password</label>
        <input
          {...register('password')}
          type="password"
          className="flex h-11 w-full rounded-md border border-white/10 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          placeholder="Min 8 chars, uppercase & number"
        />
        {errors.password && (
          <div className="text-sm text-red-300">{String(errors.password.message)}</div>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:from-blue-700 hover:to-purple-700"
      >
        Create account
      </button>
    </form>
  );
};
