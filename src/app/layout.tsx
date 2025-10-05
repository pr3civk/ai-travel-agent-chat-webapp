import type { Metadata } from 'next';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import { Toaster } from '@/components/ui/sonner';
import { ConvexClientProvider } from '@/lib/convex/convex-client-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Trip.AI - AI Travel Agent',
  description: 'Your personal AI travel assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Your personal AI travel assistant" />
      <meta name="keywords" content="AI, travel, assistant" />
      <meta name="author" content="Trip.AI" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="yandexbot" content="index, follow" />
      <html lang="en" className="bg-cyan-950">
        <body
          className={twJoin(geistSans.variable, geistMono.variable, 'antialiased bg-gradient-to-b from-cyan-950 from-45% to-yellow-900 text-white min-h-screen')}
        >
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
