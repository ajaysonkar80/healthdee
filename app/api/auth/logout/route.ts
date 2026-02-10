import { withErrorHandling, withAuth } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { authService } from "@/server/services/auth.service";

export const POST = withErrorHandling(
  withAuth(async () => {
    const result = await authService.logout();
    return success(result);
  })
);
