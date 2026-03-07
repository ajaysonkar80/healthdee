// server/policies/access/canAccessUser.ts

import type { AuthUser } from '../roles';
import { isAdmin } from '../guards/isAdmin';
import { isDoctor } from '../guards/isDoctor';
import type {
  DoctorRepository,
  AppointmentRepository,
} from '../repositories';

export async function canAccessUser(
  user: AuthUser,
  targetUserId: string,
  deps: {
    doctors: DoctorRepository;
    appointments: AppointmentRepository;
  }
): Promise<boolean> {
  // Self-access
  if (user.id === targetUserId) return true;

  // Admin can access user-level data (PII filtered later)
  if (isAdmin(user)) return true;

  // Doctor → patient via appointment
  if (isDoctor(user)) {
    const doctor = await deps.doctors.findByUserId(user.id);
    if (!doctor) return false;

    return deps.appointments.existsForDoctorAndPatient(
      doctor.id,
      targetUserId
    );
  }

  return false;
}
