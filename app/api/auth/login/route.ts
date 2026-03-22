// app/api/auth/login/route.ts
import type { NextRequest } from "next/server";
import { withErrorHandling } from "@/server/http/route-helpers";
import { success }           from "@/server/http/response";
import { authService }       from "@/server/services/auth.service";
import { loginRateLimit }    from "@/server/middleware/rate-limit";
import { cookies }           from "next/headers";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const limited = await loginRateLimit(req);
  if (limited) return limited;

  const body   = await req.json();
  const result = await authService.loginWithEmail(body);

  const cookieStore = await cookies();

  // Incomplete signup — set onboarding token and redirect
  if (result.nextStep === "verify_email" || result.nextStep === "select_role") {
    cookieStore.set("onboarding_token", result.onboardingToken, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      path:     "/",
      maxAge:   60 * 30,
    });
    return success({ nextStep: result.nextStep });
  }

  // Full login — set access + refresh tokens
  cookieStore.set("access_token", result.accessToken, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
  });
  cookieStore.set("refresh_token", result.refreshToken, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
  });

  return success({ user: result.user, nextStep: result.nextStep });
});