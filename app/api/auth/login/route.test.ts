import { vi } from "vitest";

/* ================= MOCK next/headers ================= */
vi.mock("next/headers", () => ({
  cookies: async () => ({
    set: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  }),
}));

/* ================= MOCK auth service ================= */
vi.mock("@/server/services/auth.service", () => ({
  authService: {
    loginWithEmail: vi.fn(),
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
          JSON.stringify({ message: err.message }),
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
describe("POST /api/auth/login", () => {
  it("returns 200 with tokens on success", async () => {
    (authService.loginWithEmail as any).mockResolvedValue({
      user: {
        id: "1",
        role: "patient",
        name: "Test User",
      },
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });

    const req = createRequest({
      body: {
        type: "email",
        email: "test@test.com",
        password: "Password@123", // ✅ valid strong password
      },
    });

    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    
  });

  it("returns 400 when credentials are invalid", async () => {
    (authService.loginWithEmail as any).mockRejectedValue(
      new Error("Invalid credentials")
    );

    const req = createRequest({
      body: {
        type: "email",
        email: "wrong@test.com",
        password: "WrongPass@123", // ✅ still valid format
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});