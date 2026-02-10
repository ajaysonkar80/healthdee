import type { AuthUser } from "../roles";
import { isAdmin } from "../guards/isAdmin";
import { isDoctor } from "../guards/isDoctor";
import type { DoctorRepository, AppointmentRepository } from "../repositories";

export async function canAccessUser(
  user: AuthUser,
  targetUserId: string,
  deps: {
    doctorRepo: DoctorRepository;
    appointmentRepo: AppointmentRepository;
  }
): Promise<boolean> {
  // Self access
  if (user.id === targetUserId) {
    return true;
  }

  // Admin allowed (PII filtered later)
  if (isAdmin(user)) {
    return true;
  }

  // Doctor only via appointment
  if (isDoctor(user)) {
    const doctor = await deps.doctorRepo.findByUserId(user.id);
    if (!doctor) return false;

    return deps.appointmentRepo.existsForDoctorAndPatient(
      doctor.id,
      targetUserId
    );
  }

  return false;
}
