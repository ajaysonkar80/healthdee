import { describe, it, expect } from "vitest";
import { userCreateSchema, userStatusUpdateSchema } from "./user";

describe("User Validators", () => {
  /**
   * Verified Enums:
   * Roles: "patient", "doctor", "admin"
   * Statuses: "active", "deactivated", "deleted"
   */

  describe("userCreateSchema", () => {
    it("should pass with all valid user roles", () => {
      // Testing the full allowed set
      expect(userCreateSchema.safeParse({ role: "patient" }).success).toBe(true);
      expect(userCreateSchema.safeParse({ role: "doctor" }).success).toBe(true);
      expect(userCreateSchema.safeParse({ role: "admin" }).success).toBe(true);
    });

    it("should fail with an invalid role string", () => {
      // Testing common false positives
      expect(userCreateSchema.safeParse({ role: "super-user" }).success).toBe(false);
      expect(userCreateSchema.safeParse({ role: "nurse" }).success).toBe(false);
    });

    it("should fail if the role field is missing or null", () => {
      expect(userCreateSchema.safeParse({}).success).toBe(false);
      expect(userCreateSchema.safeParse({ role: null }).success).toBe(false);
    });
  });

  describe("userStatusUpdateSchema", () => {
    it("should pass with all valid user statuses", () => {
      // Testing the full allowed set
      expect(userStatusUpdateSchema.safeParse({ status: "active" }).success).toBe(true);
      expect(userStatusUpdateSchema.safeParse({ status: "deactivated" }).success).toBe(true);
      expect(userStatusUpdateSchema.safeParse({ status: "deleted" }).success).toBe(true);
    });

    it("should fail with retired or incorrect status strings", () => {
      // These might have been in earlier drafts but are now invalid
      expect(userStatusUpdateSchema.safeParse({ status: "suspended" }).success).toBe(false);
      expect(userStatusUpdateSchema.safeParse({ status: "inactive" }).success).toBe(false);
      expect(userStatusUpdateSchema.safeParse({ status: "pending" }).success).toBe(false);
    });

    it("should fail if the status field is missing", () => {
      expect(userStatusUpdateSchema.safeParse({}).success).toBe(false);
    });
  });
});