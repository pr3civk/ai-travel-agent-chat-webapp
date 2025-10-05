'use client';

import type { FormEvent } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';
import { Textarea } from '@/components/ui/textarea';
import { handleKeyDown } from '@/utils/key-down';

type Props = {
  inputOptions: Partial<React.ComponentProps<'textarea'>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onResetInput: () => void;
};

export function ChatInput({ onSubmit, inputOptions, onResetInput }: Props) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    onSubmit(e);
    onResetInput();
  }

  return (
    <form className="mt-auto" onSubmit={handleSubmit}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.5,
          type: 'tween',
          ease: 'easeOut',
        }}
        className="p-4 border-t border-white/20"
      >
        <div className="flex items-end gap-x-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-3">
          <div className="flex-1">
            <Textarea
              onKeyDown={(e) =>
                handleKeyDown(e, () =>
                  handleSubmit(e as unknown as FormEvent<HTMLFormElement>))
              }
              className="w-full resize-none  min-h-5 max-h-36"
              rows={1}
              {...inputOptions}
            />
          </div>
          <button
            aria-label="Send message"
            type="submit"
            className="active:scale-95 hover:scale-105 flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white hover:from-blue-500 hover:to-purple-600 transition-all duration-200"
          >
            <Send className="size-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </form>
  );
}
