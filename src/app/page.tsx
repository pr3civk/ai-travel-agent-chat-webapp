"use client";

import { useChat } from '@ai-sdk/react';
import { Send, MapPin, Plane, Sparkles, Globe, Compass, Menu, Plus, MessageSquare, User, Settings, LogOut, History, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export default function ChatApp() {
 

  return (
    <div className="">
      xd
    </div>
  );
}