import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-2 text-base shadow-lg transition-all duration-300 outline-none placeholder:text-white/60 text-white focus-visible:border-white/40 focus-visible:bg-white/20 focus-visible:shadow-xl focus-visible:shadow-white/10 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
