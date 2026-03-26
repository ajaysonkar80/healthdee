import { vi } from "vitest";

/* ================= MOCK service ================= */
vi.mock("@/server/services/auth.service", () => ({
  authService: {
    resetPassword: vi.fn(),
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
describe("POST /api/auth/password/reset", () => {
  it("returns 200 when input is valid", async () => {
    (authService.resetPassword as any).mockResolvedValue(true);

    const req = createRequest({
      body: {
        email: "test@test.com",
        otp: "1234",
        password: "NewPassword@123",
      },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.message).toBe("Password reset successful");
  });

  it("returns 422 when fields are missing", async () => {
    const req = createRequest({
      body: {
        email: "test@test.com",
        // missing otp + password
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
  });

  it("returns 422 when types are invalid", async () => {
    const req = createRequest({
      body: {
        email: "test@test.com",
        otp: 1234, // ❌ should be string
        password: "password",
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
  });

  it("returns 400 when service throws", async () => {
    (authService.resetPassword as any).mockRejectedValue(
      new Error("Invalid OTP")
    );

    const req = createRequest({
      body: {
        email: "test@test.com",
        otp: "1234",
        password: "NewPassword@123",
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});