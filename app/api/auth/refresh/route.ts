import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const POST = withErrorHandling(async (_req: NextRequest) => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return error({
      message: "Refresh token missing",
      status: 401,
      code: "UNAUTHORIZED",
    });
  }

  const result = await authService.refresh(refreshToken);

  /*
    Expected shape from service:
    {
      user: { id: string; role: string },
      accessToken: string;
      refreshToken: string; // rotated
    }
  */

  // Set new access token
  cookieStore.set("access_token", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  // Rotate refresh token
  cookieStore.set("refresh_token", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return success(result.user);
});
