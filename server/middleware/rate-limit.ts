import { NextRequest } from "next/server";
import { error } from "@/server/http/response";
import { MemoryRateLimitStore } from "@/server/rate-limit/memory-store";
import { SQLiteRateLimitStore } from "@/server/rate-limit/sqlite-store";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 100;

const store =
  process.env.NODE_ENV === "production"
    ? new SQLiteRateLimitStore()
    : new MemoryRateLimitStore();

export async function rateLimitMiddleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  // @ts-expect-error injected by auth middleware
  const key = req.auth?.userId ? `user:${req.auth.userId}` : `ip:${ip}`;

  const count = await store.incr(key, WINDOW_MS);

  if (count > MAX_REQUESTS) {
    return error({
      message: "Too many requests",
      status: 429,
      code: "RATE_LIMIT_EXCEEDED",
    });
  }
}
