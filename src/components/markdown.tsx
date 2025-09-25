import type { ExtraProps } from 'react-markdown';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

type Props = {
  children: string;
};

function conditionalMarginTop(
  props: React.ClassAttributes<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement> & ExtraProps,
  marginTopClassName: string,
) {
  // Don't add margin top to the first line element
  return props.node?.position?.start.line === 1 ? 'mt-0' : marginTopClassName;
}

export function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      components={{
        p(props) {
          return <div className="mb-[0.5rem]">{props.children}</div>;
        },
        h1(props) {
          return (
            <strong className={cn('mb-1 block', conditionalMarginTop(props, 'mt-6'))}>{String(props.children)}</strong>
          );
        },
        h2(props) {
          return (
            <strong className={cn('mb-1 block', conditionalMarginTop(props, 'mt-4'))}>{String(props.children)}</strong>
          );
        },
        h3(props) {
          return (
            <strong className={cn('mb-1 block', conditionalMarginTop(props, 'mt-2'))}>{String(props.children)}</strong>
          );
        },
        blockquote(props) {
          return <blockquote className="text-neutral-200 italic">{props.children}</blockquote>;
        },
        ol(props) {
          return <ol className="my-2 list-decimal space-y-1 pl-4">{props.children}</ol>;
        },
        ul(props) {
          return <ul className="my-2 list-disc space-y-1 pl-4">{props.children}</ul>;
        },
        hr() {
          return <hr className="my-4 text-neutral-500 dark:text-white" />;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
