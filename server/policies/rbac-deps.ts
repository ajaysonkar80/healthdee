import { doctorRepo} from "@/server/repositories/doctor.repo";
import { appointmentRepo } from "@/server/repositories/appointment.repo";
import { prescriptionRepo } from "@/server/repositories/prescription.repo";

import type {
  DoctorRepository,
  AppointmentRepository,
  PrescriptionRepository,
} from "./repositories";

/*
export const rbacDeps: {
  doctorRepo: DoctorRepository;
  appointmentRepo: AppointmentRepository;
  prescriptionRepo: PrescriptionRepository;
} = {
  doctorRepo: {
    findByUserId: (userId: string) =>
      doctorRepo.getDoctorByUserId(userId),
  },

  appointmentRepo: {
    findById: (id: string) =>
      appointmentRepo.getAppointmentById(id),

    existsForDoctorAndPatient: (
      doctorId: string,
      patientUserId: string
    ) =>
      appointmentRepo.existsForDoctorAndPatient(
        doctorId,
        patientUserId
      ),
  },

  prescriptionRepo: {
    findById: (id: string) =>
      prescriptionRepo.getPrescriptionById(id),
  },
};
*/

export const rbacDeps: {
  doctorRepo: DoctorRepository;
  appointmentRepo: AppointmentRepository;
  prescriptionRepo: PrescriptionRepository;
} = {
  doctorRepo: {
    findByUserId: (userId: string) =>
      doctorRepo.getDoctorByUserId(userId),
  },

  appointmentRepo: {
    findById: (id: string) =>
      appointmentRepo.getAppointmentById(id),

    existsForDoctorAndPatient: (
      doctorId: string,
      patientUserId: string
    ) =>
      appointmentRepo.existsForDoctorAndPatient(
        doctorId,
        patientUserId
      ),
  },

  prescriptionRepo: {
    findById: (id: string) =>
      prescriptionRepo.getPrescriptionById(id),
  },
};

