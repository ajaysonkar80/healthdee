import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();

  if (
    !body?.email ||
    !body?.otp ||
    !body?.password ||
    typeof body.email !== "string" ||
    typeof body.otp !== "string" ||
    typeof body.password !== "string"
  ) {
    return error({
      message: "Invalid input",
      status: 422,
      code: "VALIDATION_ERROR",
    });
  }

  await authService.resetPassword(body);

  return success({ message: "Password reset successful" });
});
