import { isServer } from "@/utils/env";
import { z } from "zod";

export enum NodeEnv {
  Development = "development",
  Test = "test",
  Production = "production",
}

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  NODE_ENV: z.enum(NodeEnv).optional().default(NodeEnv.Development),
  OPEN_AI_KEY: z.string(),
});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  NEXT_PUBLIC_CONVEX_URL: z.string(),
  NEXT_PUBLIC_CONVEX_API_CALL_URL: z.string(),
  NEXT_PUBLIC_URL: z.string().optional().default("http://localhost:3000"),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 */
const processEnv = () => ({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_CONVEX_API_CALL_URL: process.env.NEXT_PUBLIC_CONVEX_URL?.replace(
    /.cloud$/,
    ".site"
  ),
  OPEN_AI_KEY: process.env.OPEN_AI_KEY,
});

const merged = server.extend(client.shape);

type MergedOutput = z.infer<typeof merged>;

const createEnv = (): MergedOutput => {
  if (process.env.SKIP_ENV_VALIDATION === "true") {
    return processEnv() as MergedOutput;
  }

  const parsed = isServer
    ? merged.safeParse(processEnv()) // on server we can validate all env vars
    : client.safeParse(processEnv()); // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error("Invalid environment variables:", z.treeifyError(parsed.error));
    throw new Error("Invalid environment variables");
  }

  return new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") {
        return undefined;
      }

      if (!isServer && !prop.startsWith("NEXT_PUBLIC_")) {
        throw new Error(
          process.env.NODE_ENV === NodeEnv.Production
            ? "Attempted to access a server-side environment variable on the client"
            : `Attempted to access server-side environment variable '${prop}' on the client`,
        );
      }
      return target[prop as keyof typeof target];
    },
  }) as MergedOutput;
};

let envCache: MergedOutput;

const getEnv = () => {
  if (!envCache) {
    envCache = createEnv();
  }

  return envCache;
};

const env = getEnv();

export { env, server, client };
