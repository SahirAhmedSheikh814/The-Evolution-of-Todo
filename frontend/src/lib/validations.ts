import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/, "Must contain uppercase").regex(/[0-9]/, "Must contain number"),
});

export const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});
