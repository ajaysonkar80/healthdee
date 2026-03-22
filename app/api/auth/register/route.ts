// app/api/auth/register/route.ts
import type { NextRequest } from "next/server";
import { withErrorHandling } from "@/server/http/route-helpers";
import { success }           from "@/server/http/response";
import { authService }       from "@/server/services/auth.service";
import { emailSignupSchema } from "@/server/validators/auth";
import { signupRateLimit }   from "@/server/middleware/rate-limit";
import { cookies }           from "next/headers";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const limited = await signupRateLimit(req);
  if (limited) return limited;

  const body   = await req.json();
  const parsed = emailSignupSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
    const { error } = await import("@/server/http/response");
    return error({ message: firstError, status: 422, code: "VALIDATION_ERROR" });
  }

  const result = await authService.registerWithEmail(parsed.data);

  // Set onboarding token as HttpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set("onboarding_token", result.onboardingToken, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
    maxAge:   60 * 30, // 30 min
  });

  return success({ nextStep: result.nextStep });
});