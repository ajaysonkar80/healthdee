import { withErrorHandling } from "@/server/http/route-helpers";
import { success, error } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();

  if (!body?.refreshToken || typeof body.refreshToken !== "string") {
    return error({
      message: "Refresh token is required",
      status: 422,
      code: "VALIDATION_ERROR",
    });
  }

  const result = await authService.refresh(body.refreshToken);

  return success(result);
});
