import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import { registerSchema } from "@/server/validators/auth";
import type { NextRequest } from "next/server";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return error({
      message: "Invalid registration payload",
      status: 422,
      code: "VALIDATION_ERROR",
    });
  }

  const data = parsed.data;

  switch (data.type) {
    /* ===============================================
       EMAIL SIGNUP (unchanged)
    =============================================== */
    case "email":
      return success(
        await authService.registerWithEmail(data)
      );

    /* ===============================================
       PHONE SIGNUP - STEP 1 (Send OTP only)
       Does NOT create user yet
    =============================================== */
    case "phone":
      return success(
        await authService.startPhoneSignup(data)
      );

    default: {
      const _exhaustive: never = data;
      throw _exhaustive;
    }
  }
});
