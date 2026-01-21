'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      await api.post('/auth/login', { email, password });
      const { data } = await api.get('/auth/me');
      setUser(data);
      // Ensure state is committed before callers navigate to protected routes.
      await new Promise((r) => setTimeout(r, 0));
      return { success: true };
    } catch (error: any) {
      setUser(null);
      return {
        success: false,
        error: error.response?.data?.detail || error.response?.data?.message || error.response?.data?.error || 'Login failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Register, then immediately log in to create the auth cookie,
    // then fetch /me so the app state is authenticated.
    setLoading(true);
    try {
      await api.post('/auth/register', { email, password });
      await api.post('/auth/login', { email, password });
      const { data } = await api.get('/auth/me');
      setUser(data);
      // Ensure state is committed before callers navigate to protected routes.
      await new Promise((r) => setTimeout(r, 0));
      return { success: true };
    } catch (error: any) {
      setUser(null);
      return {
        success: false,
        error: error.response?.data?.detail || error.response?.data?.message || error.response?.data?.error || 'Registration failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
