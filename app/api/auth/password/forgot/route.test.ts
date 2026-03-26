import { vi } from "vitest";

/* ================= MOCK service ================= */
vi.mock("@/server/services/auth.service", () => ({
  authService: {
    requestPasswordReset: vi.fn(),
  },
}));

/* ================= MOCK route helpers ================= */
vi.mock("@/server/http/route-helpers", () => ({
  withErrorHandling: (handler: any) => {
    return async (req: any, context?: any) => {
      try {
        return await handler(req, context);
      } catch (err: any) {
        return new Response(
          JSON.stringify({
            success: false,
            error: { message: err.message },
          }),
          { status: err.statusCode || 400 }
        );
      }
    };
  },
}));

/* ================= IMPORTS ================= */
import { describe, it, expect } from "vitest";
import { createRequest } from "@/tests/utils/testRequest";
import { POST } from "./route";
import { authService } from "@/server/services/auth.service";

/* ================= TESTS ================= */
describe("POST /api/auth/password/forgot", () => {
  it("returns 200 when email is valid", async () => {
    (authService.requestPasswordReset as any).mockResolvedValue(true);

    const req = createRequest({
      body: {
        email: "test@test.com",
      },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.message).toBe("OTP sent to email");
  });

  it("returns 422 when email is missing", async () => {
    const req = createRequest({
      body: {},
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
  });

  it("returns 400 when service throws", async () => {
    (authService.requestPasswordReset as any).mockRejectedValue(
      new Error("Failed to send email")
    );

    const req = createRequest({
      body: {
        email: "test@test.com",
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});