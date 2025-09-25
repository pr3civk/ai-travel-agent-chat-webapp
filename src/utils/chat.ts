export function generateNewChatId() {
  return `tac_${crypto.randomUUID()}`;
}
