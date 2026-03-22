// app/api/auth/password/forgot/route.ts
import type { NextRequest }       from "next/server";
import { withErrorHandling }      from "@/server/http/route-helpers";
import { success, error }         from "@/server/http/response";
import { authService }            from "@/server/services/auth.service";
import { forgotPasswordSchema }   from "@/server/validators/auth";
import { passwordResetRateLimit } from "@/server/middleware/rate-limit";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const limited = await passwordResetRateLimit(req);
  if (limited) return limited;

  const body   = await req.json();
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return error({ message: "Valid email is required", status: 422, code: "VALIDATION_ERROR" });
  }

  // Always returns { sent: true } — never leaks whether email exists
  await authService.requestPasswordReset(parsed.data.email);
  return success({ sent: true });
});