// server/policies/guards/isDoctor.ts

import type { AuthUser} from '../roles';
import { ROLES } from '../roles';

/**
 * Guard: checks if the current user is a doctor
 */
export function isDoctor(user: AuthUser | null | undefined): boolean {
  return user?.role === ROLES.DOCTOR;
}
