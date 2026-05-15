import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getEnv } from "./env";

let limiter: Ratelimit | null = null;

function getLimiter() {
  if (limiter) return limiter;
  const env = getEnv();
  const redis = new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN });
  limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(1, "60 s"),
    analytics: false,
    prefix: "tw:contact",
  });
  return limiter;
}

export async function checkContactLimit(ip: string) {
  const { success, reset } = await getLimiter().limit(ip);
  return { success, retryAfterSeconds: Math.max(0, Math.ceil((reset - Date.now()) / 1000)) };
}
