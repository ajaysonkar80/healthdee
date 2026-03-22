// app/api/auth/otp/resend-email/route.ts
import type { NextRequest }   from "next/server";
import { withErrorHandling }  from "@/server/http/route-helpers";
import { success, error }     from "@/server/http/response";
import { userRepo }           from "@/server/repositories/user.repo";
import { emailService }       from "@/server/services/email.service";
import { OtpChannel }         from "@/server/constants/otp-channel";
import { hash }               from "@/server/utils/password";
import { otpRequestRateLimit }from "@/server/middleware/rate-limit";
import { z }                  from "zod";

const schema = z.object({ email: z.string().email() });

export const POST = withErrorHandling(async (req: NextRequest) => {
  const limited = await otpRequestRateLimit(req);
  if (limited) return limited;

  const body   = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return error({ message: "Valid email required", status: 422, code: "VALIDATION_ERROR" });
  }

  const { email } = parsed.data;

  // Always return success — never leak whether email exists
  const auth = await userRepo.getAuthByEmail(email).catch(() => null);
  if (!auth) return success({ sent: true });

  const user = await userRepo.getUserById(auth.userId).catch(() => null);

  // Only resend if user is still in verification stage
  if (user === null || user.status !== "pending_verification") {
    return success({ sent: true });
  }

  // user is now guaranteed non-null below
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await userRepo.createOtpSession({
    userId:      user.id,
    channel:     OtpChannel.email,
    destination: email,
    otpHash:     await hash(otp),
    expiresAt:   new Date(Date.now() + 10 * 60 * 1000),
  });

  await emailService.sendOtp(email, user.name, otp, 10);

  return success({ sent: true });
});