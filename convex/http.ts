import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { API_ROUTES } from "../src/config/routes";
import { httpAction } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { type UIMessage,streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
    method: "POST",
    path: "/chat",
    handler: httpAction(async (ctx, req) => {
        const userId = await getAuthUserId(ctx);

        if(!userId) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { messages }: { messages: UIMessage[] } = await req.json();
        const last10Messages = messages.slice(-10);

        try {
        const result = streamText({
            model: openai("gpt-5-nano"),
            system: "You are a travel agent. You are given a message from a user and you need to respond to them.",
            messages: convertToModelMessages(last10Messages),
            onError: (error) => {
                console.error(error);
            }
        });

        const origin = req.headers.get("Origin") ?? "*";

        return result.toUIMessageStreamResponse({
            headers: new Headers({
              "Access-Control-Allow-Origin": origin,
              "Vary": "Origin",
              "Access-Control-Allow-Methods": "POST, OPTIONS",
            }),
          });
        } catch (error) {
            console.error(error);
            return Response.json({ error: "Internal server error" }, { status: 500 });
        }
    })
})


http.route({
    path: API_ROUTES.CHAT(),
    method: "OPTIONS",
    handler: httpAction(async (_, request) => {
      const headers = request.headers;
      const origin = headers.get("Origin") ?? "*";
      const requestHeaders = headers.get("Access-Control-Request-Headers") ?? "Authorization, Content-Type, Digest";
      if (
        headers.get("Origin") !== null &&
        headers.get("Access-Control-Request-Method") !== null
      ) {
        return new Response(null, {
          headers: new Headers({
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": requestHeaders,
            "Access-Control-Max-Age": "86400",
            "Vary": "Origin",
          }),
        });
      } else {
        return new Response();
      }
    }),
  });
export default http;
