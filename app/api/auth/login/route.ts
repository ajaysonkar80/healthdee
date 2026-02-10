import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import { loginSchema } from "@/server/validators/auth";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return error({
      message: "Invalid login payload",
      status: 422,
      code: "VALIDATION_ERROR",
    });
  }

  const data = parsed.data;

  switch (data.type) {
    case "email":
      return success(await authService.loginWithEmail(data));

    case "phone":
  return success(
    await authService.loginWithPhone(data.phone, { otp: data.otp })
  );

    default: {
      const _exhaustive: never = data;
      throw _exhaustive;
    }
  }
});
