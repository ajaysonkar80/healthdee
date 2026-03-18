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
    const user = await db.query.users.findFirst({
      where: sql`
        ${schema.users.id} = ${userId}
        AND ${schema.users.role} = 'patient'
      `,
    });

    if (!user) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Patient not found for user: ${userId}`
      );
    }

    return user;
  },

  /* -----------------------------
     Patient Profile
  ----------------------------- */

  async getPatientProfile(userId: string) {
    const profile = await db.query.patientProfiles.findFirst({
      where: eq(schema.patientProfiles.userId, userId),
    });
    return profile ?? null;
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
    return db.query.emergencyContacts.findMany({
      where: eq(schema.emergencyContacts.userId, userId),
      orderBy: (c, { desc }) => [desc(c.isPrimary)],
    });
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
    const prefs = await db.query.userPreferences.findFirst({
      where: eq(schema.userPreferences.userId, userId),
    });
    return prefs ?? null;
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
  ----------------------------- */

  async getFullPatientProfile(userId: string) {
    const [profile, contacts, preferences] = await Promise.all([
      this.getPatientProfile(userId),
      this.getEmergencyContacts(userId),
      this.getUserPreferences(userId),
    ]);
    return { profile, emergencyContacts: contacts, preferences };
  },

  /* -----------------------------
     List Patients (existing — kept for backward compat)
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

    const [data, [{ count }]] = await Promise.all([
      db
        .select({
          id: schema.users.id,
          status: schema.users.status,
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
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.users)
        .leftJoin(
          schema.authCredentials,
          eq(schema.authCredentials.userId, schema.users.id)
        )
        .where(where),
    ]);

    return { data, total: count };
  },

  /* -----------------------------
     Admin Patient Listing
     Joins patientProfiles + authCredentials so the
     admin table has fullName, email, phone, city, etc.
     Uses Drizzle column conditions (not raw SQL template
     strings) so search is safe and typed.
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
        like(schema.patientProfiles.fullName, `%${params.search}%`),
        like(schema.authCredentials.email, `%${params.search}%`),
        like(schema.patientProfiles.phone, `%${params.search}%`),
        like(schema.patientProfiles.city, `%${params.search}%`)
      );
      // or() only returns undefined when called with zero args,
      // which can't happen here — cast is safe and avoids the ! operator.
      if (searchCondition) conditions.push(searchCondition);
    }

    const whereClause = and(...conditions);

    const [data, [countRow]] = await Promise.all([
      db
        .select({
          // user
          id:              schema.users.id,
          userStatus:      schema.users.status,
          joinedAt:        schema.users.createdAt,
          // auth
          email:           schema.authCredentials.email,
          phone:           schema.authCredentials.whatsappPhone,
          // profile
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
        .offset(offset),

      db
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
        .where(whereClause),
    ]);

    return { data, total: Number(countRow?.count ?? 0) };
  },

  /* -----------------------------
     Patient stats — single round-trip CASE WHEN
     (avoids multiple Turso connections / ECONNRESET)
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
        userId: input.userId,
        abhaNumber: input.abhaNumber,
        abhaAddress: input.abhaAddress,
        verifiedAt: input.verifiedAt,
        createdAt: new Date(),
      })
      .returning();
    return profile;
  },

  async getAbhaProfileByUserId(userId: string) {
    const profile = await db.query.abhaProfiles.findFirst({
      where: sql`${schema.abhaProfiles.userId} = ${userId}`,
    });

    if (!profile) {
      throw new RepositoryError(
        "NOT_FOUND",
        `ABHA profile not found for user: ${userId}`
      );
    }
    return profile;
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
   Inferred row type — consumed by admin components
--------------------------------------------------- */
export type AdminPatientRow = Awaited<
  ReturnType<typeof patientRepo.listAdminPatients>
>["data"][number];

export type PatientStats = Awaited<
  ReturnType<typeof patientRepo.getPatientStats>
>;