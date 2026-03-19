CREATE TABLE `doctor_earnings` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`doctor_id` text NOT NULL,
	`appointment_id` text NOT NULL,
	`patient_id` text NOT NULL,
	`appointment_type` text DEFAULT 'new' NOT NULL,
	`fee_amount` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'paid' NOT NULL,
	`earned_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`patient_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_earnings_appointment_id_unique` ON `doctor_earnings` (`appointment_id`);--> statement-breakpoint
CREATE INDEX `doctor_earnings_doctor_idx` ON `doctor_earnings` (`doctor_id`);--> statement-breakpoint
CREATE INDEX `doctor_earnings_earned_at_idx` ON `doctor_earnings` (`doctor_id`,`earned_at`);