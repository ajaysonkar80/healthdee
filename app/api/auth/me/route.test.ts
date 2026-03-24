import { vi } from "vitest";

vi.mock("@/server/http/route-helpers", () => ({
  withErrorHandling: (handler: any) => handler,
  withAuth: (handler: any) => {
    return async (req: any) => {
      req.auth = {
        userId: "1",
        role: "patient",
      };
      return handler(req);
    };
  },
}));

import { describe, it, expect } from "vitest";
import { createRequest } from "@/tests/utils/testRequest";
import { GET } from "./route";

describe("GET /api/auth/me", () => {
  it("returns current user", async () => {
    const res = await GET(createRequest({ method: "GET" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    
  });
});