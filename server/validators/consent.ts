import { z } from "zod";
import { ConsentStatusSchema } from "@/db/schema";

export const consentGrantSchema = z.object({
  noticeId: z.string().uuid(),
  purpose: z.string().min(2),
  channel: z.string().min(2),
  consentStatus: ConsentStatusSchema,
});

export const consentWithdrawSchema = z.object({
  consentId: z.string().uuid(),
});

export const consentCreateSchema = z.object({
  noticeId: z.string().uuid(),
  purpose: z.string().trim().min(2).max(200),
  channel: z.string().trim().min(2).max(50),
  consentStatus: ConsentStatusSchema,
});