export type HandleKeyDownOptions = {
  key?: string;
  shiftKey?: boolean;
};

export function handleKeyDown(event: React.KeyboardEvent, callbackFn: () => void, options: HandleKeyDownOptions = {
  key: 'Enter',
  shiftKey: false,
}) {
  if (event.key === options.key && !event.shiftKey) {
    event.preventDefault();
    callbackFn();
  }
}
