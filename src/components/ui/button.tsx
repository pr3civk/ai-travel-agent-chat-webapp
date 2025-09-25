import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 shadow-lg hover:shadow-xl',
        destructive:
          'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 shadow-lg hover:shadow-xl focus-visible:ring-red-500/50',
        outline:
          'bg-transparent text-foreground border border-white/20 hover:bg-white/5 hover:border-white/30 shadow-sm hover:shadow-md',
        secondary:
          'bg-gray-500/10 text-gray-300 border border-gray-500/20 hover:bg-gray-500/20 hover:border-gray-500/30 shadow-lg hover:shadow-xl',
        ghost:
          'bg-transparent text-foreground hover:bg-white/5 hover:text-foreground border border-transparent hover:border-white/10',
        link: 'text-primary underline-offset-4 hover:underline bg-transparent',
        glass: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-lg hover:shadow-xl backdrop-blur-md',
        glassDark: 'bg-black/10 text-gray-200 border border-gray-500/20 hover:bg-black/20 hover:border-gray-400/30 shadow-lg hover:shadow-xl backdrop-blur-md',
      },
      size: {
        default: 'h-10 px-6 py-2 has-[>svg]:px-4',
        sm: 'h-8 rounded-md gap-1.5 px-4 has-[>svg]:px-3 text-xs',
        lg: 'h-12 rounded-lg px-8 has-[>svg]:px-6 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    as?: React.ElementType;
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
