/**
 * Unit tests for server/validators/audit.ts
 *
 * Location: server/validators/audit.test.ts
 */

import { describe, it, expect } from "vitest";
import { auditLogCreateSchema } from "@/server/validators/audit";

// ── Helpers ───────────────────────────────────────────────────────────────────
const validPayload = () => ({
  action: "user.login",
  targetType: "user",
  targetId: "abc123",
});

// ── auditLogCreateSchema ──────────────────────────────────────────────────────
describe("auditLogCreateSchema", () => {

  // ── Happy path ──────────────────────────────────────────────────────────────
  describe("valid inputs", () => {
    it("accepts a minimal valid payload (no metadata)", () => {
      const result = auditLogCreateSchema.safeParse(validPayload());
      expect(result.success).toBe(true);
    });

    it("accepts a payload with an empty metadata object", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        metadata: {},
      });
      expect(result.success).toBe(true);
    });

    it("accepts metadata with mixed value types", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        metadata: { ip: "127.0.0.1", attempts: 3, success: true, extra: null },
      });
      expect(result.success).toBe(true);
    });

    it("accepts metadata with nested objects", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        metadata: { context: { browser: "Chrome", os: "Linux" } },
      });
      expect(result.success).toBe(true);
    });

    it("strips unknown top-level fields (Zod default strip behaviour)", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        unknownField: "should be stripped",
      });
      expect(result.success).toBe(true);
      expect((result.data as Record<string, unknown>)?.unknownField).toBeUndefined();
    });
  });

  // ── action ──────────────────────────────────────────────────────────────────
  describe("action", () => {
    it("accepts a 2-character action (minimum boundary)", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        action: "ok",
      });
      expect(result.success).toBe(true);
    });

    it("rejects a 1-character action (below minimum)", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        action: "x",
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("action");
    });

    it("rejects an empty action string", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        action: "",
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("action");
    });

    it("rejects a missing action field", () => {
      const { action: _, ...rest } = validPayload();
      const result = auditLogCreateSchema.safeParse(rest);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("action");
    });

    it("rejects a numeric action", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        action: 42,
      });
      expect(result.success).toBe(false);
    });
  });

  // ── targetType ──────────────────────────────────────────────────────────────
  describe("targetType", () => {
    it("accepts a 2-character targetType (minimum boundary)", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        targetType: "db",
      });
      expect(result.success).toBe(true);
    });

    it("rejects a 1-character targetType (below minimum)", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        targetType: "u",
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("targetType");
    });

    it("rejects an empty targetType string", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        targetType: "",
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("targetType");
    });

    it("rejects a missing targetType field", () => {
      const { targetType: _, ...rest } = validPayload();
      const result = auditLogCreateSchema.safeParse(rest);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("targetType");
    });

    it("rejects a numeric targetType", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        targetType: 99,
      });
      expect(result.success).toBe(false);
    });
  });

  // ── targetId ────────────────────────────────────────────────────────────────
  describe("targetId", () => {
    it("accepts a 1-character targetId (minimum boundary)", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        targetId: "1",
      });
      expect(result.success).toBe(true);
    });

    it("accepts a UUID-shaped targetId", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        targetId: "550e8400-e29b-41d4-a716-446655440000",
      });
      expect(result.success).toBe(true);
    });

    it("rejects an empty targetId string", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        targetId: "",
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("targetId");
    });

    it("rejects a missing targetId field", () => {
      const { targetId: _, ...rest } = validPayload();
      const result = auditLogCreateSchema.safeParse(rest);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("targetId");
    });

    it("rejects a numeric targetId", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        targetId: 123,
      });
      expect(result.success).toBe(false);
    });
  });

  // ── metadata (optional) ─────────────────────────────────────────────────────
  describe("metadata", () => {
    it("is optional — omitting it still passes", () => {
      const result = auditLogCreateSchema.safeParse(validPayload());
      expect(result.success).toBe(true);
      expect(result.data?.metadata).toBeUndefined();
    });

    it("rejects metadata as a plain string", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        metadata: "not-an-object",
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("metadata");
    });

    it("rejects metadata as an array", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        metadata: ["item1", "item2"],
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("metadata");
    });

    it("rejects metadata as a number", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        metadata: 42,
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("metadata");
    });

    it("rejects metadata as null", () => {
      const result = auditLogCreateSchema.safeParse({
        ...validPayload(),
        metadata: null,
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("metadata");
    });
  });
});