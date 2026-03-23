// Location: server/utils/jwt.test.ts

import { vi, describe, it, expect, afterEach } from "vitest";

// Must be hoisted — jwt.ts throws at module load if secrets are missing
vi.hoisted(() => {
  process.env.JWT_SECRET = "test-access-secret-for-vitest-32ch";
  process.env.JWT_REFRESH_SECRET = "test-refresh-secret-for-vitest-32ch";
});

import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./jwt";

afterEach(() => {
  vi.useRealTimers();
});

const validClaims = { sub: "user-123" };

// ---------------------------------------------------------------------------
// signAccessToken
// ---------------------------------------------------------------------------
describe("signAccessToken", () => {
  it("returns a 3-part JWT string", () => {
    const token = signAccessToken(validClaims);
    expect(token.split(".")).toHaveLength(3);
  });

  it("throws when sub is empty", () => {
    expect(() => signAccessToken({ sub: "" })).toThrow(
      "Access token requires sub"
    );
  });

  it("embeds extra claims in the payload", () => {
    const token = signAccessToken({ sub: "user-123", role: "admin" });
    const payload = verifyAccessToken(token);
    expect(payload.role).toBe("admin");
  });

  it("two tokens for the same user are not identical (different iat)", () => {
    vi.useFakeTimers();
    const t1 = signAccessToken(validClaims);
    vi.advanceTimersByTime(1000);
    const t2 = signAccessToken(validClaims);
    expect(t1).not.toBe(t2);
  });
});

// ---------------------------------------------------------------------------
// verifyAccessToken
// ---------------------------------------------------------------------------
describe("verifyAccessToken", () => {
  it("returns payload with correct sub", () => {
    const token = signAccessToken(validClaims);
    const payload = verifyAccessToken(token);
    expect(payload.sub).toBe("user-123");
  });

  it("payload contains iat and exp", () => {
    const token = signAccessToken(validClaims);
    const payload = verifyAccessToken(token);
    expect(typeof payload.iat).toBe("number");
    expect(typeof payload.exp).toBe("number");
    expect(payload.exp).toBeGreaterThan(payload.iat);
  });

  it("throws on a tampered signature", () => {
    const token = signAccessToken(validClaims);
    const tampered = token.slice(0, -5) + "XXXXX";
    expect(() => verifyAccessToken(tampered)).toThrow("Invalid token signature");
  });

  it("throws on a malformed token (wrong number of parts)", () => {
    expect(() => verifyAccessToken("not.a.valid.jwt.here")).toThrow(
      "Invalid token format"
    );
  });

  it("throws on a completely garbage string", () => {
    expect(() => verifyAccessToken("garbage")).toThrow();
  });

  it("throws when access token has expired (after 15 min)", () => {
    vi.useFakeTimers();
    const token = signAccessToken(validClaims);
    vi.advanceTimersByTime(16 * 60 * 1000); // 16 minutes
    expect(() => verifyAccessToken(token)).toThrow("Token expired");
  });

  it("is still valid just before expiry (14 min 59 s)", () => {
    vi.useFakeTimers();
    const token = signAccessToken(validClaims);
    vi.advanceTimersByTime(14 * 60 * 1000 + 59 * 1000);
    expect(() => verifyAccessToken(token)).not.toThrow();
  });

  it("access token is rejected by verifyRefreshToken (different secret)", () => {
    const token = signAccessToken(validClaims);
    expect(() => verifyRefreshToken(token)).toThrow("Invalid token signature");
  });
});

// ---------------------------------------------------------------------------
// signRefreshToken / verifyRefreshToken
// ---------------------------------------------------------------------------
describe("signRefreshToken", () => {
  it("returns a 3-part JWT string", () => {
    const token = signRefreshToken(validClaims);
    expect(token.split(".")).toHaveLength(3);
  });

  it("throws when sub is empty", () => {
    expect(() => signRefreshToken({ sub: "" })).toThrow(
      "Refresh token requires sub"
    );
  });
});

describe("verifyRefreshToken", () => {
  it("returns payload with correct sub", () => {
    const token = signRefreshToken(validClaims);
    const payload = verifyRefreshToken(token);
    expect(payload.sub).toBe("user-123");
  });

  it("throws when refresh token has expired (after 30 days)", () => {
    vi.useFakeTimers();
    const token = signRefreshToken(validClaims);
    vi.advanceTimersByTime(31 * 24 * 60 * 60 * 1000); // 31 days
    expect(() => verifyRefreshToken(token)).toThrow("Token expired");
  });

  it("is still valid just before 30-day expiry", () => {
    vi.useFakeTimers();
    const token = signRefreshToken(validClaims);
    vi.advanceTimersByTime(29 * 24 * 60 * 60 * 1000);
    expect(() => verifyRefreshToken(token)).not.toThrow();
  });

  it("refresh token is rejected by verifyAccessToken (different secret)", () => {
    const token = signRefreshToken(validClaims);
    expect(() => verifyAccessToken(token)).toThrow("Invalid token signature");
  });

  it("embeds extra claims correctly", () => {
    const token = signRefreshToken({ sub: "user-456", sessionId: "sess-abc" });
    const payload = verifyRefreshToken(token);
    expect(payload.sessionId).toBe("sess-abc");
  });
});