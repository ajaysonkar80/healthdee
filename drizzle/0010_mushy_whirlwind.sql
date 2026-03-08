CREATE TABLE `emergency_contacts` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`relationship` text,
	`phone` text NOT NULL,
	`email` text,
	`is_primary` integer DEFAULT false NOT NULL,
	`notes` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `emergency_contact_user_idx` ON `emergency_contacts` (`user_id`);--> statement-breakpoint
CREATE TABLE `patient_profiles` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`user_id` text NOT NULL,
	`age` integer,
	`date_of_birth` integer,
	`full_name` text,
	`profile_image_url` text,
	`gender` text,
	`blood_group` text,
	`phone` text,
	`address_line1` text,
	`address_line2` text,
	`city` text,
	`state` text,
	`postal_code` text,
	`country` text DEFAULT 'IN',
	`height_cm` integer,
	`weight_kg` integer,
	`allergies` text,
	`chronic_conditions` text,
	`abha_linked` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "age_or_dob_required" CHECK(age IS NOT NULL OR date_of_birth IS NOT NULL)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `patient_profile_user_unique` ON `patient_profiles` (`user_id`);--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`user_id` text NOT NULL,
	`whatsapp_alerts` integer DEFAULT true NOT NULL,
	`sms_notifications` integer DEFAULT false NOT NULL,
	`email_notifications` integer DEFAULT true NOT NULL,
	`appointment_reminders` integer DEFAULT true NOT NULL,
	`share_medical_records_with_doctors` integer DEFAULT true NOT NULL,
	`allow_research_use` integer DEFAULT false,
	`allow_data_download` integer DEFAULT true,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_preferences_user_unique` ON `user_preferences` (`user_id`);--> statement-breakpoint
CREATE INDEX `appointments_doctor_idx` ON `appointments` (`doctor_id`);--> statement-breakpoint
CREATE INDEX `appointments_patient_idx` ON `appointments` (`patient_id`);--> statement-breakpoint
CREATE INDEX `appointments_doctor_status_idx` ON `appointments` (`doctor_id`,`status`);--> statement-breakpoint
CREATE INDEX `consultation_logs_consultation_idx` ON `consultation_logs` (`consultation_id`);--> statement-breakpoint
CREATE INDEX `consultations_appointment_idx` ON `consultations` (`appointment_id`);--> statement-breakpoint
CREATE INDEX `doctor_availability_doctor_idx` ON `doctor_availability` (`doctor_id`);--> statement-breakpoint
CREATE INDEX `doctor_reviews_doctor_idx` ON `doctor_reviews` (`doctor_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_user_unique` ON `doctors` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `prescription_drug_unique` ON `prescription_items` (`prescription_id`,`drug_name`);--> statement-breakpoint
CREATE INDEX `prescriptions_consultation_idx` ON `prescriptions` (`consultation_id`);--> statement-breakpoint
CREATE INDEX `prescriptions_patient_idx` ON `prescriptions` (`patient_id`);--> statement-breakpoint
CREATE INDEX `prescriptions_doctor_idx` ON `prescriptions` (`doctor_id`);