// server/policies/ability.ts

import { ACTIONS, Action, Subject, getRolePermissions } from './permissions'
import { AuthUser } from './roles';

export class Ability {
  private readonly permissions;

  constructor(user: AuthUser) {
    this.permissions = getRolePermissions(user.role);
  }

  /**
   * Core permission check
   */
  can(action: Action, subject: Subject): boolean {
    return this.permissions.some((permission) => {
      if (permission.subject !== subject) return false;

      // MANAGE implies all actions
      if (permission.action === ACTIONS.MANAGE) return true;

      return permission.action === action;
    });
  }

  /**
   * Convenience helpers
   */
  canRead(subject: Subject): boolean {
    return this.can(ACTIONS.READ, subject);
  }

  canCreate(subject: Subject): boolean {
    return this.can(ACTIONS.CREATE, subject);
  }

  canUpdate(subject: Subject): boolean {
    return this.can(ACTIONS.UPDATE, subject);
  }

  canDelete(subject: Subject): boolean {
    return this.can(ACTIONS.DELETE, subject);
  }
}

/**
 * Factory function (preferred usage)
 */
export function defineAbilityFor(user: AuthUser): Ability {
  return new Ability(user);
}
