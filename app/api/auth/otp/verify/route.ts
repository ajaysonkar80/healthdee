import { NextRequest } from "next/server";
import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";

type RequestBody = {
  phone?: string;
  otp?: string;
};

export const POST = withErrorHandling(async (req: NextRequest) => {
  let body: RequestBody;

  try {
    body = await req.json();
  } catch {
    return error({
      message: "Invalid JSON body",
      status: 400,
      code: "INVALID_JSON",
    });
  }

  const phone = body?.phone?.trim();
  const otp = body?.otp?.trim();

  if (!phone || !otp) {
    return error({
      message: "Phone and OTP are required",
      status: 422,
      code: "VALIDATION_ERROR",
    });
  }

  // Basic E.164 phone validation
  const phoneRegex = /^\+?[1-9]\d{7,14}$/;
  if (!phoneRegex.test(phone)) {
    return error({
      message: "Invalid phone number format",
      status: 422,
      code: "INVALID_PHONE_FORMAT",
    });
  }

  // Enforce 4-digit OTP format
  const otpRegex = /^\d{4}$/;
  if (!otpRegex.test(otp)) {
    return error({
      message: "OTP must be a 4-digit code",
      status: 422,
      code: "INVALID_OTP_FORMAT",
    });
  }

  const result = await authService.verifyOtp(phone, { otp });

  return success(result);
});
