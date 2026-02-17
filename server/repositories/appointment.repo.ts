// server/repositories/appointment.repo.ts

import { db } from "@/db";
import * as schema from "@/db/schema";
import {
  eq,
  and,
  gte,
  lte,
} from "drizzle-orm";
import { RepositoryError, PaginationParams } from "./user.repo";
import { alias } from "drizzle-orm/sqlite-core";

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
      where: eq(schema.appointments.id, appointmentId),
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

    const conditions = [eq(schema.appointments.patientId, patientId)];

    if (params?.status) {
      conditions.push(
        eq(schema.appointments.status, params.status)
      );
    }

    if (params?.from) {
      conditions.push(
        gte(schema.appointments.scheduledAt, params.from)
      );
    }

    if (params?.to) {
      conditions.push(
        lte(schema.appointments.scheduledAt, params.to)
      );
    }

    const whereClause =
      conditions.length > 1
        ? and(...conditions)
        : conditions[0];

    const [data, total] = await Promise.all([
      db
        .select()
        .from(schema.appointments)
        .where(whereClause)
        .orderBy(schema.appointments.scheduledAt)
        .limit(limit)
        .offset(offset),

      db.$count(schema.appointments, whereClause),
    ]);

    return { data, total };
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

    const conditions = [eq(schema.appointments.doctorId, doctorId)];

    if (params?.status) {
      conditions.push(
        eq(schema.appointments.status, params.status)
      );
    }

    if (params?.from) {
      conditions.push(
        gte(schema.appointments.scheduledAt, params.from)
      );
    }

    if (params?.to) {
      conditions.push(
        lte(schema.appointments.scheduledAt, params.to)
      );
    }

    const whereClause =
      conditions.length > 1
        ? and(...conditions)
        : conditions[0];

    const [data, total] = await Promise.all([
      db
        .select()
        .from(schema.appointments)
        .where(whereClause)
        .orderBy(schema.appointments.scheduledAt)
        .limit(limit)
        .offset(offset),

      db.$count(schema.appointments, whereClause),
    ]);

    return { data, total };
  },

  /* -----------------------------
     List All Appointments (Admin)
  ----------------------------- */

  async listAllAppointments(
    params?: PaginationParams & {
      status?: schema.AppointmentStatus;
      from?: Date;
      to?: Date;
    }
  ) {
    const { limit, offset } = getPagination(params);

    // Create aliases so we can join the 'users' table twice in the same query
    const patientUser = alias(schema.users, "patientUser");
    const doctorUser = alias(schema.users, "doctorUser");

    const conditions = [];
    if (params?.status) conditions.push(eq(schema.appointments.status, params.status));
    if (params?.from) conditions.push(gte(schema.appointments.scheduledAt, params.from));
    if (params?.to) conditions.push(lte(schema.appointments.scheduledAt, params.to));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, total] = await Promise.all([
      db
        .select({
          id: schema.appointments.id,
          scheduledAt: schema.appointments.scheduledAt,
          status: schema.appointments.status,

          // Pulling names from the aliased users tables
          patientName: patientUser.name,
      
          doctorName: doctorUser.name,
        })
        .from(schema.appointments)
        // 1. Join for Patient details
        .innerJoin(patientUser, eq(patientUser.id, schema.appointments.patientId))
        // 2. Join for Patient email (via authCredentials)
        
        // 3. Join for Doctor details
        // Note: We join Appointments -> Doctors -> Users
        .innerJoin(schema.doctors, eq(schema.doctors.id, schema.appointments.doctorId))
        .innerJoin(doctorUser, eq(doctorUser.id, schema.doctors.userId))
        
        .where(whereClause)
        .orderBy(schema.appointments.scheduledAt)
        .limit(limit)
        .offset(offset),

      db.$count(schema.appointments, whereClause),
    ]);

    return { data, total };
  },

  async updateAppointmentStatus(
    appointmentId: string,
    status: schema.AppointmentStatus
  ) {
    const result = await db
      .update(schema.appointments)
      .set({ status })
      .where(eq(schema.appointments.id, appointmentId))
      .returning();

    if (result.length === 0) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Appointment not found: ${appointmentId}`
      );
    }

    return result[0];
  },

  async existsForDoctorAndPatient(
    doctorId: string,
    patientUserId: string
  ): Promise<boolean> {
    const result = await db
      .select()
      .from(schema.appointments)
      .where(
        and(
          eq(schema.appointments.doctorId, doctorId),
          eq(schema.appointments.patientId, patientUserId)
        )
      )
      .limit(1);

    return result.length > 0;
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
    const consultation =
      await db.query.consultations.findFirst({
        where: eq(
          schema.consultations.appointmentId,
          appointmentId
        ),
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
      .where(eq(schema.consultations.id, consultationId))
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

    const conditions = [
      eq(
        schema.consultationLogs.consultationId,
        consultationId
      ),
    ];

    if (params?.logType) {
      conditions.push(
        eq(
          schema.consultationLogs.logType,
          params.logType
        )
      );
    }

    const whereClause =
      conditions.length > 1
        ? and(...conditions)
        : conditions[0];

    const [data, total] = await Promise.all([
      db
        .select()
        .from(schema.consultationLogs)
        .where(whereClause)
        .orderBy(schema.consultationLogs.storedAt)
        .limit(limit)
        .offset(offset),

      db.$count(schema.consultationLogs, whereClause),
    ]);

    return { data, total };
  },
};
