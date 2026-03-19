// server/repositories/doctor_earning.repo.ts
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq, and, gte, sql, desc } from "drizzle-orm";
import { RepositoryError } from "./user.repo";

/* ─────────────────────────────────────────────────────────
   Doctor Earning Repository

   Source of truth for all doctor payment data.
   One row per COMPLETED appointment — fee is snapshotted
   at completion time so no joins to doctors are needed
   for stats queries.
───────────────────────────────────────────────────────── */

export const doctorEarningRepo = {

  /* --------------------------------------------------
     Create — called once when appointment → COMPLETED
  --------------------------------------------------- */
  async createEarning(input: {
    doctorId:        string;
    appointmentId:   string;
    patientId:       string;
    appointmentType: "new" | "follow-up";
    feeAmount:       number;
    earnedAt:        Date;
  }) {
    // Guard: one earning per appointment (DB also enforces UNIQUE)
    const existing = await db.query.doctorEarnings.findFirst({
      where: eq(schema.doctorEarnings.appointmentId, input.appointmentId),
    });
    if (existing) return existing;

    const [earning] = await db
      .insert(schema.doctorEarnings)
      .values({
        doctorId:        input.doctorId,
        appointmentId:   input.appointmentId,
        patientId:       input.patientId,
        appointmentType: input.appointmentType,
        feeAmount:       input.feeAmount,
        status:          "paid",
        earnedAt:        input.earnedAt,
        createdAt:       new Date(),
      })
      .returning();

    return earning;
  },

  /* --------------------------------------------------
     Stats — single round-trip CASE WHEN aggregation
     All periods are derived from earnedAt column.
     SQLite: timestamps stored as Unix seconds (integer).
  --------------------------------------------------- */
  async getEarningsStats(doctorId: string) {
    const [row] = await db
      .select({
        allTime: sql<number>`
          sum(case when ${schema.doctorEarnings.status} = 'paid'
            then ${schema.doctorEarnings.feeAmount} else 0 end)`,

        today: sql<number>`
          sum(case when ${schema.doctorEarnings.status} = 'paid'
            and date(${schema.doctorEarnings.earnedAt}, 'unixepoch') = date('now')
            then ${schema.doctorEarnings.feeAmount} else 0 end)`,

        thisWeek: sql<number>`
          sum(case when ${schema.doctorEarnings.status} = 'paid'
            and ${schema.doctorEarnings.earnedAt}
              >= strftime('%s', 'now', 'weekday 1', '-6 days')
            then ${schema.doctorEarnings.feeAmount} else 0 end)`,

        thisMonth: sql<number>`
          sum(case when ${schema.doctorEarnings.status} = 'paid'
            and strftime('%Y-%m', ${schema.doctorEarnings.earnedAt}, 'unixepoch')
              = strftime('%Y-%m', 'now')
            then ${schema.doctorEarnings.feeAmount} else 0 end)`,

        totalCount: sql<number>`count(*)`,

        // Distinct patients served
        patientCount: sql<number>`count(distinct ${schema.doctorEarnings.patientId})`,
      })
      .from(schema.doctorEarnings)
      .where(eq(schema.doctorEarnings.doctorId, doctorId));

    return {
      allTime:      Number(row?.allTime      ?? 0),
      today:        Number(row?.today        ?? 0),
      thisWeek:     Number(row?.thisWeek     ?? 0),
      thisMonth:    Number(row?.thisMonth    ?? 0),
      totalCount:   Number(row?.totalCount   ?? 0),
      patientCount: Number(row?.patientCount ?? 0),
    };
  },

  /* --------------------------------------------------
     Paginated history — joins users + patientProfiles
     for patient name display.
  --------------------------------------------------- */
  async getEarningsHistory(
    doctorId: string,
    params?: {
      limit?:  number;
      offset?: number;
    }
  ) {
    const limit  = params?.limit  ?? 10;
    const offset = params?.offset ?? 0;

    const whereClause = eq(schema.doctorEarnings.doctorId, doctorId);

    const [data, [countRow]] = await Promise.all([
      db
        .select({
          id:              schema.doctorEarnings.id,
          appointmentId:   schema.doctorEarnings.appointmentId,
          appointmentType: schema.doctorEarnings.appointmentType,
          feeAmount:       schema.doctorEarnings.feeAmount,
          status:          schema.doctorEarnings.status,
          earnedAt:        schema.doctorEarnings.earnedAt,
          // Patient info
          patientUserName:  schema.users.name,
          patientFullName:  schema.patientProfiles.fullName,
        })
        .from(schema.doctorEarnings)
        .innerJoin(schema.users,  eq(schema.users.id,  schema.doctorEarnings.patientId))
        .leftJoin(
          schema.patientProfiles,
          eq(schema.patientProfiles.userId, schema.doctorEarnings.patientId)
        )
        .where(whereClause)
        .orderBy(desc(schema.doctorEarnings.earnedAt))
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.doctorEarnings)
        .where(whereClause),
    ]);

    return {
      data: data.map((r) => ({
        id:              r.id,
        appointmentId:   r.appointmentId,
        appointmentType: r.appointmentType as "new" | "follow-up",
        feeAmount:       r.feeAmount,
        status:          r.status as "paid" | "refunded",
        earnedAt:        r.earnedAt,
        patientName:     r.patientFullName ?? r.patientUserName ?? "Unknown",
      })),
      total: Number(countRow?.count ?? 0),
    };
  },

  /* --------------------------------------------------
     Check if earning already exists for an appointment
  --------------------------------------------------- */
  async existsForAppointment(appointmentId: string): Promise<boolean> {
    const row = await db.query.doctorEarnings.findFirst({
      where: eq(schema.doctorEarnings.appointmentId, appointmentId),
    });
    return Boolean(row);
  },

  /* --------------------------------------------------
     Refund — marks a paid earning as refunded.
     Does NOT delete — audit trail must remain.
  --------------------------------------------------- */
  async refundEarning(earningId: string) {
    const result = await db
      .update(schema.doctorEarnings)
      .set({ status: "refunded" })
      .where(eq(schema.doctorEarnings.id, earningId))
      .returning();

    if (!result.length) {
      throw new RepositoryError("NOT_FOUND", `Earning not found: ${earningId}`);
    }

    return result[0];
  },
};

/* --------------------------------------------------
   Inferred row types consumed by UI components
--------------------------------------------------- */
export type EarningHistoryRow = Awaited<
  ReturnType<typeof doctorEarningRepo.getEarningsHistory>
>["data"][number];

export type EarningStats = Awaited<
  ReturnType<typeof doctorEarningRepo.getEarningsStats>
>;