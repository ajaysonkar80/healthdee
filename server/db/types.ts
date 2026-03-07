// server/db/types.ts

import type { InferSelectModel } from 'drizzle-orm';

import type { doctors,users,appointments,prescriptions } from '@/db/schema';

/**
 * Core row types (exactly match DB schema)
 */
export type UserRow = InferSelectModel<typeof users>;
export type DoctorRow = InferSelectModel<typeof doctors>;
export type AppointmentRow = InferSelectModel<typeof appointments>;
export type PrescriptionRow = InferSelectModel<typeof prescriptions>;
