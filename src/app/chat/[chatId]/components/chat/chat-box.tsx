'use client';

import { useChatInput } from '../../hooks/use-chat-input';
import { useChatMessages } from '../../hooks/use-chat-messages';
import { MessagesList } from '../message/messages-list';
import { ChatInput } from './chat-input';

export default function ChatBox({ chatId }: { chatId: string }) {
  const chatInput = useChatInput({
    chatId,
    defaultPlaceholder: 'Type your message...',
  });
  const { messages, handleSubmit, isWaitingForResponse, isError } = useChatMessages({
    input: chatInput.inputValue,
  });

  return (
    <div className="flex flex-col h-full w-full mx-auto overflow-hidden max-h-[calc(100dvh-80px)] max-w-5xl">
      <MessagesList
        messages={messages}
        isWaitingForResponse={isWaitingForResponse}
        isError={isError}
      />
      <ChatInput
        onSubmit={handleSubmit}
        inputOptions={chatInput.options}
        onResetInput={chatInput.resetInputValue}
      />
    </div>
  );
}
