// server/policies/access/canAccessPatient.ts

import type { AuthUser } from '../roles';
import { isAdmin } from '../guards/isAdmin';
import { isDoctor } from '../guards/isDoctor';
import type {
  DoctorRepository,
  AppointmentRepository,
} from '../repositories';

export async function canAccessPatient(
  user: AuthUser,
  patientUserId: string,
  deps: {
    doctors: DoctorRepository;
    appointments: AppointmentRepository;
  }
): Promise<boolean> {
  // Admin allowed (PII filtered later)
  if (isAdmin(user)) return true;

  // Patient → self
  if (user.role === 'patient') {
    return user.id === patientUserId;
  }

  // Doctor → patient via appointment
  if (isDoctor(user)) {
    const doctor = await deps.doctors.findByUserId(user.id);
    if (!doctor) return false;

    return deps.appointments.existsForDoctorAndPatient(
      doctor.id,
      patientUserId
    );
  }

  return false;
}
