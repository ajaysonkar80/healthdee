'use server';

import { db } from '@/db';
import { appointments } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getAppointments() {
  // Fetch appointments including relation data
  return await db.query.appointments.findMany({
    with: {
      patient: { with: { patientProfile: true } },
      doctor: { with: { doctorProfile: true } },
    },
    orderBy: [desc(appointments.createdAt)],
  });
}

export async function cancelBooking(id: string) {
  await db.update(appointments)
    .set({ status: 'cancelled' })
    .where(eq(appointments.id, id));
  
  revalidatePath('/'); // Refresh the page automatically
}