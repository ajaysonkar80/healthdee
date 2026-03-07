// server/policies/guards/isAdmin.ts

import type { AuthUser} from '../roles';
import { ROLES } from '../roles';

/**
 * Guard: checks if the current user is an admin
 */
export function isAdmin(user: AuthUser | null | undefined): boolean {
  return user?.role === ROLES.ADMIN;
}
