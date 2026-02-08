// server/policies/guards/isDoctor.ts

import { AuthUser, ROLES } from '../roles';

/**
 * Guard: checks if the current user is a doctor
 */
export function isDoctor(user: AuthUser | null | undefined): boolean {
  return user?.role === ROLES.DOCTOR;
}
