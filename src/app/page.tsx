import { redirect } from 'next/navigation';
import { APP_ROUTES } from '@/config/routes';
import { generateNewChatId } from '@/utils/chat';

export default function ChatApp() {
  const newChatUrl = generateNewChatId();

  return redirect(APP_ROUTES.CHAT(newChatUrl));
}
