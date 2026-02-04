import { api } from './api';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ChatResponse {
  message: string;
  conversation_id: string;
  created_at: string;
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
  total: number;
  has_more: boolean;
}

export async function sendMessage(message: string): Promise<ChatResponse> {
  const { data } = await api.post<ChatResponse>('/chat', { message });
  return data;
}

export async function getHistory(
  limit: number = 50,
  offset: number = 0
): Promise<ChatHistoryResponse> {
  const { data } = await api.get<ChatHistoryResponse>('/chat/history', {
    params: { limit, offset },
  });
  return data;
}
