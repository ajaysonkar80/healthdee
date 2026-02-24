// server/repositories/doctor.repo.ts
import { db } from "@/db";
import * as schema from "@/db/schema";
import { and, eq, like, or, sql } from "drizzle-orm";
import { RepositoryError, PaginationParams } from "./user.repo";
import { doctorAvailability } from "@/db/schema";
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
   Doctor Repository
----------------------------------------------------- */

export const doctorRepo = {
  /* -----------------------------
     Create
  ----------------------------- */

  async createDoctor(input: {
  userId: string;
  publicId: string;
  specialty: string;
  experienceYears?: number;
  bio?: string;
  consultationFee?: number;
  profileImageUrl?: string;
  rmpRegistrationNumber: string;
  rmpStateMedicalCouncil: string;
  verificationStatus: schema.DoctorVerificationStatus;
}) {
  const now = new Date();

  const [doctor] = await db
    .insert(schema.doctors)
    .values({
      userId: input.userId,
      publicId: input.publicId,
      specialty: input.specialty,
      experienceYears: input.experienceYears ?? 0,
      bio: input.bio,
      consultationFee: input.consultationFee ?? 0,
      profileImageUrl: input.profileImageUrl,
      rmpRegistrationNumber: input.rmpRegistrationNumber,
      rmpStateMedicalCouncil: input.rmpStateMedicalCouncil,
      verificationStatus: input.verificationStatus,
      createdAt: now,
    })
    .returning();

  return doctor;
},


  /* -----------------------------
     Getters
  ----------------------------- */

  async getDoctorById(doctorId: string) {
    const doctor = await db.query.doctors.findFirst({
      where: eq(schema.doctors.id, doctorId),
    });

    if (!doctor) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Doctor not found: ${doctorId}`
      );
    }

    return doctor;
  },

  async getDoctorByPublicId(publicId: string) {
    const doctor = await db.query.doctors.findFirst({
      where: eq(schema.doctors.publicId, publicId),
    });

    if (!doctor) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Doctor not found with publicId: ${publicId}`
      );
    }

    return doctor;
  },

  async getDoctorByUserId(userId: string) {
    const doctor = await db.query.doctors.findFirst({
      where: eq(schema.doctors.userId, userId),
    });

    if (!doctor) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Doctor not found for user: ${userId}`
      );
    }

    return doctor;
  },

  /* -----------------------------
     Listing / Search
  ----------------------------- */

  async listDoctors(
    params?: PaginationParams & {
      search?: string;
      specialty?: string;
      verificationStatus?: schema.DoctorVerificationStatus;
      isUserActive?: boolean;
    }
  ) {
    const { limit, offset } = getPagination(params);

    const conditions = [];

    if (params?.specialty) {
      conditions.push(eq(schema.doctors.specialty, params.specialty));
    }

    if (params?.verificationStatus) {
      conditions.push(
        eq(schema.doctors.verificationStatus, params.verificationStatus)
      );
    }

    if (params?.isUserActive !== undefined) {
      conditions.push(
        eq(
          schema.users.status,
          params.isUserActive ? "active" : "deactivated"
        )
      );
    }

    if (params?.search) {
      conditions.push(
        or(
          like(schema.doctors.publicId, `%${params.search}%`),
          like(schema.doctors.specialty, `%${params.search}%`)
        )
      );
    }

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

    const [data, [{ count }]] = await Promise.all([
      db
        .select({
          id: schema.doctors.id,
          publicId: schema.doctors.publicId,
          specialty: schema.doctors.specialty,
          experienceYears: schema.doctors.experienceYears,
          bio: schema.doctors.bio,
          consultationFee: schema.doctors.consultationFee,
          rating: schema.doctors.rating,
          profileImageUrl: schema.doctors.profileImageUrl,
          verificationStatus: schema.doctors.verificationStatus,
          createdAt: schema.doctors.createdAt,
          userId: schema.users.id,
          userStatus: schema.users.status,
        })

        .from(schema.doctors)
        .innerJoin(
          schema.users,
          eq(schema.users.id, schema.doctors.userId)
        )
        .where(whereClause)
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.doctors)
        .innerJoin(
          schema.users,
          eq(schema.users.id, schema.doctors.userId)
        )
        .where(whereClause),
    ]);

    return { data, total: count };
  },

  /* -----------------------------
     Updates (Meaningful Only)
  ----------------------------- */

  async updateDoctorProfile(
  doctorId: string,
  input: {
    specialty?: string;
    experienceYears?: number;
    bio?: string;
    consultationFee?: number;
    profileImageUrl?: string | null;
  }
) {
  const updateData: Partial<typeof schema.doctors.$inferInsert> = {};

  if (input.specialty !== undefined) {
    updateData.specialty = input.specialty;
  }

  if (input.experienceYears !== undefined) {
    updateData.experienceYears = input.experienceYears;
  }

  if (input.bio !== undefined) {
    updateData.bio = input.bio;
  }

  if (input.consultationFee !== undefined) {
    updateData.consultationFee = input.consultationFee;
  }

  if (input.profileImageUrl !== undefined) {
    updateData.profileImageUrl = input.profileImageUrl;
  }

  const result = await db
    .update(schema.doctors)
    .set(updateData)
    .where(eq(schema.doctors.id, doctorId))
    .returning();

  if (result.length === 0) {
    throw new RepositoryError(
      "NOT_FOUND",
      `Doctor not found: ${doctorId}`
    );
  }

  return result[0];
},

  async updateVerificationStatus(
    doctorId: string,
    status: schema.DoctorVerificationStatus
  ) {
    const now = new Date();

    const result = await db
      .update(schema.doctors)
      .set({
        verificationStatus: status,
        verifiedAt: status === "verified" ? now : null,
      })
      .where(eq(schema.doctors.id, doctorId))
      .returning();

    if (result.length === 0) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Doctor not found: ${doctorId}`
      );
    }

    return result[0];
  },/* --------------------------------------------------
     Get availability for specific doctor + weekday
  --------------------------------------------------- */
  async getByDoctorAndDay(doctorId: string, dayOfWeek: number) {
    const result = await db
      .select()
      .from(doctorAvailability)
      .where(
        and(
          eq(doctorAvailability.doctorId, doctorId),
          eq(doctorAvailability.dayOfWeek, dayOfWeek)
        )
      )
      .limit(1);

    return result[0] ?? null;
  },

  /* --------------------------------------------------
     Get all availability rows for doctor
  --------------------------------------------------- */
  async getAllByDoctor(doctorId: string) {
    return db
      .select()
      .from(doctorAvailability)
      .where(eq(doctorAvailability.doctorId, doctorId));
  },

  /* --------------------------------------------------
     Upsert availability (Single block per weekday)
     If exists → update
     If not → insert
  --------------------------------------------------- */
  async upsertAvailability(input: {
    doctorId: string;
    dayOfWeek: number;
    startTime: string; // "09:00"
    endTime: string;   // "17:00"
    slotDurationMinutes?: number;
    isActive?: boolean;
  }) {
    const existing = await this.getByDoctorAndDay(
      input.doctorId,
      input.dayOfWeek
    );

    if (existing) {
      await db
        .update(doctorAvailability)
        .set({
          startTime: input.startTime,
          endTime: input.endTime,
          slotDurationMinutes:
            input.slotDurationMinutes ?? 30,
          isActive: input.isActive ?? true,
        })
        .where(eq(doctorAvailability.id, existing.id));

      return this.getByDoctorAndDay(
        input.doctorId,
        input.dayOfWeek
      );
    }

    await db.insert(doctorAvailability).values({
      doctorId: input.doctorId,
      dayOfWeek: input.dayOfWeek,
      startTime: input.startTime,
      endTime: input.endTime,
      slotDurationMinutes:
        input.slotDurationMinutes ?? 30,
      isActive: input.isActive ?? true,
    });

    return this.getByDoctorAndDay(
      input.doctorId,
      input.dayOfWeek
    );
  },

  /* --------------------------------------------------
     Disable availability for a specific weekday
  --------------------------------------------------- */
  async disableDay(doctorId: string, dayOfWeek: number) {
    await db
      .update(doctorAvailability)
      .set({ isActive: false })
      .where(
        and(
          eq(doctorAvailability.doctorId, doctorId),
          eq(doctorAvailability.dayOfWeek, dayOfWeek)
        )
      );

    return { success: true };
  },

  /* --------------------------------------------------
     Delete availability (rare use)
  --------------------------------------------------- */
  async deleteByDoctorAndDay(
    doctorId: string,
    dayOfWeek: number
  ) {
    await db
      .delete(doctorAvailability)
      .where(
        and(
          eq(doctorAvailability.doctorId, doctorId),
          eq(doctorAvailability.dayOfWeek, dayOfWeek)
        )
      );

    return { success: true };
  },


};
