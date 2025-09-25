'use client';

import type { UIMessage } from '@ai-sdk/react';
import type { UIDataTypes, UIMessagePart, UITools } from 'ai';
import { Bot, Send, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Markdown } from '@/components/markdown';
import { useChatInput } from '../hooks/use-chat-input';
import { useChatMessages } from '../hooks/use-chat-messages';

export default function ChatBox({ chatId }: { chatId: string }) {
  const chatInput = useChatInput({
    chatId,
    defaultPlaceholder: 'Type your message...',
  });
  const { messages, handleSubmit } = useChatMessages({
    input: chatInput.inputValue,
  });

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-h-[800px] w-full mx-auto">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full overflow-y-auto px-4 py-6 space-y-4"
        >
          {messages.map((message, index) => {
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
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.2 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-400 to-purple-500'
                        : 'bg-gradient-to-br from-emerald-400 to-teal-500'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </motion.div>

                  {/* Message Bubble */}
                  <MessageBubble message={message} index={index} />
                </div>
              </motion.div>
            );
          })}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          chatInput.resetInputValue();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="p-4 border-t border-white/20"
        >
          <div className="flex items-end space-x-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-3">
            <div className="flex-1">
              <textarea
                className="w-full bg-transparent text-white placeholder-white/60 resize-none border-none outline-none text-sm leading-relaxed min-h-[20px] max-h-32"
                rows={1}
                {...chatInput.options}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white hover:from-blue-500 hover:to-purple-600 transition-all duration-200"
            >
              <Send className="size-4" />
            </motion.button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
type MessageProps = {
  message: UIMessage;
  index: number;
};

function MessageBubble({ message, index }: MessageProps) {
  const currentMessage = message.parts[message.parts.length - 1] as UIMessagePart<UIDataTypes, UITools> & { text: string };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
      className={`px-4 py-3 rounded-2xl backdrop-blur-xl border ${
        message.role === 'user'
          ? 'bg-white/20 border-white/30 text-white rounded-br-md'
          : 'bg-white/10 border-white/20 text-white rounded-bl-md'
      }`}
    >
      <Markdown>{currentMessage.text}</Markdown>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: index * 0.1 + 0.8 }}
        className="text-xs mt-1 opacity-70"
      >
      </motion.p>
    </motion.div>
  );
}
