// server/policies/repositories.ts

import {
  DoctorIdentity,
  AppointmentIdentity,
  PrescriptionIdentity,
} from './types';

/**
 * RBAC-facing repositories
 * Implemented using Drizzle elsewhere
 */

export interface DoctorRepository {
  findByUserId(userId: string): Promise<DoctorIdentity | null>;
}

export interface AppointmentRepository {
  findById(id: string): Promise<AppointmentIdentity | null>;
  existsForDoctorAndPatient(
    doctorId: string,
    patientUserId: string
  ): Promise<boolean>;
}

export interface PrescriptionRepository {
  findById(id: string): Promise<PrescriptionIdentity | null>;
}
