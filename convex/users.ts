import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getUsers = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user;
  },
});

export const checkIfUserExists = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).first();
    return user !== null;
  },
});
