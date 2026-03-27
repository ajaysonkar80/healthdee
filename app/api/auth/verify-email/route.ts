import { withErrorHandling } from "@/server/http/route-helpers";
import { error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import type { NextRequest } from "next/server";

/**
 * GET /api/auth/verify-email
 * This route is triggered when a user clicks the link in their verification email.
 */
export const GET = withErrorHandling(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // 1. Validate query parameters
  if (!token || !email) {
    return error({
      message: "Missing verification token or email address.",
      status: 400,
    });
  }

  try {
    await authService.verifyEmail(email, token);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return Response.redirect(`${baseUrl}/login?verified=true`);
  } catch (err) {
    // ADD THIS LOG TO SEE THE ACTUAL ERROR IN TERMINAL
    console.error("❌ VERIFICATION ROUTE FAILURE:", err);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return Response.redirect(`${baseUrl}/login?error=verification_failed`);
  }
});