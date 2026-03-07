import type { NextRequest } from "next/server";
import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";

type RequestBody = {
  phone?: string;
};

export const POST = withErrorHandling(async (req: NextRequest) => {
  let body: RequestBody;

  try {
    body = await req.json();
  } catch {
    return error({
      message: "Invalid JSON body",
      status: 400,
      code: "INVALID_JSON",
    });
  }

  const phone = body?.phone?.trim();

  if (!phone || typeof phone !== "string") {
    return error({
      message: "Phone number is required",
      status: 422,
      code: "VALIDATION_ERROR",
    });
  }

  // Basic phone format validation (E.164 friendly)
  const phoneRegex = /^\+?[1-9]\d{7,14}$/;

  if (!phoneRegex.test(phone)) {
    return error({
      message: "Invalid phone number format",
      status: 422,
      code: "INVALID_PHONE_FORMAT",
    });
  }

  const result = await authService.requestOtp(phone);

  return success(result);
});
