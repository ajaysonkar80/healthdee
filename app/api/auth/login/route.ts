import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import { loginSchema } from "@/server/validators/auth";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

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

  // 🔐 EMAIL LOGIN ONLY
  if (data.type !== "email") {
    return error({
      message:
        "Phone login now requires OTP flow. Use /api/auth/phone/login/start",
      status: 400,
      code: "INVALID_FLOW",
    });
  }

  const result = await authService.loginWithEmail(data);

  const cookieStore = await cookies();

  cookieStore.set("access_token", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refresh_token", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return success(result.user);
});
