import { APP_ROUTES } from "@/utils/routes";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ chatId: string }>;
}

export default async function ChatPage({ params }: Props) {
  const { chatId } = await params;

  if (!chatId) {
    return redirect(APP_ROUTES.CHAT());
  }


  return <div>ChatPage {chatId}</div>;
}
