// server/repositories/patient.repo.ts
import { db } from "@/db";
import * as schema from "@/db/schema";
import {
  eq,
  sql,
  isNotNull,
  like,
  and,
  or,
  desc,
} from "drizzle-orm";
import type { PaginationParams } from "./user.repo";
import { RepositoryError } from "./user.repo";

/* -----------------------------------------------------
   Helpers
----------------------------------------------------- */

const DEFAULT_LIMIT = 10;

function getPagination(params?: PaginationParams) {
  return {
    limit: params?.limit ?? DEFAULT_LIMIT,
    offset: params?.offset ?? 0,
  };
}

/* -----------------------------------------------------
   Patient Repository
----------------------------------------------------- */

export const patientRepo = {
  /* -----------------------------
     Patient (User-level)
  ----------------------------- */

  async getPatientByUserId(userId: string) {
    // FIX: was db.query.users.findFirst → ECONNRESET on Turso
    const result = await db
      .select()
      .from(schema.users)
      .where(
        and(
          eq(schema.users.id, userId),
          eq(schema.users.role, "patient")
        )
      )
      .limit(1);

    if (!result[0]) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Patient not found for user: ${userId}`
      );
    }

    return result[0];
  },

  /* -----------------------------
     Patient Profile
  ----------------------------- */

  async getPatientProfile(userId: string) {
    // FIX: was db.query.patientProfiles.findFirst → ECONNRESET on Turso
    const result = await db
      .select()
      .from(schema.patientProfiles)
      .where(eq(schema.patientProfiles.userId, userId))
      .limit(1);

    return result[0] ?? null;
  },

  async updatePatientProfile(
    userId: string,
    input: Partial<{
      fullName: string;
      gender: string;
      bloodGroup: string;
      dateOfBirth: Date;
      phone: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      heightCm: number;
      weightKg: number;
      allergies: string;
      chronicConditions: string;
      profileImageUrl: string;
    }>
  ) {
    const [profile] = await db
      .update(schema.patientProfiles)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(schema.patientProfiles.userId, userId))
      .returning();

    if (!profile) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Patient profile not found for user: ${userId}`
      );
    }

    return profile;
  },

  /* -----------------------------
     Emergency Contacts
  ----------------------------- */

  async getEmergencyContacts(userId: string) {
    // FIX: was db.query.emergencyContacts.findMany → ECONNRESET on Turso
    return db
      .select()
      .from(schema.emergencyContacts)
      .where(eq(schema.emergencyContacts.userId, userId))
      .orderBy(desc(schema.emergencyContacts.isPrimary));
  },

  async createEmergencyContact(input: {
    userId: string;
    name: string;
    relationship?: string;
    phone: string;
    email?: string;
    isPrimary?: boolean;
    notes?: string;
  }) {
    const [contact] = await db
      .insert(schema.emergencyContacts)
      .values({ ...input, createdAt: new Date() })
      .returning();
    return contact;
  },

  async deleteEmergencyContact(contactId: string) {
    const [contact] = await db
      .delete(schema.emergencyContacts)
      .where(eq(schema.emergencyContacts.id, contactId))
      .returning();

    if (!contact) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Emergency contact not found: ${contactId}`
      );
    }
    return contact;
  },

  /* -----------------------------
     User Preferences
  ----------------------------- */

  async getUserPreferences(userId: string) {
    // FIX: was db.query.userPreferences.findFirst → ECONNRESET on Turso
    const result = await db
      .select()
      .from(schema.userPreferences)
      .where(eq(schema.userPreferences.userId, userId))
      .limit(1);

    return result[0] ?? null;
  },

  async updateUserPreferences(
    userId: string,
    input: Partial<{
      whatsappAlerts: boolean;
      smsNotifications: boolean;
      emailNotifications: boolean;
      appointmentReminders: boolean;
      shareMedicalRecordsWithDoctors: boolean;
      allowResearchUse: boolean;
      allowDataDownload: boolean;
    }>
  ) {
    const [prefs] = await db
      .update(schema.userPreferences)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(schema.userPreferences.userId, userId))
      .returning();

    if (!prefs) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Preferences not found for user: ${userId}`
      );
    }
    return prefs;
  },

  async createUserPreferences(userId: string) {
    const [prefs] = await db
      .insert(schema.userPreferences)
      .values({ userId, createdAt: new Date() })
      .returning();
    return prefs;
  },

  async createPatientProfile(userId: string) {
    const [profile] = await db
      .insert(schema.patientProfiles)
      .values({ userId, createdAt: new Date() })
      .returning();
    return profile;
  },

  /* -----------------------------
     Full Patient Dashboard Profile
     FIX: was Promise.all → 3 parallel Turso connections
     → sequential awaits to avoid ECONNRESET
  ----------------------------- */

  async getFullPatientProfile(userId: string) {
    const profile     = await this.getPatientProfile(userId);
    const contacts    = await this.getEmergencyContacts(userId);
    const preferences = await this.getUserPreferences(userId);

    return { profile, emergencyContacts: contacts, preferences };
  },

  /* -----------------------------
     List Patients (backward compat)
  ----------------------------- */

  async listPatients(
    params?: PaginationParams & {
      search?: string;
      status?: schema.UserStatus;
    }
  ) {
    const { limit, offset } = getPagination(params);

    let where = sql`${schema.users.role} = 'patient'`;

    if (params?.status) {
      where = sql`${where} AND ${schema.users.status} = ${params.status}`;
    }

    if (params?.search) {
      const search = `%${params.search}%`;
      where = sql`
        ${where}
        AND (
          (${isNotNull(schema.authCredentials.email)}
            AND ${schema.authCredentials.email} LIKE ${search})
          OR
          (${isNotNull(schema.authCredentials.whatsappPhone)}
            AND ${schema.authCredentials.whatsappPhone} LIKE ${search})
        )
      `;
    }

    const data = await db
      .select({
        id:        schema.users.id,
        status:    schema.users.status,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
      })
      .from(schema.users)
      .leftJoin(
        schema.authCredentials,
        eq(schema.authCredentials.userId, schema.users.id)
      )
      .where(where)
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.users)
      .leftJoin(
        schema.authCredentials,
        eq(schema.authCredentials.userId, schema.users.id)
      )
      .where(where);

    return { data, total: count };
  },

  /* -----------------------------
     Admin Patient Listing
  ----------------------------- */

  async listAdminPatients(
    params?: PaginationParams & {
      search?: string;
      status?: schema.UserStatus;
    }
  ) {
    const { limit, offset } = getPagination(params);

    const conditions = [eq(schema.users.role, "patient")];

    if (params?.status) {
      conditions.push(eq(schema.users.status, params.status));
    }

    if (params?.search) {
      const searchCondition = or(
        like(schema.patientProfiles.fullName,  `%${params.search}%`),
        like(schema.authCredentials.email,     `%${params.search}%`),
        like(schema.patientProfiles.phone,     `%${params.search}%`),
        like(schema.patientProfiles.city,      `%${params.search}%`)
      );
      if (searchCondition) conditions.push(searchCondition);
    }

    const whereClause = and(...conditions);

    const data = await db
      .select({
        id:              schema.users.id,
        userStatus:      schema.users.status,
        joinedAt:        schema.users.createdAt,
        email:           schema.authCredentials.email,
        phone:           schema.authCredentials.whatsappPhone,
        fullName:        schema.patientProfiles.fullName,
        profileImageUrl: schema.patientProfiles.profileImageUrl,
        gender:          schema.patientProfiles.gender,
        bloodGroup:      schema.patientProfiles.bloodGroup,
        city:            schema.patientProfiles.city,
        state:           schema.patientProfiles.state,
        abhaLinked:      schema.patientProfiles.abhaLinked,
      })
      .from(schema.users)
      .leftJoin(
        schema.authCredentials,
        eq(schema.authCredentials.userId, schema.users.id)
      )
      .leftJoin(
        schema.patientProfiles,
        eq(schema.patientProfiles.userId, schema.users.id)
      )
      .where(whereClause)
      .orderBy(sql`${schema.users.createdAt} DESC`)
      .limit(limit)
      .offset(offset);

    const [countRow] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.users)
      .leftJoin(
        schema.authCredentials,
        eq(schema.authCredentials.userId, schema.users.id)
      )
      .leftJoin(
        schema.patientProfiles,
        eq(schema.patientProfiles.userId, schema.users.id)
      )
      .where(whereClause);

    return { data, total: Number(countRow?.count ?? 0) };
  },

  /* -----------------------------
     Patient stats — single round-trip CASE WHEN
  ----------------------------- */

  async getPatientStats() {
    const [row] = await db
      .select({
        total:       sql<number>`count(*)`,
        active:      sql<number>`sum(case when ${schema.users.status} = 'active'      then 1 else 0 end)`,
        deactivated: sql<number>`sum(case when ${schema.users.status} = 'deactivated' then 1 else 0 end)`,
        abhaLinked:  sql<number>`sum(case when ${schema.patientProfiles.abhaLinked} = 1 then 1 else 0 end)`,
      })
      .from(schema.users)
      .leftJoin(
        schema.patientProfiles,
        eq(schema.patientProfiles.userId, schema.users.id)
      )
      .where(eq(schema.users.role, "patient"));

    return {
      total:       Number(row?.total       ?? 0),
      active:      Number(row?.active      ?? 0),
      deactivated: Number(row?.deactivated ?? 0),
      abhaLinked:  Number(row?.abhaLinked  ?? 0),
    };
  },

  /* -----------------------------
     ABHA Profile
  ----------------------------- */

  async createAbhaProfile(input: {
    userId: string;
    abhaNumber: string;
    abhaAddress?: string;
    verifiedAt?: Date;
  }) {
    const [profile] = await db
      .insert(schema.abhaProfiles)
      .values({
        userId:       input.userId,
        abhaNumber:   input.abhaNumber,
        abhaAddress:  input.abhaAddress,
        verifiedAt:   input.verifiedAt,
        createdAt:    new Date(),
      })
      .returning();
    return profile;
  },

  async getAbhaProfileByUserId(userId: string) {
    // FIX: was db.query.abhaProfiles.findFirst → ECONNRESET on Turso
    const result = await db
      .select()
      .from(schema.abhaProfiles)
      .where(eq(schema.abhaProfiles.userId, userId))
      .limit(1);

    if (!result[0]) {
      throw new RepositoryError(
        "NOT_FOUND",
        `ABHA profile not found for user: ${userId}`
      );
    }
    return result[0];
  },

  async updateAbhaProfileByUserId(input: {
    userId: string;
    abhaAddress?: string;
  }) {
    const [profile] = await db
      .update(schema.abhaProfiles)
      .set({ abhaAddress: input.abhaAddress })
      .where(eq(schema.abhaProfiles.userId, input.userId))
      .returning();

    if (!profile) {
      throw new RepositoryError(
        "NOT_FOUND",
        `ABHA profile not found for user: ${input.userId}`
      );
    }
    return profile;
  },
};

/* --------------------------------------------------
   Inferred row types
--------------------------------------------------- */
export type AdminPatientRow = Awaited<
  ReturnType<typeof patientRepo.listAdminPatients>
>["data"][number];

export type PatientStats = Awaited<
  ReturnType<typeof patientRepo.getPatientStats>
>;