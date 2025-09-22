import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
  } from "@convex-dev/auth/nextjs/server";
import { APP_ROUTES } from "./utils/routes";
  
  const isSignInPage = createRouteMatcher([APP_ROUTES.SIGN_IN]);
  const isProtectedRoute = createRouteMatcher(["/chat(.*)", "/chats"]);
  
  export default convexAuthNextjsMiddleware(
    async (request, { convexAuth }) => {
      if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
        return nextjsMiddlewareRedirect(request, APP_ROUTES.CHAT());
      }
      if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
        return nextjsMiddlewareRedirect(request, APP_ROUTES.SIGN_IN);
      }
    },
    {
      cookieConfig: { maxAge: 60 * 60 * 24 * 30 },
    }
  );
  
  export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };