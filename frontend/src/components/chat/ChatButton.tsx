'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={onClick}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center hover:brightness-110 transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 relative group overflow-hidden"
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full blur-md" />

            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
              className="relative z-10"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-7 h-7 stroke-[2.5]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Bot className="w-8 h-8 stroke-[2]" />
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="left" className="mr-2 font-medium px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-primary/20 animate-in fade-in slide-in-from-right-2">
          <p>{isOpen ? 'Close TaskFlow' : 'Ask TaskFlow AI'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatButton;
