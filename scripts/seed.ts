import { db } from "../db";
import {
  users,
  authCredentials,
  doctors,
  appointments,
  consultations,
  prescriptions,
  prescriptionItems,
  abhaProfiles,
  auditLogs,
  otpSessions,
  fhirResources,
  consents,
  refreshTokens,
  consentNotices
} from "../db/schema";
import { hash } from "@/server/utils/password";

async function main() {
  console.log("🧹 Clearing existing data...");
  await db.delete(prescriptionItems);
  await db.delete(prescriptions);
  await db.delete(consultations);
  await db.delete(appointments);
  await db.delete(doctors);
  await db.delete(authCredentials);
  await db.delete(auditLogs);        // Missing in your original script
  await db.delete(otpSessions);      // Missing in your original script
  await db.delete(abhaProfiles);     // Missing in your original script
  await db.delete(fhirResources);    // Missing in your original script
  await db.delete(consentNotices)
  await db.delete(consents);         // Missing in your original script
  await db.delete(refreshTokens);    // Missing in your original script
  await db.delete(users);

  console.log("🌱 Seeding database...");
  const now = new Date();

  /* =====================================================
     1️⃣ ADMIN
  ===================================================== */
  const [admin] = await db
    .insert(users)
    .values({
      name: "System Admin",
      role: "admin",
      status: "active",
      createdAt: now,
    })
    .returning({ id: users.id });

  await db.insert(authCredentials).values({
    userId: admin.id,
    email: "admin@healthdee.com",
    passwordHash: await hash("Admin@123"),
    emailVerifiedAt: now,
    createdAt: now,
  });

  /* =====================================================
     2️⃣ PATIENT
  ===================================================== */
  const [patient] = await db
    .insert(users)
    .values({
      name: "John Doe",
      role: "patient",
      status: "active",
      createdAt: now,
    })
    .returning({ id: users.id });

  await db.insert(authCredentials).values({
    userId: patient.id,
    email: "patient@demo.com",
    passwordHash: await hash("Patient@123"),
    emailVerifiedAt: now,
    createdAt: now,
  });

  /* =====================================================
     3️⃣ DOCTOR
  ===================================================== */
  const [doctorUser] = await db
    .insert(users)
    .values({
      name: "Dr. Sarah Smith",
      role: "doctor",
      status: "active",
      createdAt: now,
    })
    .returning({ id: users.id });

  await db.insert(authCredentials).values({
    userId: doctorUser.id,
    email: "doctor@healthdee.com",
    passwordHash: await hash("Doctor@123"),
    emailVerifiedAt: now,
    createdAt: now,
  });

  const [doctor] = await db
    .insert(doctors)
    .values({
      userId: doctorUser.id,
      publicId: crypto.randomUUID(),
      specialty: "Cardiology",
      experienceYears: 12,
      rating: 5,
      rmpRegistrationNumber: "CARDIO-999",
      rmpStateMedicalCouncil: "Maharashtra",
      verificationStatus: "verified",
      verifiedAt: now,
      createdAt: now,
    })
    .returning({ id: doctors.id });

  /* =====================================================
     4️⃣ APPOINTMENTS
  ===================================================== */
  const [completedAppointment] = await db
    .insert(appointments)
    .values([
      {
        patientId: patient.id,
        doctorId: doctor.id,
        scheduledAt: new Date(Date.now() + 3600000),
        status: "PENDING",
        createdAt: now,
      },
      {
        patientId: patient.id,
        doctorId: doctor.id,
        scheduledAt: new Date(Date.now() - 86400000),
        status: "COMPLETED",
        createdAt: now,
      },
      {
        patientId: patient.id,
        doctorId: doctor.id,
        scheduledAt: new Date(Date.now() - 3600000),
        status: "CANCELLED",
        createdAt: now,
      }
    ])
    .returning({ id: appointments.id });

  /* =====================================================
     5️⃣ CONSULTATION + PRESCRIPTION
  ===================================================== */
  const [consultation] = await db
    .insert(consultations)
    .values({
      appointmentId: completedAppointment.id,
      mode: "video",
      startedAt: new Date(Date.now() - 86400000),
      endedAt: new Date(Date.now() - 86000000),
      summary: "Patient reported mild chest discomfort.",
      createdAt: now,
    })
    .returning({ id: consultations.id });

  const [prescription] = await db
    .insert(prescriptions)
    .values({
      consultationId: consultation.id,
      doctorId: doctor.id,
      patientId: patient.id,
      createdAt: now,
    })
    .returning({ id: prescriptions.id });

  await db.insert(prescriptionItems).values([
    {
      prescriptionId: prescription.id,
      drugName: "Aspirin",
      dosage: "75mg",
      frequency: "Once daily",
      durationDays: 30,
      scheduleClass: "G",
    },
    {
      prescriptionId: prescription.id,
      drugName: "Atorvastatin",
      dosage: "10mg",
      frequency: "Once daily",
      durationDays: 30,
      scheduleClass: "H",
    },
  ]);

  console.log("✅ Demo data created successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});