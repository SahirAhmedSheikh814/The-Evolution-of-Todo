'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, LogIn, UserPlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoginGateProps {
  onClose?: () => void;
}

export const LoginGate: React.FC<LoginGateProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center h-full p-6 text-center"
    >
      <div className="mb-4 p-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 shadow-inner">
        <Bot className="w-10 h-10 text-primary drop-shadow-sm" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          TaskFlow AI Assistant
        </h3>
        <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
      </div>

      <p className="text-sm text-muted-foreground mb-8 max-w-[260px] leading-relaxed">
        Unlock your personal productivity companion. Please login to continue.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-[220px]">
        <Button asChild className="w-full bg-gradient-to-r from-violet-600 to-indigo-600">
          <Link href="/login" onClick={onClose}>
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full">
          <Link href="/register" onClick={onClose}>
            <UserPlus className="w-4 h-4 mr-2" />
            Create Account
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default LoginGate;
