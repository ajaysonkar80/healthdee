import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { z } from "zod";

/* -----------------------------------------------------
   Helpers
----------------------------------------------------- */

const uuid = () =>
  text("id")
    .primaryKey()
    .default(sql`(lower(hex(randomblob(16))))`);

/* -----------------------------------------------------
   ENUMS (SQLite-safe)
----------------------------------------------------- */

export const UserRoleSchema = z.enum(["patient", "doctor", "admin"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserStatusSchema = z.enum(["active", "deactivated", "deleted"]);
export type UserStatus = z.infer<typeof UserStatusSchema>;

export const OtpChannelSchema = z.enum(["whatsapp", "email"]);
export type OtpChannel = z.infer<typeof OtpChannelSchema>;

export const ConsentStatusSchema = z.enum([
  "granted",
  "withdrawn",
  "expired",
]);
export type ConsentStatus = z.infer<typeof ConsentStatusSchema>;

export const ErasureStatusSchema = z.enum([
  "requested",
  "in_progress",
  "completed",
  "rejected",
]);
export type ErasureStatus = z.infer<typeof ErasureStatusSchema>;

export const FhirSourceSchema = z.enum(["internal", "abdm_gateway"]);
export type FhirSource = z.infer<typeof FhirSourceSchema>;

export const DoctorVerificationSchema = z.enum([
  "pending",
  "verified",
  "rejected",
]);
export type DoctorVerificationStatus = z.infer<
  typeof DoctorVerificationSchema
>;

export const AppointmentStatusSchema = z.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
]);
export type AppointmentStatus = z.infer<
  typeof AppointmentStatusSchema
>;

