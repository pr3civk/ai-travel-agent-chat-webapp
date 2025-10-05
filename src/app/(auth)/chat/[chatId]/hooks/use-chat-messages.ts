import type { UIMessage } from '@ai-sdk/react';
import { useChat } from '@ai-sdk/react';
import { useAuthToken } from '@convex-dev/auth/react';
import { DefaultChatTransport } from 'ai';
import { API_ROUTES } from '@/config/routes';
import { getConvexApiUrl } from '@/config/routes/helpers';

type Props = {
  input: string | undefined;
};

const initialMessage: UIMessage = {
  id: 'initial-message',
  role: 'assistant',
  parts: [{ type: 'text', text: 'Hello, I am a travel agent. How can I help you today?' }],
};

export function useChatMessages({ input }: Props) {
  const token = useAuthToken();

  const chat = useChat({
    messages: [initialMessage],
    transport: new DefaultChatTransport({
      api: getConvexApiUrl(API_ROUTES.CHAT()),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }),
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) {
      return;
    }
    if (!token) {
      console.log({ tokenMissing: true });
      return;
    }

    if (input.trim()) {
      try {
        await chat.sendMessage({ text: input });
      } catch (err) {
        console.log({ err });

        // Handle rate limit errors specifically
        if (err instanceof Error && err.message.includes('Rate limit exceeded')) {
          // You can add toast notification here
          console.error('Rate limit exceeded. Please try again later.');
        }
      }
    }
  }

  const isResponding = chat.status === 'streaming';
  const isReady = chat.status === 'ready';
  const isError = chat.status === 'error';
  const isSubmitted = chat.status === 'submitted';

  const lastMessage = chat.messages[chat.messages.length - 1];
  const isLastMessageUser = lastMessage?.role === 'user';

  const isWaitingForResponse = (isSubmitted || isResponding);

  return {
    ...chat,
    handleSubmit,
    isResponding,
    isReady,
    isError,
    isSubmitted,
    isWaitingForResponse,
    isLastMessageUser,
  };
}
