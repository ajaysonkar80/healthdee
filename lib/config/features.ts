// lib/config/features.ts
// Change a value here and the behavior changes everywhere.
// Env var overrides: set in .env.local to toggle without code changes.

export const features = {
  /* Auth */
  // DISABLE_EMAIL_VERIFICATION=true in .env.local skips OTP during dev
  EMAIL_VERIFICATION_REQUIRED: process.env.DISABLE_EMAIL_VERIFICATION !== "true",
  ALLOW_DOCTOR_SELF_REGISTRATION: process.env.ALLOW_DOCTOR_SELF_REGISTRATION !== "false",
  ALLOW_PATIENT_SELF_REGISTRATION: process.env.ALLOW_PATIENT_SELF_REGISTRATION !== "false",
  // SKIP_DOCTOR_ONBOARDING=true skips the 3-step wizard
  DOCTOR_ONBOARDING_REQUIRED: process.env.SKIP_DOCTOR_ONBOARDING !== "true",

  /* Email — DISABLE_EMAILS=true logs all emails to console */
  SEND_EMAILS:                        process.env.DISABLE_EMAILS             !== "true",
  SEND_OTP_EMAIL:                     process.env.DISABLE_OTP_EMAIL          !== "true",
  SEND_PASSWORD_RESET_EMAIL:          process.env.DISABLE_PASSWORD_RESET_EMAIL !== "true",
  SEND_DOCTOR_APPROVAL_EMAIL:         process.env.DISABLE_DOCTOR_EMAILS      !== "true",
  SEND_APPOINTMENT_CONFIRMATION_EMAIL:process.env.DISABLE_APPT_EMAILS        !== "true",
  SEND_APPOINTMENT_REMINDER_EMAIL:    process.env.DISABLE_APPT_EMAILS        !== "true",
  SEND_APPOINTMENT_CANCELLATION_EMAIL:process.env.DISABLE_APPT_EMAILS        !== "true",

  /* Rate limiting — DISABLE_RATE_LIMIT=true for local dev */
  RATE_LIMIT_ENABLED: process.env.DISABLE_RATE_LIMIT !== "true",
  RATE_LIMIT_SIGNUP:  process.env.DISABLE_RATE_LIMIT !== "true",
  RATE_LIMIT_LOGIN:   process.env.DISABLE_RATE_LIMIT !== "true",
  RATE_LIMIT_OTP:     process.env.DISABLE_RATE_LIMIT !== "true",

  /* Platform */
  MAINTENANCE_MODE:             process.env.MAINTENANCE_MODE  === "true",
  NEW_PATIENT_BOOKINGS_ENABLED: process.env.DISABLE_BOOKINGS  !== "true",
  DOCTOR_AVAILABILITY_EDITABLE: process.env.LOCK_AVAILABILITY !== "true",
} as const;

export type FeatureFlags = typeof features;