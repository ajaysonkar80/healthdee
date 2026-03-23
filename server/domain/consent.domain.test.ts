import { describe, it, expect } from "vitest";
import { 
  assertValidConsentStatusTransition, 
  assertConsentTimestamps, 
  ConsentDomainError 
} from "./consent.domain";
import type { ConsentStatus } from "@/db/schema";

describe("Consent Domain Logic", () => {
  
  describe("assertValidConsentStatusTransition", () => {
    it("should allow transition to the same status", () => {
      const statuses: ConsentStatus[] = ["granted", "withdrawn", "expired"];
      statuses.forEach((status) => {
        expect(() => assertValidConsentStatusTransition(status, status)).not.toThrow();
      });
    });

    it("should allow valid transitions from 'granted'", () => {
      expect(() => assertValidConsentStatusTransition("granted", "withdrawn")).not.toThrow();
      expect(() => assertValidConsentStatusTransition("granted", "expired")).not.toThrow();
    });

    it("should throw for invalid transitions from 'withdrawn'", () => {
      expect(() => assertValidConsentStatusTransition("withdrawn", "granted"))
        .toThrow(ConsentDomainError);
      expect(() => assertValidConsentStatusTransition("withdrawn", "expired"))
        .toThrow(/Invalid consent transition/);
    });

    it("should throw for invalid transitions from 'expired'", () => {
      expect(() => assertValidConsentStatusTransition("expired", "granted"))
        .toThrow(ConsentDomainError);
      expect(() => assertValidConsentStatusTransition("expired", "withdrawn"))
        .toThrow(ConsentDomainError);
    });
  });

  describe("assertConsentTimestamps", () => {
    const now = Date.now();

    it("should throw if 'grantedAt' is missing when status is 'granted'", () => {
      expect(() => assertConsentTimestamps("granted", null))
        .toThrow("grantedAt is required when consent is granted");
    });

    it("should pass if 'grantedAt' is provided when status is 'granted'", () => {
      expect(() => assertConsentTimestamps("granted", now)).not.toThrow();
    });

    it("should throw if 'withdrawnAt' is missing when status is 'withdrawn'", () => {
      // grantedAt can exist, but withdrawnAt is mandatory here
      expect(() => assertConsentTimestamps("withdrawn", now, null))
        .toThrow("withdrawnAt is required when consent is withdrawn");
    });

    it("should pass if 'withdrawnAt' is provided when status is 'withdrawn'", () => {
      expect(() => assertConsentTimestamps("withdrawn", now, now)).not.toThrow();
    });

    it("should throw if 'withdrawnAt' is set for 'granted' status", () => {
      expect(() => assertConsentTimestamps("granted", now, now))
        .toThrow("withdrawnAt must not be set unless consent is withdrawn");
    });

    it("should throw if 'withdrawnAt' is set for 'expired' status", () => {
      expect(() => assertConsentTimestamps("expired", now, now))
        .toThrow("withdrawnAt must not be set unless consent is withdrawn");
    });

    it("should pass for 'expired' status without withdrawnAt", () => {
      expect(() => assertConsentTimestamps("expired", now, null)).not.toThrow();
    });
  });
});