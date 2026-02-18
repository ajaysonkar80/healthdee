ALTER TABLE `doctors` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `doctors` ADD `consultation_fee` integer;--> statement-breakpoint
ALTER TABLE `doctors` ADD `is_active` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `doctors` ADD `updated_at` integer;