// scripts/seed.ts
import { db } from '../db';
import { users, patientProfiles, doctorProfiles, appointments } from '../db/schema';

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create a Patient
  const [patient] = await db.insert(users).values({
    email: 'patient@demo.com',
    phone: '1234567890',
    role: 'patient',
  }).returning();

  await db.insert(patientProfiles).values({
    userId: patient.id,
    fullName: 'John Doe',
    dateOfBirth: '1995-05-20',
    gender: 'male',
    bloodGroup: 'O+',
  });

  // 2. Create a Doctor
  const [doctor] = await db.insert(users).values({
    email: 'doctor@healthdee.com',
    phone: '9876543210',
    role: 'doctor',
  }).returning();

  await db.insert(doctorProfiles).values({
    userId: doctor.id,
    fullName: 'Dr. Sarah Smith',
    specialization: 'Cardiologist',
    licenseNumber: 'CARDIO-999',
    consultationFee: 5000, // 50.00
    verificationStatus: 'approved',
    availability: JSON.stringify({ mon: ["09:00", "17:00"] }),
  });

  // 3. Create an Appointment
  await db.insert(appointments).values({
    patientId: patient.id,
    doctorId: doctor.id,
    startTime: new Date().toISOString(),
    status: 'pending',
    feeAmount: 5000,
  });

  console.log('✅ Database populated with dummy data!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});