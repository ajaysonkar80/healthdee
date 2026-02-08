import { z } from "zod";

export const auditLogCreateSchema = z.object({
  action: z.string().min(2),
  targetType: z.string().min(2),
  targetId: z.string().min(1),
  metadata: z.record(z.any()).optional(),
});
