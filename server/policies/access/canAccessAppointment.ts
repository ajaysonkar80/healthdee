// server/policies/access/canAccessAppointment.ts

import type { AuthUser } from '../roles';
import { isAdmin } from '../guards/isAdmin';
import type {
  AppointmentRepository,
  DoctorRepository,
} from '../repositories';

export async function canAccessAppointment(
  user: AuthUser,
  appointmentId: string,
  deps: {
    appointments: AppointmentRepository;
    doctors: DoctorRepository;
  }
): Promise<boolean> {
  if (isAdmin(user)) {
    return true;
  }

  const appointment = await deps.appointments.findById(appointmentId);
  if (!appointment) {
    return false;
  }

  if (user.role === 'doctor') {
    const doctor = await deps.doctors.findByUserId(user.id);
    if (!doctor) {
      return false;
    }

    return appointment.doctorId === doctor.id;
  }

  if (user.role === 'patient') {
    return appointment.patientId === user.id;
  }

  return false;
}
