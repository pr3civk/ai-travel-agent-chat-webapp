import { APP_ROUTES } from "@/config/routes";

export function generateNewChatId() {
  return "tac_" + crypto.randomUUID();
}
