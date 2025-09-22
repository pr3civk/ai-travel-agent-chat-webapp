"use client";

import { APP_ROUTES } from "@/utils/routes";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  children: (props: { handleLogout: () => void, isSigningOut: boolean }) => React.ReactNode;
  redirectTo?: string;
}   

export function LogoutWrapper({ children, redirectTo = APP_ROUTES.SIGN_IN }: Props) {
    const { signOut } = useAuthActions();

    const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    setIsSigningOut(true);
    try {
      await signOut();
      router.push(redirectTo);
    } catch (error) {
        toast.error("Failed to logout");
      console.error(error);
    } finally {
      setIsSigningOut(false);
    }
  }

  return children({ handleLogout, isSigningOut });
}