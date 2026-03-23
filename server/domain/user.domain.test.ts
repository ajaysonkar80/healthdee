import { describe, it, expect } from "vitest";
import { 
  assertValidUserStatusTransition, 
  assertUserRoleImmutable, 
  assertUserNotDeleted, 
  UserDomainError 
} from "./user.domain";
import type { UserRole, UserStatus } from "@/db/schema";

describe("User Domain Logic", () => {

  describe("assertValidUserStatusTransition", () => {
    it("should allow transition to the same status", () => {
      const status: UserStatus = "active";
      expect(() => assertValidUserStatusTransition(status, status)).not.toThrow();
    });

    it("should allow valid transitions", () => {
      // active -> deactivated
      expect(() => assertValidUserStatusTransition("active", "deactivated")).not.toThrow();
      // deactivated -> active
      expect(() => assertValidUserStatusTransition("deactivated", "active")).not.toThrow();
      // active -> deleted
      expect(() => assertValidUserStatusTransition("active", "deleted")).not.toThrow();
    });

    it("should throw UserDomainError for invalid transitions", () => {
      // deleted is a terminal state; cannot move to active
      expect(() => assertValidUserStatusTransition("deleted", "active"))
        .toThrowError(UserDomainError);
      
      expect(() => assertValidUserStatusTransition("deleted", "active"))
        .toThrowError(/Invalid user status transition/);
    });
  });

  describe("assertUserRoleImmutable", () => {
    it("should allow if current and next roles are identical", () => {
      const role: UserRole = "patient";
      expect(() => assertUserRoleImmutable(role, role)).not.toThrow();
    });

    it("should throw UserDomainError if roles differ", () => {
      const current: UserRole = "patient";
      const next: UserRole = "doctor";
      
      expect(() => assertUserRoleImmutable(current, next))
        .toThrowError("User role cannot be changed once assigned");
    });
  });

  describe("assertUserNotDeleted", () => {
    it("should allow operations on active or deactivated users", () => {
      expect(() => assertUserNotDeleted("active")).not.toThrow();
      expect(() => assertUserNotDeleted("deactivated")).not.toThrow();
    });

    it("should throw UserDomainError if user is deleted", () => {
      expect(() => assertUserNotDeleted("deleted"))
        .toThrowError("Operation not allowed on deleted user");
    });
  });

  describe("UserDomainError", () => {
    it("should be an instance of Error with correct name", () => {
      const error = new UserDomainError("custom error");
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe("UserDomainError");
      expect(error.message).toBe("custom error");
    });
  });
});