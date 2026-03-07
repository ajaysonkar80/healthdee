import type { RateLimitStore } from "./store";
import { db } from "@/db";
import { rateLimits } from "@/db/schema";
import { eq } from "drizzle-orm";

export class SQLiteRateLimitStore implements RateLimitStore {
  async incr(key: string, windowMs: number): Promise<number> {
    const now = Date.now();

    const existing = await db
      .select()
      .from(rateLimits)
      .where(eq(rateLimits.key, key))
      .get();

    if (!existing || existing.resetAt <= now) {
      await db
        .insert(rateLimits)
        .values({
          key,
          count: 1,
          resetAt: now + windowMs,
        })
        .onConflictDoUpdate({
          target: rateLimits.key,
          set: {
            count: 1,
            resetAt: now + windowMs,
          },
        });

      return 1;
    }

    const nextCount = existing.count + 1;

    await db
      .update(rateLimits)
      .set({ count: nextCount })
      .where(eq(rateLimits.key, key));

    return nextCount;
  }
}
