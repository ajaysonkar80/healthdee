// app/api/auth/select-role/route.ts
import type { NextRequest }   from "next/server";
import { withErrorHandling }  from "@/server/http/route-helpers";
import { success, error }     from "@/server/http/response";
import { authService }        from "@/server/services/auth.service";
import { cookies }            from "next/headers";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const cookieStore     = await cookies();
  const onboardingToken = cookieStore.get("onboarding_token")?.value;

  if (!onboardingToken) {
    return error({ message: "Invalid session. Please sign up again.", status: 403, code: "FORBIDDEN" });
  }

  const body   = await req.json();
  const result = await authService.selectRole(onboardingToken, body);

  // Clear onboarding token — signup is complete
  cookieStore.delete("onboarding_token");

  // Set real auth tokens
  cookieStore.set("access_token", result.accessToken, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/",
  });
  cookieStore.set("refresh_token", result.refreshToken, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/",
  });

  return success({ role: result.role, nextStep: result.nextStep });
});