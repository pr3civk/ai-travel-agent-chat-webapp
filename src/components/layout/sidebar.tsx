"use client";

import React from "react";
import { LogoutWrapper } from "../logout-wrapper";
import { Button } from "../ui/button";
import {
  Loader2,
  LogOutIcon,
  Home,
  MessageSquare,
  Settings,
  Plane,
  Plus,
  Icon,
  PiIcon,
  PanelLeftOpen,
} from "lucide-react";
import Link from "next/link";
import { useAuthToken } from "@convex-dev/auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";
import { APP_ROUTES } from "@/utils/routes";
import { TooltipContent } from "../ui/tooltip";
import { TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip } from "../ui/tooltip";
import { AnimatePresence, motion } from "motion/react";

export function AppSidebar() {
  const token = useAuthToken();
  const { open } = useSidebar();

  const actions = [
    { label: "All chats", href: APP_ROUTES.CHATS(), icon: MessageSquare },
    { label: "Create chat", href: APP_ROUTES.CHAT(), icon: Plus },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="py-3 pl-1.5 pr-4">
        <div className="flex items-center justify-between w-full">
        <AnimatePresence mode='wait'>
            {open ? (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="flex items-center gap-2 bg-gradient-to-tr from-white/10 to-purple-500/20 rounded-lg p-1 w-fit"
              >
                  <Plane className="size-5" strokeWidth={0.75} />
                </motion.div>
            ) : (
              <motion.div
                key="trigger"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarTrigger variant="glass"/>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">
                      Toggle sidebar
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            )}
          </AnimatePresence>
          {open && <SidebarTrigger />}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {actions.map((action) => (
                <SidebarMenuItem key={action.href}>
                  <SidebarMenuButton asChild tooltip={action.label}>
                    <Link href={action.href}>
                      <action.icon className="size-4" />
                      {action.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {token && (
          <LogoutWrapper>
            {({ handleLogout, isSigningOut }) => (
              <Button
                onClick={handleLogout}
                disabled={isSigningOut}
                className="w-full"
                size="lg"
              >
                {isSigningOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOutIcon className="h-4 w-4" />
                )}
                <span className="ml-2">
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </span>
              </Button>
            )}
          </LogoutWrapper>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
