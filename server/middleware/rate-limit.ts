// server/middleware/rate-limit.ts
// Configurable per-route rate limiter.
// Usage: const check = createRateLimit({ max: 5, windowMs: 15 * 60 * 1000 });
//        const limited = await check(req); if (limited) return limited;

import type { NextRequest } from "next/server";
import { error }              from "@/server/http/response";
import { features }           from "@/lib/config/features";
import { MemoryRateLimitStore } from "@/server/rate-limit/memory-store";
import { SQLiteRateLimitStore } from "@/server/rate-limit/sqlite-store";

// One shared store instance per process
const store =
  process.env.NODE_ENV === "production"
    ? new SQLiteRateLimitStore()
    : new MemoryRateLimitStore();

interface RateLimitConfig {
  max:      number; // max requests
  windowMs: number; // window in ms
  // Optional prefix to namespace keys (e.g. "signup", "login")
  prefix?:  string;
}

export function createRateLimit(config: RateLimitConfig) {
  return async function checkRateLimit(req: NextRequest) {
    if (!features.RATE_LIMIT_ENABLED) return null;

    const ip     = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const prefix = config.prefix ? `${config.prefix}:` : "";
    const key    = `${prefix}ip:${ip}`;
    const count  = await store.incr(key, config.windowMs);

    if (count > config.max) {
      return error({
        message: `Too many requests. Please try again later.`,
        status:  429,
        code:    "RATE_LIMIT_EXCEEDED",
      });
    }

    return null; // no limit hit
  };
}

/* ── Pre-configured limiters for auth routes ── */

// 5 registrations per 15 min per IP
export const signupRateLimit = createRateLimit({
  max: 5, windowMs: 15 * 60 * 1000, prefix: "signup",
});

// 10 login attempts per 15 min per IP
export const loginRateLimit = createRateLimit({
  max: 10, windowMs: 15 * 60 * 1000, prefix: "login",
});

// 3 OTP requests per 10 min per IP
export const otpRequestRateLimit = createRateLimit({
  max: 3, windowMs: 10 * 60 * 1000, prefix: "otp_req",
});

// 5 OTP verify attempts per 10 min per IP
export const otpVerifyRateLimit = createRateLimit({
  max: 5, windowMs: 10 * 60 * 1000, prefix: "otp_verify",
});

// 3 password reset requests per 15 min per IP
export const passwordResetRateLimit = createRateLimit({
  max: 3, windowMs: 15 * 60 * 1000, prefix: "pwd_reset",
});