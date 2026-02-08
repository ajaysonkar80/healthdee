// server/policies/permissions.ts

import { ROLES, Role, assertValidRole } from './roles';

/**
 * Actions supported by the system
 * (kept small on purpose)
 */
export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE: 'manage', // implies all actions
} as const;

export type Action = typeof ACTIONS[keyof typeof ACTIONS];

/**
 * Subjects (domain resources)
 */
export const SUBJECTS = {
  USER: 'User',
  PATIENT: 'Patient',
  DOCTOR: 'Doctor',
  APPOINTMENT: 'Appointment',
  PRESCRIPTION: 'Prescription',
} as const;

export type Subject = typeof SUBJECTS[keyof typeof SUBJECTS];

export interface Permission {
  action: Action;
  subject: Subject;
}

/**
 * High-level permission map (NO CONDITIONS HERE)
 * Field-level & relationship rules come later.
 */
export function getRolePermissions(role: Role): Permission[] {
  switch (role) {
    case ROLES.ADMIN:
      return [
        { action: ACTIONS.MANAGE, subject: SUBJECTS.USER },
        { action: ACTIONS.MANAGE, subject: SUBJECTS.DOCTOR },
        { action: ACTIONS.MANAGE, subject: SUBJECTS.APPOINTMENT },
        { action: ACTIONS.MANAGE, subject: SUBJECTS.PRESCRIPTION },
        { action: ACTIONS.READ, subject: SUBJECTS.PATIENT }, // ⚠️ PII restricted later
      ];

    case ROLES.DOCTOR:
      return [
        { action: ACTIONS.READ, subject: SUBJECTS.USER },
        { action: ACTIONS.UPDATE, subject: SUBJECTS.USER },

        { action: ACTIONS.READ, subject: SUBJECTS.PATIENT },

        { action: ACTIONS.CREATE, subject: SUBJECTS.APPOINTMENT },
        { action: ACTIONS.READ, subject: SUBJECTS.APPOINTMENT },
        { action: ACTIONS.UPDATE, subject: SUBJECTS.APPOINTMENT },

        { action: ACTIONS.CREATE, subject: SUBJECTS.PRESCRIPTION },
        { action: ACTIONS.READ, subject: SUBJECTS.PRESCRIPTION },
      ];

    case ROLES.PATIENT:
      return [
        { action: ACTIONS.READ, subject: SUBJECTS.USER },
        { action: ACTIONS.UPDATE, subject: SUBJECTS.USER },

        { action: ACTIONS.READ, subject: SUBJECTS.APPOINTMENT },
        { action: ACTIONS.READ, subject: SUBJECTS.PRESCRIPTION },
      ];

    default:
      assertValidRole(role);
  }
}
