'use client';

import React, { useState, KeyboardEvent, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Type a message...',
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setMessage('');
      // focus back after send? maybe not needed on mobile
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 pb-8 border-t bg-background/80 backdrop-blur-md relative z-20">
      <div className={cn(
        "flex items-center gap-2 p-1 pl-4 bg-muted/30 border border-border rounded-full transition-all duration-200 group",
        "hover:border-primary/80",
        "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/60 focus-within:bg-background focus-within:shadow-sm"
      )}>
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={500}
          className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 shadow-none h-11 placeholder:text-muted-foreground/60"
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          aria-label="Send message"
          className={cn(
            "h-9 w-9 rounded-full shrink-0 shadow-sm transition-all duration-200 mr-1",
            message.trim() && !disabled
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:scale-105 hover:shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted"
          )}
        >
          <Send className={cn("w-4 h-4 ml-0.5", message.trim() ? "fill-current" : "")} />
        </Button>
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-muted-foreground/70 pointer-events-none font-medium tracking-wide">
        Powered by TaskFlow AI
      </div>
    </div>
  );
};

export default ChatInput;
