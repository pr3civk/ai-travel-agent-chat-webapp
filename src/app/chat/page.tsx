import { APP_ROUTES } from "@/config/routes";
import { generateNewChatId } from "@/utils/chat";
import { redirect } from "next/navigation";

export default function RedirectToChatPage() {
  const newChatUrl = generateNewChatId();

  return redirect(APP_ROUTES.CHAT(newChatUrl));
}
