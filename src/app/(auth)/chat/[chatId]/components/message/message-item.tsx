'use client';

import type { UIMessage } from '@ai-sdk/react';
import { motion } from 'motion/react';
import { MessageAvatar } from './message-avatar';
import { MessageBubble } from './message-bubble';

type Props = {
  message: UIMessage;
  index: number;
  isError: boolean;
};

export function MessageItem({ message, index, isError }: Props) {
  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex items-start space-x-3 max-w-[80%] ${
          message.role === 'user'
            ? 'flex-row-reverse space-x-reverse'
            : ''
        }`}
      >
        <MessageAvatar role={message.role} index={index} />
        <MessageBubble
          message={message}
          index={index}
          isError={isError}
        />
      </div>
    </motion.div>
  );
}
