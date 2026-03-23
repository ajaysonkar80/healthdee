import { describe, it, expect } from "vitest";
import {
  strongPassword,
  phoneSchema,
  emailSchema,
  emailSignupSchema,
  registerSchema,
  loginSchema,
  otpVerifySchema,
  resetPasswordSchema,
} from "./auth";

describe("Auth Validators", () => {
  describe("Shared Primitives", () => {
    it("should validate a strong password", () => {
      expect(strongPassword.safeParse("Password123!").success).toBe(true);
      // Fails: No uppercase
      expect(strongPassword.safeParse("password123!").success).toBe(false);
      // Fails: No special char
      expect(strongPassword.safeParse("Password123").success).toBe(false);
      // Fails: Too short
      expect(strongPassword.safeParse("Pas1!").success).toBe(false);
    });

    it("should validate phone numbers", () => {
      expect(phoneSchema.safeParse("1234567890").success).toBe(true);
      expect(phoneSchema.safeParse("12345").success).toBe(false); // Too short
      expect(phoneSchema.safeParse("12345678901").success).toBe(false); // Too long
      expect(phoneSchema.safeParse("abcdefghij").success).toBe(false); // Not digits
    });

    it("should validate and normalize emails", () => {
      const result = emailSchema.safeParse("  User@Example.COM  ");
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe("user@example.com"); // Trimmed and lowercased
      }
      expect(emailSchema.safeParse("invalid-email").success).toBe(false);
    });
  });

  describe("Signup Schemas", () => {
    it("should validate registerSchema discriminated union", () => {
      // Email path
      expect(registerSchema.safeParse({
        type: "email",
        email: "test@test.com",
        password: "password123"
      }).success).toBe(true);

      // Phone path
      expect(registerSchema.safeParse({
        type: "phone",
        phone: "1234567890"
      }).success).toBe(true);

      // Invalid type
      expect(registerSchema.safeParse({
        type: "invalid",
        email: "test@test.com"
      }).success).toBe(false);
    });

    it("should validate emailSignupSchema and password matching", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        password: "StrongPassword123!",
        confirmPassword: "StrongPassword123!",
      };

      expect(emailSignupSchema.safeParse(validData).success).toBe(true);

      // Fails: Password mismatch
      expect(emailSignupSchema.safeParse({
        ...validData,
        confirmPassword: "DifferentPassword123!"
      }).success).toBe(false);

      // Fails: Name too short
      expect(emailSignupSchema.safeParse({
        ...validData,
        name: "A"
      }).success).toBe(false);
    });
  });

  describe("Login Schemas", () => {
    it("should validate loginSchema union", () => {
      // Valid Email Login
      expect(loginSchema.safeParse({
        type: "email",
        email: "test@test.com",
        password: "any-password"
      }).success).toBe(true);

      // Valid Phone Login
      expect(loginSchema.safeParse({
        type: "phone",
        phone: "1234567890",
        otp: "1234"
      }).success).toBe(true);
    });
  });

  describe("OTP and Reset Password", () => {
    it("should validate 4-digit OTP", () => {
      expect(otpVerifySchema.safeParse({ otp: "1234" }).success).toBe(true);
      expect(otpVerifySchema.safeParse({ otp: "123" }).success).toBe(false);
      expect(otpVerifySchema.safeParse({ otp: "12345" }).success).toBe(false);
      expect(otpVerifySchema.safeParse({ otp: "abcd" }).success).toBe(false);
    });

    it("should validate resetPasswordSchema", () => {
      const validReset = {
        otp: "1234",
        password: "NewStrongPass1!",
        confirmPassword: "NewStrongPass1!",
      };

      expect(resetPasswordSchema.safeParse(validReset).success).toBe(true);

      // Fails: Password Mismatch
      const mismatch = resetPasswordSchema.safeParse({
        ...validReset,
        confirmPassword: "WrongPassword1!"
      });
      expect(mismatch.success).toBe(false);
      if (!mismatch.success) {
        expect(mismatch.error.errors[0].message).toBe("Passwords do not match");
      }
    });
  });
});