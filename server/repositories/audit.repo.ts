import { db } from "@/db";
import { auditLogs } from "@/db/schema"; // adjust import path if needed
import type { AuditLogInput } from "../domain/audit.domain";
import { RepositoryError } from "./user.repo";

/**
 * Audit Repository
 *
 * Append-only storage for audit logs.
 * No domain validation here.
 */
export const auditRepo = {
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
      throw new RepositoryError(
        "NOT_FOUND",
        "Failed to persist audit log"
      );
    }
  },
};
