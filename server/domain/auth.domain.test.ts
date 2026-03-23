import { describe, it, expect } from "vitest";
import { 
  assertHasAtLeastOneCredential, 
  assertEmailVerificationAllowed, 
  assertWhatsappVerificationAllowed, 
  assertLoginAllowed,
  AuthDomainError,
  AuthCredentialsState
} from "./auth.domain";

describe("Auth Domain Logic", () => {

  describe("assertHasAtLeastOneCredential", () => {
    it("should pass if email is provided", () => {
      const creds: AuthCredentialsState = { email: "test@example.com" };
      expect(() => assertHasAtLeastOneCredential(creds)).not.toThrow();
    });

    it("should pass if WhatsApp phone is provided", () => {
      const creds: AuthCredentialsState = { whatsappPhone: "+1234567890" };
      expect(() => assertHasAtLeastOneCredential(creds)).not.toThrow();
    });

    it("should throw AuthDomainError if both are missing", () => {
      const creds: AuthCredentialsState = { email: null, whatsappPhone: null };
      expect(() => assertHasAtLeastOneCredential(creds))
        .toThrow(AuthDomainError);
      expect(() => assertHasAtLeastOneCredential(creds))
        .toThrow("User must have at least one authentication method");
    });
  });

  describe("assertEmailVerificationAllowed", () => {
    it("should pass for an unverified email", () => {
      const creds: AuthCredentialsState = { email: "test@example.com", emailVerifiedAt: null };
      expect(() => assertEmailVerificationAllowed(creds)).not.toThrow();
    });

    it("should throw if no email is set", () => {
      const creds: AuthCredentialsState = { email: null };
      expect(() => assertEmailVerificationAllowed(creds))
        .toThrow("Cannot verify email when no email is set");
    });

    it("should throw if email is already verified", () => {
      const creds: AuthCredentialsState = { 
        email: "test@example.com", 
        emailVerifiedAt: Math.floor(Date.now() / 1000) 
      };
      expect(() => assertEmailVerificationAllowed(creds))
        .toThrow("Email is already verified");
    });
  });

  describe("assertWhatsappVerificationAllowed", () => {
    it("should pass for an unverified WhatsApp number", () => {
      const creds: AuthCredentialsState = { whatsappPhone: "+1234567890", whatsappVerifiedAt: null };
      expect(() => assertWhatsappVerificationAllowed(creds)).not.toThrow();
    });

    it("should throw if no WhatsApp phone is set", () => {
      const creds: AuthCredentialsState = { whatsappPhone: null };
      expect(() => assertWhatsappVerificationAllowed(creds))
        .toThrow("Cannot verify WhatsApp when no phone number is set");
    });

    it("should throw if WhatsApp is already verified", () => {
      const creds: AuthCredentialsState = { 
        whatsappPhone: "+1234567890", 
        whatsappVerifiedAt: 123456789 
      };
      expect(() => assertWhatsappVerificationAllowed(creds))
        .toThrow("WhatsApp number is already verified");
    });
  });

  describe("assertLoginAllowed", () => {
    const verifiedEmail = { email: "a@b.com", emailVerifiedAt: 123 };
    const verifiedWhatsapp = { whatsappPhone: "+123", whatsappVerifiedAt: 123 };

    it("should allow email login with verified email", () => {
      expect(() => assertLoginAllowed(verifiedEmail, "email")).not.toThrow();
    });

    it("should allow WhatsApp login with verified phone", () => {
      expect(() => assertLoginAllowed(verifiedWhatsapp, "whatsapp")).not.toThrow();
    });

    it("should block email login if email is unverified", () => {
      const unverified = { email: "a@b.com", emailVerifiedAt: null };
      expect(() => assertLoginAllowed(unverified, "email"))
        .toThrow("Email login not allowed without verified email");
    });

    it("should block WhatsApp login if phone is unverified", () => {
      const unverified = { whatsappPhone: "+123", whatsappVerifiedAt: null };
      expect(() => assertLoginAllowed(unverified, "whatsapp"))
        .toThrow("WhatsApp login not allowed without verified phone");
    });

    it("should block login if the credential itself is missing", () => {
      expect(() => assertLoginAllowed({}, "email")).toThrow();
      expect(() => assertLoginAllowed({}, "whatsapp")).toThrow();
    });
  });
});