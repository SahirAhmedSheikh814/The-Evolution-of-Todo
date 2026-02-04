'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { LoginGate } from './LoginGate';
import { sendMessage, getHistory } from '@/lib/chat-api';
import type { ChatMessage } from '@/lib/chat-api';

export const ChatWidget: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const loadHistory = useCallback(async () => {
    if (!user || historyLoaded) return;

    try {
      const history = await getHistory(50, 0);
      setMessages(history.messages);
      setHistoryLoaded(true);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  }, [user, historyLoaded]);

  useEffect(() => {
    if (isOpen && user && !historyLoaded) {
      loadHistory();
    }
  }, [isOpen, user, historyLoaded, loadHistory]);

  useEffect(() => {
    if (!user) {
      setMessages([]);
      setHistoryLoaded(false);
    }
  }, [user]);

  const handleSend = async (message: string) => {
    const tempId = `temp-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: tempId,
      role: 'user',
      content: message,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(message);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.message,
        created_at: response.created_at,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Trigger dashboard refresh if tasks were modified
      // Dispatch immediately and with a small delay to handle potential race conditions
      if (typeof window !== 'undefined') {
        console.log('ChatWidget: Dispatching todo-updated event');
        window.dispatchEvent(new Event('todo-updated'));

        // Backup dispatch in case of race conditions
        setTimeout(() => {
          console.log('ChatWidget: Dispatching backup todo-updated event');
          window.dispatchEvent(new Event('todo-updated'));
        }, 500);
      }
    } catch (error) {
      console.error('Failed to send message:', error);

      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again in a moment.",
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  if (authLoading) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence mode="wait">
        {isOpen && (
          user ? (
            <ChatWindow
              key="chat-window"
              messages={messages}
              isLoading={isLoading}
              onSend={handleSend}
              onClose={handleClose}
            />
          ) : (
            <div
              key="login-gate"
              className="w-[350px] h-[400px] bg-background border rounded-lg shadow-lg overflow-hidden"
            >
              <LoginGate onClose={handleClose} />
            </div>
          )
        )}
      </AnimatePresence>

      <ChatButton isOpen={isOpen} onClick={handleToggle} />
    </div>
  );
};

export default ChatWidget;
