/**
 * Unit tests for server/validators/appointment.ts
 *
 * Location: server/validators/appointment.test.ts
 * Pattern:  co-located validator test (matches lib/utils.test.ts,
 *           server/utils/logger_test.ts, etc.)
 */

import { describe, it, expect, vi } from "vitest";
import { z } from "zod";

// ── Mock @/db/schema before importing the validators ─────────────────────────
// db/schema.ts is the real source; adjust the enum values to match your actual
// AppointmentStatusSchema definition if it differs.
vi.mock("@/db/schema", () => ({
  AppointmentStatusSchema: z.enum([
    "pending",
    "confirmed",
    "cancelled",
    "completed",
  ]),
}));

import {
  appointmentCreateSchema,
  appointmentStatusUpdateSchema,
} from "@/server/validators/appointment";

// ── Helpers ───────────────────────────────────────────────────────────────────
const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";
const futureTs = () => Math.floor(Date.now() / 1000) + 3600; // +1 hr
const pastTs   = () => Math.floor(Date.now() / 1000) - 3600; // -1 hr

// ── appointmentCreateSchema ───────────────────────────────────────────────────
describe("appointmentCreateSchema", () => {

  describe("doctorId", () => {
    it("accepts a valid UUID", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: VALID_UUID,
        scheduledAt: futureTs(),
      });
      expect(result.success).toBe(true);
    });

    it("rejects a non-UUID string", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: "not-a-uuid",
        scheduledAt: futureTs(),
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("doctorId");
    });

    it("rejects an empty string", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: "",
        scheduledAt: futureTs(),
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("doctorId");
    });

    it("rejects a missing doctorId", () => {
      const result = appointmentCreateSchema.safeParse({
        scheduledAt: futureTs(),
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("doctorId");
    });

    it("rejects a numeric doctorId", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: 12345,
        scheduledAt: futureTs(),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("scheduledAt", () => {
    it("accepts a future Unix timestamp", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: VALID_UUID,
        scheduledAt: futureTs(),
      });
      expect(result.success).toBe(true);
    });

    it("rejects a past Unix timestamp with the correct message", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: VALID_UUID,
        scheduledAt: pastTs(),
      });
      expect(result.success).toBe(false);
      const issue = result.error?.issues[0];
      expect(issue?.path).toContain("scheduledAt");
      expect(issue?.message).toBe("Appointment must be scheduled in the future");
    });

    it("rejects a timestamp equal to now (not strictly future)", () => {
      const now = Math.floor(Date.now() / 1000);
      const result = appointmentCreateSchema.safeParse({
        doctorId: VALID_UUID,
        scheduledAt: now,
      });
      expect(result.success).toBe(false);
    });

    it("rejects a float timestamp", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: VALID_UUID,
        scheduledAt: futureTs() + 0.5,
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("scheduledAt");
    });

    it("rejects a string timestamp", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: VALID_UUID,
        scheduledAt: String(futureTs()),
      });
      expect(result.success).toBe(false);
    });

    it("rejects a missing scheduledAt", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: VALID_UUID,
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toContain("scheduledAt");
    });
  });

  describe("extra fields", () => {
    it("strips unknown fields (Zod default strip behaviour)", () => {
      const result = appointmentCreateSchema.safeParse({
        doctorId: VALID_UUID,
        scheduledAt: futureTs(),
        unknownField: "should be stripped",
      });
      expect(result.success).toBe(true);
      expect((result.data as Record<string, unknown>)?.unknownField).toBeUndefined();
    });
  });
});

// ── appointmentStatusUpdateSchema ─────────────────────────────────────────────
describe("appointmentStatusUpdateSchema", () => {
  const VALID_STATUSES = ["pending", "confirmed", "cancelled", "completed"];

  it.each(VALID_STATUSES)('accepts valid status "%s"', (status) => {
    const result = appointmentStatusUpdateSchema.safeParse({ status });
    expect(result.success).toBe(true);
    expect(result.data?.status).toBe(status);
  });

  it("rejects an invalid status string", () => {
    const result = appointmentStatusUpdateSchema.safeParse({
      status: "unknown_status",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("status");
  });

  it("rejects a missing status field", () => {
    const result = appointmentStatusUpdateSchema.safeParse({});
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("status");
  });

  it("rejects a numeric status", () => {
    const result = appointmentStatusUpdateSchema.safeParse({ status: 1 });
    expect(result.success).toBe(false);
  });

  it("rejects null as status", () => {
    const result = appointmentStatusUpdateSchema.safeParse({ status: null });
    expect(result.success).toBe(false);
  });
});