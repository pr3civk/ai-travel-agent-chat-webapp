'use client';

import { Bot, User } from 'lucide-react';
import { motion } from 'motion/react';

type Props = {
  role: 'user' | 'assistant' | 'system';
  index: number;
};

export function MessageAvatar({ role, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index === 0 ? 1 : index * 0.1 + 0.3, duration: 0.3 }}
      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        role === 'user'
          ? 'bg-gradient-to-br from-blue-400 to-purple-500'
          : 'bg-gradient-to-br from-emerald-400 to-teal-500'
      }`}
    >
      {role === 'user' ? (
        <User className="size-4 text-white" />
      ) : (
        <Bot className="size-4 text-white" />
      )}
    </motion.div>
  );
}
