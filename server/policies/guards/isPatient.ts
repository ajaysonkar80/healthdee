// server/policies/guards/isPatient.ts

import type { AuthUser} from '../roles';
import { ROLES } from '../roles';

/**
 * Guard: checks if the current user is a patient
 */
export function isPatient(user: AuthUser | null | undefined): boolean {
  return user?.role === ROLES.PATIENT;
}
