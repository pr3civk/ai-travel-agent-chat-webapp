'use client';

import { env } from "@/config/env";
import { ConvexProvider, ConvexReactClient } from "convex/react";

export const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};