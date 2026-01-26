import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2'; // Better than UUID for databases

// --- 1. AUTHENTICATION & USERS ---

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').unique(),      // Nullable, as they might use phone
  phone: text('phone').unique(),      // Nullable, as they might use email
  role: text('role', { enum: ['patient', 'doctor', 'admin'] }).notNull().default('patient'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  // No password column since we use OTP
});

// Store OTPs temporarily. Delete rows after validation or expiry.
export const otps = sqliteTable('otps', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  contact: text('contact').notNull(), // The email OR phone number
  code: text('code').notNull(),       // The 6-digit code
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

// --- 2. PROFILES (Extensive Onboarding Data) ---

export const patientProfiles = sqliteTable('patient_profiles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  fullName: text('full_name').notNull(),
  dateOfBirth: text('date_of_birth'), // ISO String YYYY-MM-DD
  gender: text('gender', { enum: ['male', 'female', 'other'] }),
  bloodGroup: text('blood_group'),
  address: text('address'),
  // Medical Onboarding Data
  allergies: text('allergies'), // JSON string or comma-separated
  chronicConditions: text('chronic_conditions'), // e.g., "Diabetes, Hypertension"
  emergencyContactName: text('emergency_contact_name'),
  emergencyContactPhone: text('emergency_contact_phone'),
});

export const doctorProfiles = sqliteTable('doctor_profiles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  fullName: text('full_name').notNull(),
  specialization: text('specialization').notNull(), // e.g., "Cardiologist"
  licenseNumber: text('license_number').notNull(),
  yearsOfExperience: integer('years_of_experience'),
  bio: text('bio'),
  clinicAddress: text('clinic_address'),
  clinicGeoLat: real('clinic_geo_lat'), // For map search
  clinicGeoLng: real('clinic_geo_lng'),
  consultationFee: integer('consultation_fee').notNull(), // Store in cents/lowest currency unit
  
  // JSON field for complex availability (e.g., { "mon": ["09:00", "17:00"], "tue": ... })
  availability: text('availability', { mode: 'json' }), 
  
  verificationStatus: text('verification_status', { enum: ['pending', 'approved', 'rejected'] }).default('pending'),
});

// --- 3. CORE BUSINESS LOGIC ---

export const appointments = sqliteTable('appointments', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  patientId: text('patient_id').references(() => users.id).notNull(),
  doctorId: text('doctor_id').references(() => users.id).notNull(),
  
  startTime: text('start_time').notNull(), // ISO String: 2023-10-25T14:30:00Z
  status: text('status', { enum: ['pending', 'confirmed', 'completed', 'cancelled'] }).default('pending'),
  
  // Snapshot of fee at time of booking (in case doctor changes price later)
  feeAmount: integer('fee_amount').notNull(), 
  paymentStatus: text('payment_status', { enum: ['unpaid', 'paid', 'refunded'] }).default('unpaid'),
  
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const prescriptions = sqliteTable('prescriptions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  appointmentId: text('appointment_id').references(() => appointments.id).notNull(),
  doctorId: text('doctor_id').references(() => users.id).notNull(),
  patientId: text('patient_id').references(() => users.id).notNull(),
  
  diagnosis: text('diagnosis').notNull(),
  // Store medicines as a JSON array for simplicity in SQLite
  // Example: [{ name: "Paracetamol", dosage: "500mg", freq: "1-0-1", duration: "5 days" }]
  medications: text('medications', { mode: 'json' }).notNull(),
  advice: text('advice'),
  
  issuedAt: integer('issued_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const medicalRecords = sqliteTable('medical_records', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  patientId: text('patient_id').references(() => users.id).notNull(),
  title: text('title').notNull(), // e.g., "Blood Test Report"
  fileUrl: text('file_url').notNull(), // Link to R2/S3 bucket
  uploadedAt: integer('uploaded_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  appointmentId: text('appointment_id').references(() => appointments.id),
  doctorId: text('doctor_id').references(() => users.id),
  amount: integer('amount').notNull(), // Total paid by patient
  platformFee: integer('platform_fee').notNull(), // Your earnings
  doctorNet: integer('doctor_net').notNull(), // amount - platformFee
  status: text('status', { enum: ['pending', 'cleared'] }).default('pending'), // 'cleared' when you payout to doctor
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// --- 4. RELATIONS (For easy querying) ---


export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(users, { fields: [appointments.patientId], references: [users.id], relationName: 'patientAppointments' }),
  doctor: one(users, { fields: [appointments.doctorId], references: [users.id], relationName: 'doctorAppointments' }),
  prescription: one(prescriptions),
  transaction: one(transactions),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  // 1. Explicitly tell Drizzle how to find the Patient Profile
  patientProfile: one(patientProfiles, {
    fields: [users.id],              // The field in THIS table
    references: [patientProfiles.userId], // The field in the OTHER table
  }),

  // 2. Explicitly tell Drizzle how to find the Doctor Profile
  doctorProfile: one(doctorProfiles, {
    fields: [users.id],
    references: [doctorProfiles.userId],
  }),

  // 3. Keep appointments as they were
  appointmentsAsPatient: many(appointments, { relationName: 'patientAppointments' }),
  appointmentsAsDoctor: many(appointments, { relationName: 'doctorAppointments' }),
}));