// How the user chooses to sign up
export type SignupMethod = "EMAIL" | "PHONE";

// Steps in frontend signup flow
export type SignupStep =
  | "EMAIL_FORM"
  | "PHONE_FORM"
  | "OTP_VERIFICATION"
  | "EMAIL_VERIFICATION"
  | "COMPLETED";

// Base fields shared by all signups
export interface BaseSignupPayload {
  name: string;
  method: SignupMethod;
}

// Email signup payload
export interface EmailSignupPayload extends BaseSignupPayload {
  method: "EMAIL";
  email: string;
  password: string;
}

// Phone signup payload
export interface PhoneSignupPayload extends BaseSignupPayload {
  method: "PHONE";
  phone: string;
}

// Union type (VERY IMPORTANT)
export type SignupPayload =
  | EmailSignupPayload
  | PhoneSignupPayload;

// Backend-driven user state after signup
export type UserVerificationStatus =
  | "EMAIL_UNVERIFIED"
  | "EMAIL_VERIFIED"
  | "PHONE_VERIFIED"
  | "DOCTOR_ONBOARDING"
  | "VERIFICATION_PENDING"
  | "ACTIVE";
