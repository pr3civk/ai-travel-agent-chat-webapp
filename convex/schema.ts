import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
  ...authTables,

  chats: defineTable({
    chatId: v.string(),
    userId: v.id('users'),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),

    publicUrl: v.optional(v.string()),
  }),

  messages: defineTable({
    chatId: v.id('chats'),
    content: v.string(),
    role: v.union(v.literal('user'), v.literal('assistant')),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
  }),

  // Rate limiting table for IP-based restrictions
  ipRateLimits: defineTable({
    ipAddress: v.string(),
    userId: v.id('users'),
    promptCount: v.number(),
    lastResetAt: v.number(), // Timestamp when the limit was last reset
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_ip_user', ['ipAddress', 'userId']),

});

export default schema;
