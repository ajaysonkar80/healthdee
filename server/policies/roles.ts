// server/policies/roles.ts

export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  PATIENT: 'patient',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export interface AuthUser {
  id: string;
  role: Role;
}

/**
 * Role guards (pure helpers)
 */
export function isAdmin(user: AuthUser | null | undefined): boolean {
  return user?.role === ROLES.ADMIN;
}

export function isDoctor(user: AuthUser | null | undefined): boolean {
  return user?.role === ROLES.DOCTOR;
}

export function isPatient(user: AuthUser | null | undefined): boolean {
  return user?.role === ROLES.PATIENT;
}

/**
 * Assertion helper for exhaustive checks
 */
export function assertValidRole(role: never): never {
  throw new Error(`Unhandled role: ${role}`);
}
