import { useChat } from '@ai-sdk/react';
import { useAuthToken } from '@convex-dev/auth/react';
import { DefaultChatTransport } from 'ai';
import { API_ROUTES } from '@/config/routes';
import { getConvexApiUrl } from '@/config/routes/helpers';

type Props = {
  input: string | undefined;
};

export function useChatMessages({ input }: Props) {
  const token = useAuthToken();
  console.log({ token });

  const chat = useChat({
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
      }
    }
  }

  return {
    ...chat,
    handleSubmit,
  };
}
