import { vi } from "vitest";

/* ================= MOCK service ================= */
vi.mock("@/server/services/auth.service", () => ({
  authService: {
    verifyOtp: vi.fn(),
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
describe("POST /api/auth/otp/verify", () => {
  it("returns 200 when OTP is verified", async () => {
    (authService.verifyOtp as any).mockResolvedValue({
      message: "OTP verified",
    });

    const req = createRequest({
      body: {
        phone: "+919999999999",
        otp: "1234",
      },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
  });

  it("returns 422 when phone or otp is missing", async () => {
    const req = createRequest({
      body: {
        phone: "+919999999999",
        // missing otp
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
  });

  it("returns 422 for invalid phone format", async () => {
    const req = createRequest({
      body: {
        phone: "123", // invalid
        otp: "1234",
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
  });

  it("returns 422 for invalid OTP format", async () => {
    const req = createRequest({
      body: {
        phone: "+919999999999",
        otp: "12", // invalid (not 4 digits)
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
  });

  it("returns 400 when service throws", async () => {
    (authService.verifyOtp as any).mockRejectedValue(
      new Error("Invalid OTP")
    );

    const req = createRequest({
      body: {
        phone: "+919999999999",
        otp: "1234",
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});