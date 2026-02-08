/* ======================================================
   Errors
====================================================== */

export class AuthDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthDomainError";
  }
}

/* ======================================================
   Types
====================================================== */

export type AuthCredentialsState = {
  email?: string | null;
  emailVerifiedAt?: number | null;
  whatsappPhone?: string | null;
  whatsappVerifiedAt?: number | null;
};

/* ======================================================
   Credential Invariants
====================================================== */

export function assertHasAtLeastOneCredential(
  creds: AuthCredentialsState
) {
  if (!creds.email && !creds.whatsappPhone) {
    throw new AuthDomainError(
      "User must have at least one authentication method"
    );
  }
}

/* ======================================================
   Verification Rules
====================================================== */

export function assertEmailVerificationAllowed(
  creds: AuthCredentialsState
) {
  if (!creds.email) {
    throw new AuthDomainError(
      "Cannot verify email when no email is set"
    );
  }

  if (creds.emailVerifiedAt) {
    throw new AuthDomainError("Email is already verified");
  }
}

export function assertWhatsappVerificationAllowed(
  creds: AuthCredentialsState
) {
  if (!creds.whatsappPhone) {
    throw new AuthDomainError(
      "Cannot verify WhatsApp when no phone number is set"
    );
  }

  if (creds.whatsappVerifiedAt) {
    throw new AuthDomainError("WhatsApp number is already verified");
  }
}

/* ======================================================
   Login Preconditions
====================================================== */

export function assertLoginAllowed(
  creds: AuthCredentialsState,
  method: "email" | "whatsapp"
) {
  if (method === "email") {
    if (!creds.email || !creds.emailVerifiedAt) {
      throw new AuthDomainError(
        "Email login not allowed without verified email"
      );
    }
  }

  if (method === "whatsapp") {
    if (!creds.whatsappPhone || !creds.whatsappVerifiedAt) {
      throw new AuthDomainError(
        "WhatsApp login not allowed without verified phone"
      );
    }
  }
}
