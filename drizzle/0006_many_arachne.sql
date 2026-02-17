DROP INDEX "abha_number_unique";--> statement-breakpoint
DROP INDEX "abha_user_unique";--> statement-breakpoint
DROP INDEX "doctor_time_unique";--> statement-breakpoint
DROP INDEX "auth_email_unique";--> statement-breakpoint
DROP INDEX "auth_whatsapp_unique";--> statement-breakpoint
DROP INDEX "doctor_public_id_unique";--> statement-breakpoint
DROP INDEX "rate_limits_reset_at_idx";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "name" TO "name" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `abha_number_unique` ON `abha_profiles` (`abha_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `abha_user_unique` ON `abha_profiles` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_time_unique` ON `appointments` (`doctor_id`,`scheduled_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `auth_email_unique` ON `auth_credentials` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `auth_whatsapp_unique` ON `auth_credentials` (`whatsapp_phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_public_id_unique` ON `doctors` (`public_id`);--> statement-breakpoint
CREATE INDEX `rate_limits_reset_at_idx` ON `rate_limits` (`reset_at`);