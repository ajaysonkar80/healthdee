// app/api/auth/otp/request/route.ts
import type { NextRequest } from "next/server";
import { withErrorHandling }  from "@/server/http/route-helpers";
import { success, error }     from "@/server/http/response";
import { authService }        from "@/server/services/auth.service";
import { otpRequestRateLimit }from "@/server/middleware/rate-limit";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const limited = await otpRequestRateLimit(req);
  if (limited) return limited;

  const body  = await req.json();
  const phone = body?.phone?.trim();

  if (!phone) return error({ message: "Phone number is required", status: 422, code: "VALIDATION_ERROR" });

  const phoneRegex = /^\+?[1-9]\d{7,14}$/;
  if (!phoneRegex.test(phone)) return error({ message: "Invalid phone number", status: 422, code: "INVALID_PHONE" });

  return success(await authService.requestOtp(phone));
});