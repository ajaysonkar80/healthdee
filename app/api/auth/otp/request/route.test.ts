import { vi } from "vitest";

/* ================= MOCK service ================= */
vi.mock("@/server/services/auth.service", () => ({
  authService: {
    requestOtp: vi.fn(),
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
describe("POST /api/auth/otp/request", () => {
  it("returns 200 when OTP is sent", async () => {
    (authService.requestOtp as any).mockResolvedValue({
      message: "OTP sent",
    });

    const req = createRequest({
      body: {
        phone: "+919999999999",
      },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
  });

  it("returns 422 when phone is missing", async () => {
    const req = createRequest({
      body: {},
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
  });

  it("returns 422 for invalid phone format", async () => {
    const req = createRequest({
      body: {
        phone: "123", // invalid
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
  });

  it("returns 400 when service throws", async () => {
    (authService.requestOtp as any).mockRejectedValue(
      new Error("Failed to send OTP")
    );

    const req = createRequest({
      body: {
        phone: "+919999999999",
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});