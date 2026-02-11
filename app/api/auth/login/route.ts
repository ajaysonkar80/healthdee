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

  let result:
    | {
        user: { id: string; role: string };
        accessToken: string;
        refreshToken: string;
      };

  switch (data.type) {
    case "email":
      result = await authService.loginWithEmail(data);
      break;

    case "phone":
      result = await authService.loginWithPhone(
        data.phone,
        { otp: data.otp }
      );
      break;

    default: {
      const _exhaustive: never = data;
      throw _exhaustive;
    }
  }

  const cookieStore = await cookies();

  // Set Access Token Cookie
  cookieStore.set("access_token", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  // Set Refresh Token Cookie
  cookieStore.set("refresh_token", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  // Only return safe user info to frontend
  return success(result.user);
});
