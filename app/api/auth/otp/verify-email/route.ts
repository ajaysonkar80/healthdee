// app/api/auth/otp/verify/route.ts
import type { NextRequest } from "next/server";
import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error }    from "@/server/http/response";
import { authService }       from "@/server/services/auth.service";
import { otpVerifyRateLimit }from "@/server/middleware/rate-limit";
import { cookies }           from "next/headers";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const limited = await otpVerifyRateLimit(req);
  if (limited) return limited;

  const body  = await req.json();
  const phone = body?.phone?.trim();
  const otp   = body?.otp?.trim();

  if (!phone || !otp) return error({ message: "Phone and OTP are required", status: 422, code: "VALIDATION_ERROR" });

  const result = await authService.verifyOtp(phone, { otp });

  // Phone login succeeded — set auth cookies
  if ("accessToken" in result) {
    const cookieStore = await cookies();
    cookieStore.set("access_token", result.accessToken, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/",
    });
    cookieStore.set("refresh_token", result.refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/",
    });
  }

  return success(result);
});