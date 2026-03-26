import { vi } from "vitest";

/* ================= MOCK service ================= */
vi.mock("@/server/services/auth.service", () => ({
  authService: {
    registerWithEmail: vi.fn(),
    startPhoneSignup: vi.fn(),
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
describe("POST /api/auth/register", () => {
  it("returns 200 for email signup", async () => {
    (authService.registerWithEmail as any).mockResolvedValue({
      message: "User registered",
    });

    const req = createRequest({
      body: {
        type: "email",
        email: "test@test.com",
        password: "password123", // matches schema (min 8)
      },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(authService.registerWithEmail).toHaveBeenCalled();
  });

  it("returns 200 for phone signup", async () => {
    (authService.startPhoneSignup as any).mockResolvedValue({
      message: "OTP sent",
    });

    const req = createRequest({
      body: {
        type: "phone",
        phone: "9999999999", // min 10 digits
      },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(authService.startPhoneSignup).toHaveBeenCalled();
  });

  it("returns 422 for invalid payload", async () => {
    const req = createRequest({
      body: {
        email: "test@test.com", // ❌ missing type
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
  });

  it("returns 400 when service throws (email)", async () => {
    (authService.registerWithEmail as any).mockRejectedValue(
      new Error("Email already exists")
    );

    const req = createRequest({
      body: {
        type: "email",
        email: "test@test.com",
        password: "password123",
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});