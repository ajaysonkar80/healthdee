// server/policies/types.ts

/**
 * Minimal domain views required by RBAC
 * These are INTENTIONAL subsets of DB rows
 */

export interface UserIdentity {
  id: string;
  role: 'admin' | 'doctor' | 'patient';
}

export interface DoctorIdentity {
  id: string;
  userId: string;
}

export interface AppointmentIdentity {
  id: string;
  doctorId: string;
  patientId: string; // ⚠️ note: patientId is a USER id in your schema
}

export interface PrescriptionIdentity {
  id: string;
  doctorId: string;
  patientId: string; // USER id
}
