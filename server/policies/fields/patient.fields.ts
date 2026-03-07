// server/policies/fields/patient.fields.ts

import type { AuthUser } from '../roles';
import { isAdmin } from '../guards/isAdmin';

/**
 * 🚨 Explicit list of Patient PII fields
 * Anything listed here is NEVER visible to admins.
 */
export const PATIENT_PII_FIELDS = [
  'abhaNumber',
  'abhaAddress',
  'dateOfBirth',
  'phone',
  'email',
  'address',
  'emergencyContact',
  'insuranceNumber',
] as const;

type PatientPIIField = (typeof PATIENT_PII_FIELDS)[number];

/**
 * Removes PII fields from a patient object.
 * Does NOT mutate the input.
 */
function stripPatientPII<T extends Record<string, unknown>>(
  patient: T
): Omit<T, PatientPIIField> {
  const sanitized = { ...patient };

  for (const field of PATIENT_PII_FIELDS) {
    if (field in sanitized) {
      delete sanitized[field];
    }
  }

  return sanitized;
}

/**
 * Field-level enforcement for Patient entities.
 *
 * RULES:
 * - Admin   → non-PII only
 * - Patient → full access to self
 * - Doctor  → full access (relationship already validated elsewhere)
 *
 * ⚠️ This must be called AFTER canAccessPatient()
 */
export function filterPatientFields<
  T extends Record<string, unknown> & { id: string }
>(
  user: AuthUser,
  patient: T
): T | Omit<T, PatientPIIField> {
  // Admin: always strip PII
  if (isAdmin(user)) {
    return stripPatientPII(patient);
  }

  // Patient can see their own record
  if (user.role === 'patient' && user.id === patient.id) {
    return patient;
  }

  // Doctor access is already validated by canAccessPatient
  if (user.role === 'doctor') {
    return patient;
  }

  // Failsafe: never leak PII
  return stripPatientPII(patient);
}
