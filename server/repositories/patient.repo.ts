// server/repositories/patient.repo.ts
import { db } from "@/db";
import * as schema from "@/db/schema";
import {
  eq,
  sql,
  isNotNull,
} from "drizzle-orm";
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
    .set({
      ...input,
      updatedAt: new Date(),
    })
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
    .values({
      ...input,
      createdAt: new Date(),
    })
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
    .set({
      ...input,
      updatedAt: new Date(),
    })
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
    .values({
      userId,
      createdAt: new Date(),
    })
    .returning();

  return prefs;
},

async createPatientProfile(userId: string) {
  const [profile] = await db
    .insert(schema.patientProfiles)
    .values({
      userId,
      createdAt: new Date(),
    })
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

  return {
    profile,
    emergencyContacts: contacts,
    preferences,
  };
},
  /* -----------------------------
     List Patients (FINAL FIX)
  ----------------------------- */

  async listPatients(
    params?: PaginationParams & {
      search?: string;
      status?: schema.UserStatus;
    }
  ) {
    const { limit, offset } = getPagination(params);

    // ✅ Base WHERE clause — ALWAYS SQL
    let where = sql`${schema.users.role} = 'patient'`;

    if (params?.status) {
      where = sql`
        ${where}
        AND ${schema.users.status} = ${params.status}
      `;
    }

    if (params?.search) {
      const search = `%${params.search}%`;

      where = sql`
        ${where}
        AND (
          (
            ${isNotNull(schema.authCredentials.email)}
            AND ${schema.authCredentials.email} LIKE ${search}
          )
          OR
          (
            ${isNotNull(schema.authCredentials.whatsappPhone)}
            AND ${schema.authCredentials.whatsappPhone} LIKE ${search}
          )
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
        .where(where) // ✅ ALWAYS SQL
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
     ABHA Profile
  ----------------------------- */

  async createAbhaProfile(input: {
    userId: string;
    abhaNumber: string;
    abhaAddress?: string;
    verifiedAt?: Date;
  }) {
    const now = new Date();

    const [profile] = await db
      .insert(schema.abhaProfiles)
      .values({
        userId: input.userId,
        abhaNumber: input.abhaNumber,
        abhaAddress: input.abhaAddress,
        verifiedAt: input.verifiedAt,
        createdAt: now,
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
      .set({
        abhaAddress: input.abhaAddress,
      })
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
