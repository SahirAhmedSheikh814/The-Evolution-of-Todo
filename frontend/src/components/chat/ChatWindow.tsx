'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import type { ChatMessage } from '@/lib/chat-api';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSend: (message: string) => void;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  onSend,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col w-[360px] h-[550px] bg-background/95 backdrop-blur-sm border border-border/40 rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
            <Bot className="w-5 h-5 text-white drop-shadow-sm" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-sm leading-none tracking-tight text-white">TaskFlow AI</h2>
              <Sparkles className="w-3 h-3 text-yellow-300 opacity-90 animate-pulse" />
            </div>
            <p className="text-[10px] text-white/90 font-medium opacity-90 mt-0.5">Your personal productivity assistant</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 text-white/90 hover:bg-white/20 hover:text-white rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden bg-muted/20 relative">
        <ChatMessages messages={messages} className="h-full" />
      </div>

      {/* Typing Indicator */}
      {isLoading && (
        <div className="bg-background/80 backdrop-blur-sm border-t border-border/50 absolute bottom-[70px] left-0 right-0 z-10 px-4 py-2">
           <TypingIndicator />
        </div>
      )}

      {/* Input */}
      <div className="z-20 bg-background">
        <ChatInput
          onSend={onSend}
          disabled={isLoading}
          placeholder={isLoading ? 'AI is thinking...' : 'Type a message...'}
        />
      </div>
    </motion.div>
  );
};

export default ChatWindow;
