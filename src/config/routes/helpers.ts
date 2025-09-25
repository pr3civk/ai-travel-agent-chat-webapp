import { env } from '../env';

export function getConvexApiUrl(route: string) {
  return env.NEXT_PUBLIC_CONVEX_API_CALL_URL + route;
}