export const doctorAvailability = sqliteTable("doctor_availability", {
  id: uuid(),
  doctorId: text("doctor_id")
    .references(() => doctors.id, { onDelete: "cascade" })
    .notNull(),

  dayOfWeek: integer("day_of_week").notNull(), // 0 = Sunday
  startTime: text("start_time").notNull(), // "09:00"
  endTime: text("end_time").notNull(), // "17:00"
  slotDurationMinutes: integer("slot_duration_minutes")
    .notNull()
    .default(30),

  isActive: integer("is_active", { mode: "boolean" })
    .notNull()
    .default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const ConsultationModeSchema = z.enum([
  "video",
  "audio",
  "chat",
]);
export type ConsultationMode = z.infer<
  typeof ConsultationModeSchema
>;

export const ConsultationLogTypeSchema = z.enum([
  "transcript",
  "chat_history",
  "call_metadata",
  "prescription",
  "consent_log",
  "clinical_summary",
]);
export type ConsultationLogType = z.infer<
  typeof ConsultationLogTypeSchema
>;

export const ScheduleClassSchema = z.enum([
  "OTC",
  "G",
  "H",
  "H1",
  "X",
  "SCHEDULE_K",
  "G_LIST",
]);
export type ScheduleClass = z.infer<
  typeof ScheduleClassSchema
>;

/* -----------------------------------------------------
   1) USERS & AUTH
----------------------------------------------------- */

export const users = sqliteTable("users", {
  id: uuid(),
  name: text("name").notNull(), // Add this for Patient names
  role: text("role").$type<UserRole>().notNull(),
  status: text("status").$type<UserStatus>().notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const authCredentials = sqliteTable(
  "auth_credentials",
  {
    id: uuid(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    email: text("email"),
    passwordHash: text("password_hash"),
    whatsappPhone: text("whatsapp_phone"),
    whatsappVerifiedAt: integer("whatsapp_verified_at", {
      mode: "timestamp",
    }),
    emailVerifiedAt: integer("email_verified_at", {
      mode: "timestamp",
    }),
    lastLoginAt: integer("last_login_at", {
      mode: "timestamp",
    }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => ({
    emailUnique: uniqueIndex("auth_email_unique").on(t.email),
    whatsappUnique: uniqueIndex("auth_whatsapp_unique").on(t.whatsappPhone),
  })
);

export const otpSessions = sqliteTable("otp_sessions", {
  id: uuid(),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  channel: text("channel").$type<OtpChannel>().notNull(),
  destination: text("destination").notNull(),
  otpHash: text("otp_hash").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  verifiedAt: integer("verified_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const refreshTokens = sqliteTable("refresh_tokens", {
  id: uuid(),

  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  tokenHash: text("token_hash").notNull(),

  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),

  createdAt: integer("created_at", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(unixepoch())`),
});


/* -----------------------------------------------------
   2) CONSENT & DPDP
----------------------------------------------------- */

export const consentNotices = sqliteTable("consent_notices", {
  id: uuid(),
  noticeKey: text("notice_key").notNull(),
  language: text("language").notNull(),
  content: text("content").notNull(),
  version: text("version").notNull(),
  effectiveFrom: integer("effective_from", { mode: "timestamp" }).notNull(),
});

export const consents = sqliteTable("consents", {
  id: uuid(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  noticeId: text("notice_id")
    .references(() => consentNotices.id)
    .notNull(),
  purpose: text("purpose").notNull(),
  consentStatus: text("consent_status")
    .$type<ConsentStatus>()
    .notNull(),
  grantedAt: integer("granted_at", { mode: "timestamp" }),
  withdrawnAt: integer("withdrawn_at", { mode: "timestamp" }),
  channel: text("channel").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const dataErasureRequests = sqliteTable("data_erasure_requests", {
  id: uuid(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  status: text("status").$type<ErasureStatus>().notNull(),
  reason: text("reason"),
  requestedAt: integer("requested_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

/* -----------------------------------------------------
   3) ABDM + FHIR
----------------------------------------------------- */

export const abhaProfiles = sqliteTable(
  "abha_profiles",
  {
    id: uuid(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    abhaNumber: text("abha_number").notNull(),
    abhaAddress: text("abha_address"),
    verifiedAt: integer("verified_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => ({
    abhaNumberUnique: uniqueIndex("abha_number_unique").on(t.abhaNumber),
    abhaUserUnique: uniqueIndex("abha_user_unique").on(t.userId),
  })
);

export const fhirResources = sqliteTable("fhir_resources", {
  id: uuid(),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  abhaProfileId: text("abha_profile_id").references(
    () => abhaProfiles.id,
    { onDelete: "cascade" }
  ),
  resourceType: text("resource_type").notNull(),
  resourceJson: text("resource_json", { mode: "json" }).notNull(),
  source: text("source").$type<FhirSource>().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/* -----------------------------------------------------
   4) DOCTORS
----------------------------------------------------- */

export const doctors = sqliteTable(
  "doctors",
  {
    id: uuid(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    publicId: text("public_id").notNull(),
    specialty: text("specialty").notNull(),
    experienceYears: integer("experience_years").default(0),
    rating: integer("rating").notNull().default(0),
    profileImageUrl: text("profile_image_url"),
    rmpRegistrationNumber: text("rmp_registration_number").notNull(),
    rmpStateMedicalCouncil: text("rmp_state_medical_council").notNull(),
    bio: text("bio"),
    consultationFee: integer("consultation_fee"),
    isActive: integer("is_active", { mode: "boolean" }).default(true),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
    verificationStatus: text("verification_status")
      .$type<DoctorVerificationStatus>()
      .notNull(),
    verifiedAt: integer("verified_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => ({
    publicIdUnique: uniqueIndex("doctor_public_id_unique").on(t.publicId),
  })
);

/* -----------------------------------------------------
   5) CLINICS
----------------------------------------------------- */

export const clinics = sqliteTable("clinics", {
  id: uuid(),
  name: text("name").notNull(),
  publicSlug: text("public_slug").notNull(),
  description: text("description"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state"),
  country: text("country").notNull().default("IN"),
  geoLat: text("geo_lat"),
  geoLng: text("geo_lng"),
  rating: integer("rating").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" })
    .notNull()
    .default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/* -----------------------------------------------------
   6) APPOINTMENTS & CONSULTATIONS
----------------------------------------------------- */

export const appointments = sqliteTable(
  "appointments",
  {
    id: uuid(),
    patientId: text("patient_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    doctorId: text("doctor_id")
      .references(() => doctors.id, { onDelete: "cascade" })
      .notNull(),
    scheduledAt: integer("scheduled_at", { mode: "timestamp" }).notNull(),
    status: text("status").$type<AppointmentStatus>().notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => ({
    doctorTimeUnique: uniqueIndex("doctor_time_unique").on(
      t.doctorId,
      t.scheduledAt
    ),
  })
);

export const consultations = sqliteTable("consultations", {
  id: uuid(),
  appointmentId: text("appointment_id")
    .references(() => appointments.id, { onDelete: "cascade" })
    .notNull(),
  mode: text("mode").$type<ConsultationMode>().notNull(),
  startedAt: integer("started_at", { mode: "timestamp" }),
  endedAt: integer("ended_at", { mode: "timestamp" }),
  summary: text("summary"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const consultationLogs = sqliteTable("consultation_logs", {
  id: uuid(),
  consultationId: text("consultation_id")
    .references(() => consultations.id, { onDelete: "cascade" })
    .notNull(),
  logType: text("log_type")
    .$type<ConsultationLogType>()
    .notNull(),
  content: text("content", { mode: "json" }).notNull(),
  storedAt: integer("stored_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/* -----------------------------------------------------
   7) PRESCRIPTIONS
----------------------------------------------------- */

export const prescriptions = sqliteTable("prescriptions", {
  id: uuid(),
  consultationId: text("consultation_id")
    .references(() => consultations.id, { onDelete: "cascade" })
    .notNull(),
  doctorId: text("doctor_id")
    .references(() => doctors.id, { onDelete: "cascade" })
    .notNull(),
  patientId: text("patient_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const prescriptionItems = sqliteTable("prescription_items", {
  id: uuid(),
  prescriptionId: text("prescription_id")
    .references(() => prescriptions.id, { onDelete: "cascade" })
    .notNull(),
  drugName: text("drug_name").notNull(),
  dosage: text("dosage").notNull(),
  frequency: text("frequency").notNull(),
  durationDays: integer("duration_days").notNull(),
  scheduleClass: text("schedule_class")
    .$type<ScheduleClass>()
    .notNull(),
});

/* -----------------------------------------------------
   8) AUDIT & COMPLIANCE
----------------------------------------------------- */

export const auditLogs = sqliteTable("audit_logs", {
  id: uuid(),
  actorUserId: text("actor_user_id").references(() => users.id),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: text("target_id").notNull(),
  metadata: text("metadata", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/* -----------------------------------------------------
   9) Rate Limiting
----------------------------------------------------- */
export const rateLimits = sqliteTable(
  "rate_limits",
  {
    key: text("key").primaryKey(),
    count: integer("count").notNull(),
    resetAt: integer("reset_at").notNull(),
  },
  (t) => ({
    resetAtIdx: index("rate_limits_reset_at_idx").on(t.resetAt),
  })
);