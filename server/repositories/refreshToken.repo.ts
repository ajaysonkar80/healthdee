import { db } from "@/db";
import { refreshTokens } from "@/db/schema";
import { eq, and, lt } from "drizzle-orm";

/* --------------------------------------------------
   Refresh Token Repository
--------------------------------------------------- */

export const refreshTokenRepo = {
  /* ---------------- Create ---------------- */
  async create(params: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }) {
    await db.insert(refreshTokens).values({
      id: crypto.randomUUID(),
      userId: params.userId,
      tokenHash: params.tokenHash,
      expiresAt: params.expiresAt,
    });
  },

  /* ---------------- Find by Hash ---------------- */
  async findByHash(tokenHash: string) {
    const result = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.tokenHash, tokenHash))
      .limit(1);

    return result[0] ?? null;
  },

  /* ---------------- Delete by Hash ---------------- */
  async deleteByHash(tokenHash: string) {
    await db
      .delete(refreshTokens)
      .where(eq(refreshTokens.tokenHash, tokenHash));
  },

  /* ---------------- Delete All for User ---------------- */
  async deleteAllForUser(userId: string) {
    await db
      .delete(refreshTokens)
      .where(eq(refreshTokens.userId, userId));
  },

  /* ---------------- Cleanup Expired ---------------- */
  async deleteExpired() {
    await db
      .delete(refreshTokens)
      .where(lt(refreshTokens.expiresAt, new Date()));
  },
};
