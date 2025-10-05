import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { APP_ROUTES } from '@/config/routes';
import { isAuthenticated } from '../../../convex/auth';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAuthenticated) {
    return redirect(APP_ROUTES.SIGN_IN);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <Navbar />
        <main className="flex-1 py-2 px-4 overflow-hidden max-w-5xl mx-auto w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
