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
    logout: vi.fn(),
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
          JSON.stringify({ success: false, error: { message: err.message } }),
          { status: err.statusCode || 400 }
        );
      }
    };
  },
  withAuth: (fn: any) => fn,
}));

/* ================= IMPORTS ================= */
import { describe, it, expect } from "vitest";
import { createRequest } from "@/tests/utils/testRequest";
import { POST } from "./route";
import { authService } from "@/server/services/auth.service";

/* ================= TESTS ================= */
describe("POST /api/auth/logout", () => {
  it("returns 200 on success", async () => {
    (authService.logout as any).mockResolvedValue(true);

    const res = await POST(createRequest({}));

    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
  });

  
});