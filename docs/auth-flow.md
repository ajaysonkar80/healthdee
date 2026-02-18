# Authentication & Session Flow

## 1) Actors and Entry Points

- Public auth UI under `app/(public)/(login-signup)` and `components/auth/*`.
- Client-side auth state is managed through `AuthProvider` + `useAuth`.
- API auth endpoints are under `/api/auth/*`.

## 2) Email Signup Flow

1. User submits signup form.
2. Frontend posts to `POST /api/auth/register` with `type: "email"`.
3. Backend validates payload (Zod).
4. Service creates:
   - user record,
   - auth credentials with password hash,
   - patient ABHA placeholder profile,
   - audit log entry.
5. Service returns access + refresh tokens (current route returns tokens in response body).

## 3) Email Login Flow

1. User submits email/password.
2. `POST /api/auth/login` validates input.
3. Service verifies credentials + active user status.
4. Backend sets `access_token` and `refresh_token` HTTP-only cookies.
5. Frontend receives user payload and redirects by role:
   - admin -> `/admin`
   - doctor -> `/doctor`
   - patient -> `/patient`

## 4) Phone OTP Flow

### Request OTP
1. User submits phone number.
2. `POST /api/auth/otp/request` validates phone format.
3. Service creates OTP session (WhatsApp channel).

### Verify OTP
1. User submits OTP.
2. `POST /api/auth/otp/verify` validates OTP format.
3. Service verifies OTP session.
4. If account is missing, service auto-creates a patient user and profile.
5. Service returns access + refresh tokens.

## 5) Session Refresh

1. Client calls `POST /api/auth/refresh`.
2. Route reads `refresh_token` cookie.
3. Service verifies refresh token and active user.
4. Route rotates both access + refresh cookies.
5. Route returns current user envelope.

## 6) Logout Flow

1. Client calls `POST /api/auth/logout`.
2. Route attempts refresh token revocation.
3. Route clears auth cookies.
4. Client clears local auth state and redirects to `/login`.

## 7) Password Reset Flow

1. User submits email to `POST /api/auth/password/forgot`.
2. Service creates email OTP session.
3. User submits email + OTP + new password to `POST /api/auth/password/reset`.
4. Service verifies OTP, updates password hash, and removes existing refresh tokens.

## 8) Security Controls in Place

- Password hashing and verification in server utils.
- JWT access and refresh token model.
- Auth route wrappers (`withAuth`, `withErrorHandling`).
- Role/ability/policy checks on protected domain routes.

## 9) Known Gaps / Follow-up

- Align phone login UX + API naming (legacy message references old endpoint path).
- Ensure all signup/login flows have consistent token-cookie behavior.
- Add rate limiting on OTP-heavy routes.
- Expand automated integration tests for auth edge cases.
