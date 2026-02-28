CREATE TABLE `doctor_reviews` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`doctor_id` text NOT NULL,
	`patient_name` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text NOT NULL,
	`is_verified` integer DEFAULT false,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `doctors` ADD `full_name` text;--> statement-breakpoint
ALTER TABLE `doctors` ADD `degrees` text;--> statement-breakpoint
ALTER TABLE `doctors` ADD `languages` text;--> statement-breakpoint
ALTER TABLE `doctors` ADD `tagline` text;--> statement-breakpoint
ALTER TABLE `doctors` ADD `is_top_rated` integer DEFAULT false;