// server/repositories/prescription.repo.ts
import { db } from "@/db";
import * as schema from "@/db/schema";
import { sql } from "drizzle-orm";
import type { PaginationParams } from "./user.repo";
import { RepositoryError } from "./user.repo";

/* -----------------------------------------------------
   Helpers
----------------------------------------------------- */

const DEFAULT_LIMIT = 20;

function getPagination(params?: PaginationParams) {
  return {
    limit: params?.limit ?? DEFAULT_LIMIT,
    offset: params?.offset ?? 0,
  };
}

/* -----------------------------------------------------
   Prescription Repository
----------------------------------------------------- */

export const prescriptionRepo = {
  /* -----------------------------
     Prescriptions
  ----------------------------- */

  async createPrescription(input: {
    consultationId: string;
    doctorId: string;
    patientId: string;
  }) {
    const now = new Date();

    const [prescription] = await db
      .insert(schema.prescriptions)
      .values({
        consultationId: input.consultationId,
        doctorId: input.doctorId,
        patientId: input.patientId,
        createdAt: now,
      })
      .returning();

    return prescription;
  },

  async getPrescriptionById(prescriptionId: string) {
    const prescription = await db.query.prescriptions.findFirst({
      where: sql`${schema.prescriptions.id} = ${prescriptionId}`,
    });

    if (!prescription) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Prescription not found: ${prescriptionId}`
      );
    }

    return prescription;
  },

  async getPrescriptionByConsultation(consultationId: string) {
    const prescription = await db.query.prescriptions.findFirst({
      where: sql`${schema.prescriptions.consultationId} = ${consultationId}`,
    });

    if (!prescription) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Prescription not found for consultation: ${consultationId}`
      );
    }

    return prescription;
  },

  /* -----------------------------
     Prescription Items
  ----------------------------- */

  async addPrescriptionItem(input: {
    prescriptionId: string;
    drugName: string;
    dosage: string;
    frequency: string;
    durationDays: number;
    scheduleClass: schema.ScheduleClass;
  }) {
    const [item] = await db
      .insert(schema.prescriptionItems)
      .values({
        prescriptionId: input.prescriptionId,
        drugName: input.drugName,
        dosage: input.dosage,
        frequency: input.frequency,
        durationDays: input.durationDays,
        scheduleClass: input.scheduleClass,
      })
      .returning();

    return item;
  },

  async listPrescriptionItems(prescriptionId: string) {
    return db
      .select()
      .from(schema.prescriptionItems)
      .where(sql`${schema.prescriptionItems.prescriptionId} = ${prescriptionId}`);
  },

  /* -----------------------------
     Listing / Search
  ----------------------------- */

  async listPrescriptionsByPatient(
    patientId: string,
    params?: PaginationParams & {
      from?: Date;
      to?: Date;
      searchDrug?: string;
    }
  ) {
    const { limit, offset } = getPagination(params);

    let where = sql`${schema.prescriptions.patientId} = ${patientId}`;

    if (params?.from) {
      where = sql`${where} AND ${schema.prescriptions.createdAt} >= ${params.from}`;
    }

    if (params?.to) {
      where = sql`${where} AND ${schema.prescriptions.createdAt} <= ${params.to}`;
    }

    if (params?.searchDrug) {
      const search = `%${params.searchDrug}%`;

      where = sql`
        ${where}
        AND ${schema.prescriptions.id} IN (
          SELECT ${schema.prescriptionItems.prescriptionId}
          FROM ${schema.prescriptionItems}
          WHERE ${schema.prescriptionItems.drugName} LIKE ${search}
        )
      `;
    }

    const [data, [{ count }]] = await Promise.all([
      db
        .select()
        .from(schema.prescriptions)
        .where(where)
        .orderBy(schema.prescriptions.createdAt)
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.prescriptions)
        .where(where),
    ]);

    return { data, total: count };
  },

  async listPrescriptionsByDoctor(
    doctorId: string,
    params?: PaginationParams & {
      from?: Date;
      to?: Date;
    }
  ) {
    const { limit, offset } = getPagination(params);

    let where = sql`${schema.prescriptions.doctorId} = ${doctorId}`;

    if (params?.from) {
      where = sql`${where} AND ${schema.prescriptions.createdAt} >= ${params.from}`;
    }

    if (params?.to) {
      where = sql`${where} AND ${schema.prescriptions.createdAt} <= ${params.to}`;
    }

    const [data, [{ count }]] = await Promise.all([
      db
        .select()
        .from(schema.prescriptions)
        .where(where)
        .orderBy(schema.prescriptions.createdAt)
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.prescriptions)
        .where(where),
    ]);

    return { data, total: count };
  },
};
