import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();

  if (
    !body?.phone ||
    typeof body.phone !== "string" ||
    !body?.otp ||
    typeof body.otp !== "string"
  ) {
    return error({
      message: "Phone and OTP are required",
      status: 422,
      code: "VALIDATION_ERROR",
    });
  }

  const result = await authService.verifyOtp(body.phone, { otp: body.otp });

  return success(result);
});
