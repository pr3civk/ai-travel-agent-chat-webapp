'use client';

import type { UIMessage } from '@ai-sdk/react';
import type { UIDataTypes, UIMessagePart, UITools } from 'ai';
import { Loader } from 'lucide-react';
import { motion } from 'motion/react';
import { Markdown } from '@/components/markdown';

type Props = {
  message: UIMessage;
  index: number;
  isError: boolean;
};

export function MessageBubble({ message, index, isError }: Props) {
  const currentMessage = message.parts[
    message.parts.length - 1
  ] as UIMessagePart<UIDataTypes, UITools> & { text: string };

  const renderContent = () => {
    if (currentMessage.text === '') {
      return <Loader className="size-4 animate-spin mx-auto" />;
    }

    if (isError) {
      return <div className="text-red-500">Error occurred while generating response</div>;
    }

    // Don't render empty messages
    if (!currentMessage.text || currentMessage.text.trim() === '') {
      return null;
    }

    return <Markdown>{currentMessage.text}</Markdown>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index === 0 ? 1 : index * 0.1 + 0.6, duration: 0.3 }}
      className={`px-4 py-3 rounded-2xl backdrop-blur-xl border ${
        message.role === 'user'
          ? 'bg-white/20 border-white/30 text-white rounded-br-md'
          : 'bg-white/10 border-white/20 text-white rounded-bl-md'
      }`}
    >
      {renderContent()}
    </motion.div>
  );
}
