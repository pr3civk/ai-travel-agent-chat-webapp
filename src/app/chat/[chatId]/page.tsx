import { redirect } from 'next/navigation';
import { APP_ROUTES } from '@/config/routes';
import ChatBox from './components/chat-box';

type Props = {
  params: Promise<{ chatId: string | undefined }>;
};

export default async function ChatPage({ params }: Props) {
  const { chatId } = await params;

  if (!chatId) {
    // TODO: add proper logic here
    return redirect(APP_ROUTES.CHAT());
  }

  return <ChatBox chatId={chatId} />;
}
