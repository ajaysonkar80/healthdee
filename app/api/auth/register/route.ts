import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import { registerSchema } from "@/lib/validators";
import type { NextRequest } from "next/server";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();

  // FIX: Use .safeParse() (lowercase 's') to return a result object
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
    case "email":
      // 'data' now includes 'name' and 'confirmPassword'
      return success(
        await authService.registerWithEmail(data)
      );

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