import type { Metadata } from 'next';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import { Navbar } from '@/components/layout/navbar';
import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
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
      <html lang="en">
        <body
          className={twJoin(geistSans.variable, geistMono.variable, 'antialiased bg-gradient-to-b from-cyan-950 from-45% to-yellow-900 text-white min-h-screen')}
        >
          <ConvexClientProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="flex flex-col">
                <Navbar />
                <main className="flex-1 py-2 px-4 overflow-hidden">
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
