import { db } from "../db";
import {
  users,
  authCredentials,
  doctors,
  appointments,
} from "../db/schema";

async function main() {
  console.log("🌱 Seeding database...");


  
  /* -----------------------------------------------------
     0. Admin User
  ----------------------------------------------------- */
  const [admin] = await db
    .insert(users)
    .values({
      role: "admin",
      status: "active",
      createdAt: new Date(),
    })
    .returning({ id: users.id });

  await db.insert(authCredentials).values({
    userId: admin.id,
    email: "admin@healthdee.com",
    whatsappPhone: "7777777777",
    createdAt: new Date(),
  });

  /* -----------------------------------------------------
     1. Create Patient User
  ----------------------------------------------------- */
  const [patient] = await db
    .insert(users)
    .values({
      role: "patient",
      status: "active",
      createdAt: new Date(),
    })
    .returning({ id: users.id });

  await db.insert(authCredentials).values({
    userId: patient.id,
    email: "patient@demo.com",
    whatsappPhone: "1234567890",
    createdAt: new Date(),
  });

  /* -----------------------------------------------------
     2. Create Doctor User
  ----------------------------------------------------- */
  const [doctorUser] = await db
    .insert(users)
    .values({
      role: "doctor",
      status: "active",
      createdAt: new Date(),
    })
    .returning({ id: users.id });

  await db.insert(authCredentials).values({
    userId: doctorUser.id,
    email: "doctor@healthdee.com",
    whatsappPhone: "9876543210",
    createdAt: new Date(),
  });

  /* -----------------------------------------------------
     3. Create Doctor Profile
  ----------------------------------------------------- */
  const [doctor] = await db
    .insert(doctors)
    .values({
      userId: doctorUser.id,
      publicId: crypto.randomUUID(),
      specialty: "Cardiology",
      experienceYears: 10,
      rating: 5,
      profileImageUrl: null,
      rmpRegistrationNumber: "CARDIO-999",
      rmpStateMedicalCouncil: "Maharashtra",
      verificationStatus: "verified",
      verifiedAt: new Date(),
      createdAt: new Date(),
    })
    .returning({ id: doctors.id });

  /* -----------------------------------------------------
     4. Create Appointment
  ----------------------------------------------------- */
  await db.insert(appointments).values({
    patientId: patient.id,
    doctorId: doctor.id,
    scheduledAt: new Date(Date.now() + 60 * 60 * 1000), // +1 hour
    status: "scheduled",
    createdAt: new Date(),
  });

  console.log("✅ Database populated with dummy data!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
