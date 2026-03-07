// server/policies/access/canAccessPrescription.ts

import type { AuthUser } from '../roles';
import { isAdmin } from '../guards/isAdmin';
import type {
  PrescriptionRepository,
  DoctorRepository,
} from '../repositories';

export async function canAccessPrescription(
  user: AuthUser,
  prescriptionId: string,
  deps: {
    prescriptions: PrescriptionRepository;
    doctors: DoctorRepository;
  }
): Promise<boolean> {
  if (isAdmin(user)) {
    return true;
  }

  const prescription = await deps.prescriptions.findById(prescriptionId);
  if (!prescription) {
    return false;
  }

  if (user.role === 'doctor') {
    const doctor = await deps.doctors.findByUserId(user.id);
    if (!doctor) {
      return false;
    }

    return prescription.doctorId === doctor.id;
  }

  if (user.role === 'patient') {
    return prescription.patientId === user.id;
  }

  return false;
}
