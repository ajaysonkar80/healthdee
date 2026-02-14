CREATE TABLE `doctor_slots` (
	`id` text PRIMARY KEY NOT NULL,
	`doctor_id` text NOT NULL,
	`start_time_utc` integer NOT NULL,
	`end_time_utc` integer NOT NULL,
	`is_booked` integer DEFAULT false NOT NULL,
	`appointment_id` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `doctor_start_idx` ON `doctor_slots` (`doctor_id`,`start_time_utc`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_doctor_slot` ON `doctor_slots` (`doctor_id`,`start_time_utc`);