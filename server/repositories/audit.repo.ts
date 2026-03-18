// server/repositories/audit.repo.ts
import { db } from "@/db";
import { auditLogs, users } from "@/db/schema";
import type { AuditLogInput } from "../domain/audit.domain";
import { RepositoryError } from "./user.repo";
import { desc, eq, sql } from "drizzle-orm";

/**
 * Audit Repository — append-only.
 * No domain validation here; callers are responsible.
 */
export const auditRepo = {
  /* --------------------------------------------------
     Write
  --------------------------------------------------- */
  async create(input: AuditLogInput): Promise<void> {
    try {
      await db.insert(auditLogs).values({
        actorUserId: input.actorUserId ?? null,
        action: input.action,
        targetType: input.targetType,
        targetId: input.targetId,
        metadata: input.metadata ?? null,
        createdAt: new Date(),
      });
    } catch (err) {
      void err;
      throw new RepositoryError("NOT_FOUND", "Failed to persist audit log");
    }
  },

  /* --------------------------------------------------
     Read — recent activity feed for admin dashboard.
     Joins users so we get the actor's display name.
     limit: how many rows to return (default 20 so the
     client can paginate locally without extra fetches).
  --------------------------------------------------- */
  async getRecent(limit = 20) {
    const rows = await db
      .select({
        id:          auditLogs.id,
        action:      auditLogs.action,
        targetType:  auditLogs.targetType,
        targetId:    auditLogs.targetId,
        metadata:    auditLogs.metadata,
        createdAt:   auditLogs.createdAt,
        actorName:   users.name,
      })
      .from(auditLogs)
      .leftJoin(users, eq(users.id, auditLogs.actorUserId))
      .orderBy(desc(auditLogs.createdAt))
      .limit(limit);

    return rows;
  },
};

/* --------------------------------------------------
   Inferred row type — consumed by RecentActivity
--------------------------------------------------- */
export type AuditLogEntry = Awaited<
  ReturnType<typeof auditRepo.getRecent>
>[number];