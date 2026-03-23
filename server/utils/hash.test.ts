// Location: server/utils/hash.test.ts

import { describe, it, expect } from "vitest";
import { hashToken } from "./hash";

describe("hashToken", () => {
  it("returns a 64-character lowercase hex string", () => {
    const result = hashToken("some-token");
    expect(result).toMatch(/^[a-f0-9]{64}$/);
  });

  it("is deterministic — same input always gives the same hash", () => {
    expect(hashToken("abc123")).toBe(hashToken("abc123"));
  });

  it("different inputs produce different hashes", () => {
    expect(hashToken("token-a")).not.toBe(hashToken("token-b"));
  });

  it("handles an empty string without throwing", () => {
    expect(() => hashToken("")).not.toThrow();
    expect(hashToken("")).toMatch(/^[a-f0-9]{64}$/);
  });

  it("produces the correct SHA-256 for a known value", () => {
    // sha256("hello") is a well-known constant
    expect(hashToken("hello")).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
  });

  it("handles long tokens", () => {
    const long = "x".repeat(1000);
    expect(hashToken(long)).toMatch(/^[a-f0-9]{64}$/);
  });

  it("is sensitive to a single character difference", () => {
    expect(hashToken("reset-token-1")).not.toBe(hashToken("reset-token-2"));
  });
});