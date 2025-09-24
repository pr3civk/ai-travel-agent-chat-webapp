export const APP_ROUTES = {
    SIGN_IN: "/sign-in",
    CHAT: (chatId?: string) => chatId ? `/chat/${chatId}` : "/chat",
    CHATS: () => "/chats",
    // TODO
  };
  
  export const API_ROUTES = {
    CHAT: () => "/api/chat",
  };
  
  