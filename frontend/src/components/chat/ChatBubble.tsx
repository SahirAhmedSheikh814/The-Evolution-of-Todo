'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  content,
  timestamp,
}) => {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex gap-3 max-w-[85%]',
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'
      )}
    >
      <Avatar className={cn(
        "h-8 w-8 border shadow-sm ring-1 ring-background",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border-border"
      )}>
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        'flex flex-col',
        isUser ? 'items-end' : 'items-start'
      )}>
        <div
          className={cn(
            'px-4 py-2.5 shadow-sm text-sm break-words relative group transition-all',
            isUser
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-[20px] rounded-tr-[2px]' // Gradient for user
              : 'bg-muted/80 text-foreground border border-border/20 rounded-[20px] rounded-tl-[2px]' // Sharp top-left for AI
          )}
        >
          <div className="leading-relaxed">
             {content}
          </div>

          <div className={cn(
            "text-[10px] mt-1 font-medium opacity-70 select-none flex items-center justify-end gap-1",
            isUser ? "text-white/80" : "text-muted-foreground"
          )}>
            {formatTime(timestamp)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
