import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

const MAX_PROMPTS_PER_IP = 20;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

export const checkRateLimit = query({
  args: {
    ipAddress: v.string(),
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Find existing rate limit record
    const existingLimit = await ctx.db
      .query('ipRateLimits')
      .withIndex('by_ip_user', (q) =>
        q.eq('ipAddress', args.ipAddress).eq('userId', args.userId))
      .first();

    if (!existingLimit) {
      // No previous record, user can make requests
      return {
        allowed: true,
        remaining: MAX_PROMPTS_PER_IP,
        resetAt: now + RESET_INTERVAL_MS,
      };
    }

    // Check if we need to reset the counter (24h passed)
    const shouldReset = now - existingLimit.lastResetAt >= RESET_INTERVAL_MS;

    if (shouldReset) {
      return {
        allowed: true,
        remaining: MAX_PROMPTS_PER_IP - 1,
        resetAt: now + RESET_INTERVAL_MS,
      };
    }

    // Check if user has exceeded the limit
    const remaining = MAX_PROMPTS_PER_IP - existingLimit.promptCount;
    const allowed = remaining > 0;

    return {
      allowed,
      remaining: Math.max(0, remaining),
      resetAt: existingLimit.lastResetAt + RESET_INTERVAL_MS,
    };
  },
});

export const incrementRateLimit = mutation({
  args: {
    ipAddress: v.string(),
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Find existing rate limit record
    const existingLimit = await ctx.db
      .query('ipRateLimits')
      .withIndex('by_ip_user', (q) =>
        q.eq('ipAddress', args.ipAddress).eq('userId', args.userId))
      .first();

    if (!existingLimit) {
      // Create new record
      await ctx.db.insert('ipRateLimits', {
        ipAddress: args.ipAddress,
        userId: args.userId,
        promptCount: 1,
        lastResetAt: now,
        createdAt: now,
        updatedAt: now,
      });
      return;
    }

    // Check if we need to reset the counter (24h passed)
    const shouldReset = now - existingLimit.lastResetAt >= RESET_INTERVAL_MS;

    if (shouldReset) {
      // Reset the counter
      await ctx.db.patch(existingLimit._id, {
        promptCount: 1,
        lastResetAt: now,
        updatedAt: now,
      });
    } else {
      // Increment the counter
      await ctx.db.patch(existingLimit._id, {
        promptCount: existingLimit.promptCount + 1,
        updatedAt: now,
      });
    }
  },
});
