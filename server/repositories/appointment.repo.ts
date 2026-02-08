// server/repositories/appointment.repo.ts
import { db } from "@/db";
import * as schema from "@/db/schema";
import { sql } from "drizzle-orm";
import { RepositoryError, PaginationParams } from "./user.repo";

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
   Appointment Repository
----------------------------------------------------- */

export const appointmentRepo = {
  /* -----------------------------
     Appointments
  ----------------------------- */

  async createAppointment(input: {
    patientId: string;
    doctorId: string;
    scheduledAt: Date;
    status: schema.AppointmentStatus;
  }) {
    const now = new Date();

    const [appointment] = await db
      .insert(schema.appointments)
      .values({
        patientId: input.patientId,
        doctorId: input.doctorId,
        scheduledAt: input.scheduledAt,
        status: input.status,
        createdAt: now,
      })
      .returning();

    return appointment;
  },

  async getAppointmentById(appointmentId: string) {
    const appointment = await db.query.appointments.findFirst({
      where: sql`${schema.appointments.id} = ${appointmentId}`,
    });

    if (!appointment) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Appointment not found: ${appointmentId}`
      );
    }

    return appointment;
  },

  async listAppointmentsByPatient(
    patientId: string,
    params?: PaginationParams & {
      status?: schema.AppointmentStatus;
      from?: Date;
      to?: Date;
    }
  ) {
    const { limit, offset } = getPagination(params);

    let where = sql`${schema.appointments.patientId} = ${patientId}`;

    if (params?.status) {
      where = sql`${where} AND ${schema.appointments.status} = ${params.status}`;
    }

    if (params?.from) {
      where = sql`${where} AND ${schema.appointments.scheduledAt} >= ${params.from}`;
    }

    if (params?.to) {
      where = sql`${where} AND ${schema.appointments.scheduledAt} <= ${params.to}`;
    }

    const [data, [{ count }]] = await Promise.all([
      db
        .select()
        .from(schema.appointments)
        .where(where)
        .orderBy(schema.appointments.scheduledAt)
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.appointments)
        .where(where),
    ]);

    return { data, total: count };
  },

  async listAppointmentsByDoctor(
    doctorId: string,
    params?: PaginationParams & {
      status?: schema.AppointmentStatus;
      from?: Date;
      to?: Date;
    }
  ) {
    const { limit, offset } = getPagination(params);

    let where = sql`${schema.appointments.doctorId} = ${doctorId}`;

    if (params?.status) {
      where = sql`${where} AND ${schema.appointments.status} = ${params.status}`;
    }

    if (params?.from) {
      where = sql`${where} AND ${schema.appointments.scheduledAt} >= ${params.from}`;
    }

    if (params?.to) {
      where = sql`${where} AND ${schema.appointments.scheduledAt} <= ${params.to}`;
    }

    const [data, [{ count }]] = await Promise.all([
      db
        .select()
        .from(schema.appointments)
        .where(where)
        .orderBy(schema.appointments.scheduledAt)
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.appointments)
        .where(where),
    ]);

    return { data, total: count };
  },

  async updateAppointmentStatus(
    appointmentId: string,
    status: schema.AppointmentStatus
  ) {
    const result = await db
      .update(schema.appointments)
      .set({ status })
      .where(sql`${schema.appointments.id} = ${appointmentId}`)
      .returning();

    if (result.length === 0) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Appointment not found: ${appointmentId}`
      );
    }

    return result[0];
  },

  /* -----------------------------
     Consultations
  ----------------------------- */

  async createConsultation(input: {
    appointmentId: string;
    mode: schema.ConsultationMode;
    startedAt?: Date;
  }) {
    const now = new Date();

    const [consultation] = await db
      .insert(schema.consultations)
      .values({
        appointmentId: input.appointmentId,
        mode: input.mode,
        startedAt: input.startedAt,
        createdAt: now,
      })
      .returning();

    return consultation;
  },

  async getConsultationByAppointment(appointmentId: string) {
    const consultation = await db.query.consultations.findFirst({
      where: sql`${schema.consultations.appointmentId} = ${appointmentId}`,
    });

    if (!consultation) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Consultation not found for appointment: ${appointmentId}`
      );
    }

    return consultation;
  },

  async endConsultation(
    consultationId: string,
    input: {
      endedAt: Date;
      summary?: string;
    }
  ) {
    const result = await db
      .update(schema.consultations)
      .set({
        endedAt: input.endedAt,
        summary: input.summary,
      })
      .where(sql`${schema.consultations.id} = ${consultationId}`)
      .returning();

    if (result.length === 0) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Consultation not found: ${consultationId}`
      );
    }

    return result[0];
  },

  /* -----------------------------
     Consultation Logs
  ----------------------------- */

  async addConsultationLog(input: {
    consultationId: string;
    logType: schema.ConsultationLogType;
    content: unknown;
  }) {
    const now = new Date();

    const [log] = await db
      .insert(schema.consultationLogs)
      .values({
        consultationId: input.consultationId,
        logType: input.logType,
        content: input.content,
        storedAt: now,
      })
      .returning();

    return log;
  },

  async listConsultationLogs(
    consultationId: string,
    params?: PaginationParams & {
      logType?: schema.ConsultationLogType;
    }
  ) {
    const { limit, offset } = getPagination(params);

    let where = sql`${schema.consultationLogs.consultationId} = ${consultationId}`;

    if (params?.logType) {
      where = sql`${where} AND ${schema.consultationLogs.logType} = ${params.logType}`;
    }

    const [data, [{ count }]] = await Promise.all([
      db
        .select()
        .from(schema.consultationLogs)
        .where(where)
        .orderBy(schema.consultationLogs.storedAt)
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.consultationLogs)
        .where(where),
    ]);

    return { data, total: count };
  },
};
