import { z } from "zod";
import { UserRoleSchema, UserStatusSchema } from "@/db/schema";

export const userCreateSchema = z.object({
  role: UserRoleSchema,
});

export const userStatusUpdateSchema = z.object({
  status: UserStatusSchema,
});
