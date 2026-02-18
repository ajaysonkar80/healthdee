# Healthdee Architecture

## 1) High-Level Architecture
Healthdee uses a **modular monolith** approach with Next.js App Router:

- **Presentation layer:** `app/*` route segments + role-focused React components in `components/*`.
- **Transport/API layer:** route handlers in `app/api/*`.
- **Application layer:** orchestration in `server/services/*`.
- **Domain layer:** invariant/rule enforcement in `server/domain/*`.
- **Persistence layer:** repository interfaces in `server/repositories/*` backed by Drizzle + SQLite schema in `db/schema.ts`.

Request path pattern:

`UI -> app/api route -> validator -> service -> domain -> repository -> db`

## 2) Frontend Route Topology

- `app/(public)` public marketing/help/about/policies pages.
- `app/(public)/(login-signup)` login/signup/forgot/reset flows.
- `app/admin` admin portal.
- `app/doctor` doctor portal.
- `app/patient` patient portal.
- `app/clinics`, `app/doctors/booking` patient-facing discovery/booking experience.

## 3) Backend Layer Responsibilities

### Route handlers (`app/api/*`)
- Parse request data.
- Call validation.
- Enforce authn/authz wrappers (`withAuth`, policy checks).
- Return standardized response envelope.

### Services (`server/services/*`)
- Coordinate multi-step use cases.
- Compose repository operations.
- Call domain assertions before/after mutations.

### Domain (`server/domain/*`)
- Encodes business invariants (auth state checks, audit requirements, etc.).

### Repositories (`server/repositories/*`)
- Encapsulate DB IO and data mapping.
- Keep SQL/ORM concerns isolated from route logic.

## 4) Auth & Authorization Model

- Access tokens (JWT) verified in `withAuth` middleware helper.
- Refresh token flow available via `/api/auth/refresh` with cookie storage.
- Role-aware gates via:
  - `defineAbilityFor` permissions model,
  - guard helpers (`isAdmin`, `isDoctor`, `isPatient`),
  - access policies (`canAccessUser`, `canAccessPatient`).

## 5) Response/Error Conventions

- Success payload shape:
  ```json
  { "success": true, "data": {}, "meta": null }
  ```
- Error payload shape:
  ```json
  { "success": false, "error": { "message": "...", "code": "..." } }
  ```
- Centralized route wrapper `withErrorHandling` prevents uncaught exception leakage.

## 6) Data Model Summary

Core data domains in `db/schema.ts`:
- **Identity/Auth:** users, auth_credentials, otp_sessions, refresh_tokens.
- **Compliance/Consent:** consent_notices, consents, data_erasure_requests.
- **Healthcare records:** ABHA/FHIR resources and related profile tables.
- **Care operations:** doctors, patients, appointments, consultations, prescriptions.

Enum-backed domain values include:
- `role`: patient/doctor/admin
- `status`: active/deactivated/deleted
- `appointment_status`: PENDING/CONFIRMED/COMPLETED/CANCELLED
- `doctor_verification_status`: pending/verified/rejected

## 7) Quality and Tooling

- TypeScript strict mode.
- ESLint and import/security rules.
- Vitest + Testing Library for tests.
- Drizzle migrations under `drizzle/`.

## 8) Recommended Extension Order
For new features, follow this order:
1. Validation schema
2. Domain rule
3. Repository method
4. Service orchestration
5. API handler
6. UI integration
7. Tests + static checks
