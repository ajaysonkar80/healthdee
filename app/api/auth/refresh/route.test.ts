import { vi } from "vitest";

/* ================= MOCK cookies ================= */
const cookieStoreMock = {
  get: vi.fn(),
  set: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: async () => cookieStoreMock,
}));

/* ================= MOCK service ================= */
vi.mock("@/server/services/auth.service", () => ({
  authService: {
    refresh: vi.fn(),
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
import { describe, it, expect, beforeEach } from "vitest";
import { POST } from "./route";
import { authService } from "@/server/services/auth.service";

/* ================= RESET MOCKS ================= */
beforeEach(() => {
  vi.clearAllMocks();
});

/* ================= TESTS ================= */
describe("POST /api/auth/refresh", () => {
  it("returns 200 and sets cookies on success", async () => {
    cookieStoreMock.get.mockReturnValue({
      value: "old-refresh-token",
    });

    (authService.refresh as any).mockResolvedValue({
      user: { id: "1", role: "patient" },
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token",
    });

    const res = await POST({} as any); // ✅ FIXED
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.id).toBe("1");

    // ✅ cookies assertions
    expect(cookieStoreMock.set).toHaveBeenCalledWith(
      "access_token",
      "new-access-token",
      expect.any(Object)
    );

    expect(cookieStoreMock.set).toHaveBeenCalledWith(
      "refresh_token",
      "new-refresh-token",
      expect.any(Object)
    );
  });

  it("returns 401 when refresh token is missing", async () => {
    cookieStoreMock.get.mockReturnValue(undefined);

    const res = await POST({} as any); // ✅ FIXED

    expect(res.status).toBe(401);
  });

  it("returns 400 when service throws", async () => {
    cookieStoreMock.get.mockReturnValue({
      value: "old-refresh-token",
    });

    (authService.refresh as any).mockRejectedValue(
      new Error("Invalid token")
    );

    const res = await POST({} as any); // ✅ FIXED

    expect(res.status).toBe(400);
  });
});