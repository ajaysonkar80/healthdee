CREATE TABLE `abha_profiles` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`user_id` text NOT NULL,
	`abha_number` text NOT NULL,
	`abha_address` text,
	`verified_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `abha_number_unique` ON `abha_profiles` (`abha_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `abha_user_unique` ON `abha_profiles` (`user_id`);--> statement-breakpoint
CREATE TABLE `appointments` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`patient_id` text NOT NULL,
	`doctor_id` text NOT NULL,
	`scheduled_at` integer NOT NULL,
	`status` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`patient_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_time_unique` ON `appointments` (`doctor_id`,`scheduled_at`);--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`actor_user_id` text,
	`action` text NOT NULL,
	`target_type` text NOT NULL,
	`target_id` text NOT NULL,
	`metadata` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `auth_credentials` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`user_id` text NOT NULL,
	`email` text,
	`password_hash` text,
	`whatsapp_phone` text,
	`whatsapp_verified_at` integer,
	`email_verified_at` integer,
	`last_login_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_email_unique` ON `auth_credentials` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `auth_whatsapp_unique` ON `auth_credentials` (`whatsapp_phone`);--> statement-breakpoint
CREATE TABLE `clinics` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`name` text NOT NULL,
	`public_slug` text NOT NULL,
	`description` text,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text,
	`country` text DEFAULT 'IN' NOT NULL,
	`geo_lat` text,
	`geo_lng` text,
	`rating` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `consent_notices` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`notice_key` text NOT NULL,
	`language` text NOT NULL,
	`content` text NOT NULL,
	`version` text NOT NULL,
	`effective_from` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `consents` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`user_id` text NOT NULL,
	`notice_id` text NOT NULL,
	`purpose` text NOT NULL,
	`consent_status` text NOT NULL,
	`granted_at` integer,
	`withdrawn_at` integer,
	`channel` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`notice_id`) REFERENCES `consent_notices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `consultation_logs` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`consultation_id` text NOT NULL,
	`log_type` text NOT NULL,
	`content` text NOT NULL,
	`stored_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`consultation_id`) REFERENCES `consultations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `consultations` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`appointment_id` text NOT NULL,
	`mode` text NOT NULL,
	`started_at` integer,
	`ended_at` integer,
	`summary` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `data_erasure_requests` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`user_id` text NOT NULL,
	`status` text NOT NULL,
	`reason` text,
	`requested_at` integer DEFAULT (unixepoch()) NOT NULL,
	`completed_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `doctors` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`user_id` text NOT NULL,
	`public_id` text NOT NULL,
	`specialty` text NOT NULL,
	`experience_years` integer DEFAULT 0,
	`rating` integer DEFAULT 0 NOT NULL,
	`profile_image_url` text,
	`rmp_registration_number` text NOT NULL,
	`rmp_state_medical_council` text NOT NULL,
	`verification_status` text NOT NULL,
	`verified_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_public_id_unique` ON `doctors` (`public_id`);--> statement-breakpoint
CREATE TABLE `fhir_resources` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`user_id` text,
	`abha_profile_id` text,
	`resource_type` text NOT NULL,
	`resource_json` text NOT NULL,
	`source` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`abha_profile_id`) REFERENCES `abha_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `otp_sessions` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
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
CREATE TABLE `prescription_items` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`prescription_id` text NOT NULL,
	`drug_name` text NOT NULL,
	`dosage` text NOT NULL,
	`frequency` text NOT NULL,
	`duration_days` integer NOT NULL,
	`schedule_class` text NOT NULL,
	FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `prescriptions` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`consultation_id` text NOT NULL,
	`doctor_id` text NOT NULL,
	`patient_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`consultation_id`) REFERENCES `consultations`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`patient_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`role` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer
);
