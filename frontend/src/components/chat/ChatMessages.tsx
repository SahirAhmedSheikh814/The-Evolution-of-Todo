'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatBubble } from './ChatBubble';
import type { ChatMessage } from '@/lib/chat-api';

interface ChatMessagesProps {
  messages: ChatMessage[];
  className?: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  className,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <p className="text-sm text-muted-foreground text-center px-4">
          Start a conversation! Ask me to add tasks, show your list, or help manage your todos.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className={`h-full ${className}`}>
      <div className="flex flex-col gap-3 p-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.created_at}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
