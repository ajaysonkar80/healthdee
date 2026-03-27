DROP INDEX "abha_number_unique";--> statement-breakpoint
DROP INDEX "abha_user_unique";--> statement-breakpoint
DROP INDEX "doctor_time_unique";--> statement-breakpoint
DROP INDEX "appointments_doctor_idx";--> statement-breakpoint
DROP INDEX "appointments_patient_idx";--> statement-breakpoint
DROP INDEX "appointments_doctor_status_idx";--> statement-breakpoint
DROP INDEX "auth_email_unique";--> statement-breakpoint
DROP INDEX "auth_whatsapp_unique";--> statement-breakpoint
DROP INDEX "consultation_logs_consultation_idx";--> statement-breakpoint
DROP INDEX "consultations_appointment_idx";--> statement-breakpoint
DROP INDEX "doctor_availability_doctor_idx";--> statement-breakpoint
DROP INDEX "doctor_earnings_appointment_id_unique";--> statement-breakpoint
DROP INDEX "doctor_earnings_doctor_idx";--> statement-breakpoint
DROP INDEX "doctor_earnings_earned_at_idx";--> statement-breakpoint
DROP INDEX "doctor_reviews_doctor_idx";--> statement-breakpoint
DROP INDEX "doctor_public_id_unique";--> statement-breakpoint
DROP INDEX "doctor_user_unique";--> statement-breakpoint
DROP INDEX "emergency_contact_user_idx";--> statement-breakpoint
DROP INDEX "patient_profile_user_unique";--> statement-breakpoint
DROP INDEX "prescription_drug_unique";--> statement-breakpoint
DROP INDEX "prescriptions_consultation_idx";--> statement-breakpoint
DROP INDEX "prescriptions_patient_idx";--> statement-breakpoint
DROP INDEX "prescriptions_doctor_idx";--> statement-breakpoint
DROP INDEX "rate_limits_reset_at_idx";--> statement-breakpoint
DROP INDEX "user_preferences_user_unique";--> statement-breakpoint
ALTER TABLE `doctors` ALTER COLUMN "specialty" TO "specialty" text;--> statement-breakpoint
CREATE UNIQUE INDEX `abha_number_unique` ON `abha_profiles` (`abha_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `abha_user_unique` ON `abha_profiles` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_time_unique` ON `appointments` (`doctor_id`,`scheduled_at`);--> statement-breakpoint
CREATE INDEX `appointments_doctor_idx` ON `appointments` (`doctor_id`);--> statement-breakpoint
CREATE INDEX `appointments_patient_idx` ON `appointments` (`patient_id`);--> statement-breakpoint
CREATE INDEX `appointments_doctor_status_idx` ON `appointments` (`doctor_id`,`status`);--> statement-breakpoint
CREATE UNIQUE INDEX `auth_email_unique` ON `auth_credentials` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `auth_whatsapp_unique` ON `auth_credentials` (`whatsapp_phone`);--> statement-breakpoint
CREATE INDEX `consultation_logs_consultation_idx` ON `consultation_logs` (`consultation_id`);--> statement-breakpoint
CREATE INDEX `consultations_appointment_idx` ON `consultations` (`appointment_id`);--> statement-breakpoint
CREATE INDEX `doctor_availability_doctor_idx` ON `doctor_availability` (`doctor_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_earnings_appointment_id_unique` ON `doctor_earnings` (`appointment_id`);--> statement-breakpoint
CREATE INDEX `doctor_earnings_doctor_idx` ON `doctor_earnings` (`doctor_id`);--> statement-breakpoint
CREATE INDEX `doctor_earnings_earned_at_idx` ON `doctor_earnings` (`doctor_id`,`earned_at`);--> statement-breakpoint
CREATE INDEX `doctor_reviews_doctor_idx` ON `doctor_reviews` (`doctor_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_public_id_unique` ON `doctors` (`public_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_user_unique` ON `doctors` (`user_id`);--> statement-breakpoint
CREATE INDEX `emergency_contact_user_idx` ON `emergency_contacts` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `patient_profile_user_unique` ON `patient_profiles` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `prescription_drug_unique` ON `prescription_items` (`prescription_id`,`drug_name`);--> statement-breakpoint
CREATE INDEX `prescriptions_consultation_idx` ON `prescriptions` (`consultation_id`);--> statement-breakpoint
CREATE INDEX `prescriptions_patient_idx` ON `prescriptions` (`patient_id`);--> statement-breakpoint
CREATE INDEX `prescriptions_doctor_idx` ON `prescriptions` (`doctor_id`);--> statement-breakpoint
CREATE INDEX `rate_limits_reset_at_idx` ON `rate_limits` (`reset_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_preferences_user_unique` ON `user_preferences` (`user_id`);--> statement-breakpoint
ALTER TABLE `doctors` ALTER COLUMN "rmp_registration_number" TO "rmp_registration_number" text;--> statement-breakpoint
ALTER TABLE `doctors` ALTER COLUMN "rmp_state_medical_council" TO "rmp_state_medical_council" text;--> statement-breakpoint
ALTER TABLE `doctors` ALTER COLUMN "verification_status" TO "verification_status" text NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `doctors` ADD `doctor_gender` text DEFAULT 'male';--> statement-breakpoint
ALTER TABLE `doctors` ADD `doctor_availability` text;--> statement-breakpoint
ALTER TABLE `doctors` ADD `city` text;--> statement-breakpoint
ALTER TABLE `doctors` ADD `state` text;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_otp_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`channel` text NOT NULL,
	`destination` text NOT NULL,
	`otp_hash` text NOT NULL,
	`expires_at` integer NOT NULL,
	`verified_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_otp_sessions`("id", "user_id", "channel", "destination", "otp_hash", "expires_at", "verified_at", "created_at") SELECT "id", "user_id", "channel", "destination", "otp_hash", "expires_at", "verified_at", "created_at" FROM `otp_sessions`;--> statement-breakpoint
DROP TABLE `otp_sessions`;--> statement-breakpoint
ALTER TABLE `__new_otp_sessions` RENAME TO `otp_sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;