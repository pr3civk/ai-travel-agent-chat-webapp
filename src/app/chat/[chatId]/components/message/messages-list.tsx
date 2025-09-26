'use client';

import type { UIMessage } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { MessageItem } from './message-item';

type MessagesListProps = {
  messages: UIMessage[];
  isWaitingForResponse: boolean;
  isError: boolean;
};

export function MessagesList({ messages, isWaitingForResponse, isError }: MessagesListProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!endOfMessagesRef.current) {
      return;
    }

    endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isWaitingForResponse]);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => {
          return (
            <MessageItem
              key={message.id}
              message={message}
              index={index}
              isError={isError}
            />
          );
        })}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
}
