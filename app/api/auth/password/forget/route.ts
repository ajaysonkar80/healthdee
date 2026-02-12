import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();

  if (!body?.email || typeof body.email !== "string") {
    return error({
      message: "Email is required",
      status: 422,
      code: "VALIDATION_ERROR",
    });
  }

  await authService.requestPasswordReset(body.email);

  return success({ message: "OTP sent to email" });
});
