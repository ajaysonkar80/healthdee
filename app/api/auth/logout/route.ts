import { withErrorHandling, withAuth } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { cookies } from "next/headers";
import { authService } from "@/server/services/auth.service";

export const POST = withErrorHandling(
  withAuth(async (req) => {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refresh_token")?.value;

    // 1️⃣ Revoke refresh token if persistence exists
    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    // 2️⃣ Clear access token cookie
    cookieStore.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    // 3️⃣ Clear refresh token cookie
    cookieStore.set("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    // 4️⃣ Stable response shape
    return success({ success: true });
  })
);
