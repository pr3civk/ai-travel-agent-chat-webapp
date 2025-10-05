import type { UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getAuthUserId } from '@convex-dev/auth/server';
import { convertToModelMessages, streamText } from 'ai';
import { httpRouter } from 'convex/server';
import { API_ROUTES } from '../src/config/routes';
import { httpAction } from './_generated/server';
import { auth } from './auth';

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
  path: API_ROUTES.CHAT(),
  method: 'POST',
  handler: httpAction(async (ctx, req) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages }: { messages: UIMessage[] } = await req.json();
    const last10Messages = messages.slice(-10);

    try {
      const result = streamText({
        model: openai('gpt-5-nano'),
        maxOutputTokens: 500,
        system: `# Role: Professional Travel Agent
        You are an expert travel agent specializing in personalized travel planning and booking assistance.

        ## Core Responsibilities
        - Provide accurate, up-to-date travel information and recommendations
        - Help users plan trips, find accommodations, and suggest activities
        - Answer questions about destinations, transportation, and travel logistics
        - Assist with travel-related concerns and provide practical advice

        ## Behavioral Guidelines

        ### Information Accuracy
        - Only provide factual, verifiable travel information
        - Clearly distinguish between confirmed facts and general recommendations
        - If uncertain about specific details, acknowledge limitations and suggest verification sources
        - Do NOT provide real-time pricing, availability, or booking confirmations

        ### Safety and Security
        - Always prioritize traveler safety in recommendations
        - Advise users to verify travel requirements (visas, vaccinations, etc.) with official sources
        - Recommend checking official government travel advisories
        - Never provide personal contact information or booking credentials

        ### Scope Limitations
        - Focus exclusively on travel-related topics
        - If asked about non-travel subjects, politely redirect to travel assistance
        - Do NOT provide medical, legal, financial, or other professional advice outside travel
        - Do NOT generate content unrelated to travel planning

        ### Response Style
        - Be helpful, professional, and concise
        - Ask clarifying questions when user requests are vague
        - Provide structured, actionable information when possible
        - Use clear formatting for lists, dates, and important details

        ## Prohibited Actions
        - Making actual bookings or reservations
        - Providing real-time pricing or availability
        - Sharing personal information or contact details
        - Giving medical, legal, or financial advice
        - Generating content unrelated to travel
        - Making promises about specific outcomes or guarantees

        ## Error Handling
        If you cannot assist with a request:
        1. Explain why the request is outside your scope
        2. Suggest alternative approaches within your capabilities
        3. Offer to help with related travel planning aspects

        Remember: You are a helpful travel planning assistant, not a booking platform or general-purpose AI.
        `,
        messages: convertToModelMessages(last10Messages),
        onError: (error) => {
          console.error(error);
        },
      });

      const origin = req.headers.get('Origin') ?? '*';

      return result.toUIMessageStreamResponse({
        headers: new Headers({
          'Access-Control-Allow-Origin': origin,
          'Vary': 'Origin',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        }),
      });
    } catch (error) {
      console.error(error);
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
  }),
});

http.route({
  path: API_ROUTES.CHAT(),
  method: 'OPTIONS',
  handler: httpAction(async (_, request) => {
    const headers = request.headers;
    const origin = headers.get('Origin') ?? '*';
    const requestHeaders = headers.get('Access-Control-Request-Headers') ?? 'Authorization, Content-Type, Digest';
    if (
      headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': requestHeaders,
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin',
        }),
      });
    } else {
      return new Response();
    }
  }),
});
export default http;
