import { doctorRepo } from "@/server/repositories/doctor.repo";

async function seed() {
  const doctorId = "6a8a7510bdf2228d70a4f7d0bdbb476a";

  const weekdays = [1, 2, 3, 4, 5];

  for (const day of weekdays) {
    await doctorRepo.upsertAvailability({
      doctorId,
      dayOfWeek: day,
      startTime: "09:00",
      endTime: "17:00",
      slotDurationMinutes: 30,
      isActive: true,
    });
  }

  console.log("✅ Availability seeded");
}

seed().catch(console.error);