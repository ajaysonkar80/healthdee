# AI Codebase Map & 2-Week Prioritized Completion Plan

## 2-Week Prioritized Completion Plan

### Week 1 (Foundations + High-Risk Gaps)
1. **Complete auth hardening and password reset backend flow**
   - Features: connect forgot/reset pages to real API endpoints, add OTP/email verification paths, add stronger validation errors.
   - Files: `components/auth/ForgetPasswordForm.tsx`, `components/auth/ResetPasswordForm.tsx`, `app/api/auth/*`, `server/services/auth.service.tsx`, `server/validators/auth.ts`.
2. **Finish admin dashboard and core operational pages**
   - Features: replace under-construction states with metrics and tables.
   - Files: `app/admin/dashboard/page.tsx`, `components/admin/*`, `app/api/admin/metrics/route.ts`.
3. **Eliminate mocked/static medical data from critical UI paths**
   - Features: replace static doctor cards and booking placeholders with API-driven data.
   - Files: `components/home/TopRatedDoctors.tsx`, `app/api/doctors/*`, `server/repositories/doctor.repo.ts`, `server/services/doctor.service.tsx`.
4. **Expand test coverage for auth, API routes, and policies**
   - Files: add tests near `server/utils/*_test.ts`, create tests for `app/api/*` and critical components.

### Week 2 (Stabilization + Release Readiness)
1. **Patient/Doctor workflow completion**
   - Features: appointments lifecycle, records views, prescription completion.
   - Files: `app/patient/*`, `app/doctor/*`, `components/patient/*`, `components/doctor/*`, `app/api/appointments/*`, `app/api/patients/*`.
2. **Observability, resiliency, and rate limiting roll-out**
   - Files: `server/middleware/rate-limit.ts`, `server/utils/logger.ts`, `server/http/route-helpers.ts`.
3. **Docs + AI onboarding quality bar**
   - Files: `README.md`, `AGENTS.md`, `docs/folder-structure.md`, this file.
4. **Pre-release verification gate**
   - Run: `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`.

## Feature-to-File Mapping (Priority Ordered)
- **P0 Auth reliability:** `app/api/auth/*`, `server/services/auth.service.tsx`, `server/validators/auth.ts`, `components/auth/*`.
- **P0 Authorization correctness:** `server/policies/*`, `server/http/route-helpers.ts`, `app/api/users/*`, `app/api/doctors/*`.
- **P1 Admin ops:** `app/admin/*`, `components/admin/*`, `app/api/admin/metrics/route.ts`.
- **P1 Doctor workflows:** `app/doctor/*`, `components/doctor/*`, `app/api/appointments/*`, `app/api/doctors/*`.
- **P1 Patient workflows:** `app/patient/*`, `components/patient/*`, `app/api/patients/*`.
- **P2 Quality/ops:** `server/utils/*`, `server/middleware/*`, `scripts/*`, `db/*`, `drizzle/*`.

==============================
CRITICAL FLOWS
==============================

### Authentication & authorization
1. UI forms in `components/auth/*` submit to `app/api/auth/*` routes.
2. API routes validate request schemas in `server/validators/*`.
3. Services in `server/services/*` coordinate domain rules and repositories.
4. Middleware/policies (`withAuth`, `defineAbilityFor`, access guards) enforce role checks before data access.

### DB access pattern
`app/api/*` -> `server/services/*` -> `server/domain/*` -> `server/repositories/*` -> `db/schema.ts` + DB client.

### Domain logic boundaries
- **Domain layer:** business invariants and healthcare rules.
- **Repository layer:** SQL/Drizzle persistence only.
- **Service layer:** orchestration and transaction boundaries.
- **Route layer:** transport concerns (HTTP status, request/response shape).

### API → domain → repository flow
Route parses request -> Validator schema checks -> Service calls domain methods -> Repository executes DB IO -> Route returns standardized success/error response.

### Error handling strategy
Use centralized wrappers (`withErrorHandling`) and typed app errors (`server/utils/errors.ts`) to keep response shape consistent and prevent uncaught exceptions leaking internal details.

==============================
EXTENSION RULES
==============================

### Add a new feature safely
1. Start with schema/validator updates.
2. Add/extend domain rule in `server/domain`.
3. Add repository methods for persistence.
4. Wire service orchestrations.
5. Expose API route in `app/api` with `withErrorHandling` (+ `withAuth` when protected).
6. Bind UI component/page and add tests.

### Where new files should go
- UI screens: `app/<segment>/...` and `components/<domain>/...`.
- API handlers: `app/api/<resource>/route.ts`.
- Business rules: `server/domain`.
- Data access: `server/repositories`.
- Input schemas: `server/validators` and `lib/validators.tsx` for client forms.

### What must never be changed
- Standardized API response/error wrappers should stay consistent across routes.
- Authorization checks cannot be bypassed for protected resources.
- DB schema IDs/foreign keys/enums must stay compatible with migrations.

### Patterns to copy
- Route wrappers: `withErrorHandling`, `withAuth`.
- Validation-first request handling before service invocation.
- Service/domain/repository separation with explicit responsibility boundaries.

## Per-File Analysis

FILE: .eslintrc.json

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: .gitignore

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: .vscode/settings.json

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: AGENTS.md

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: react, next, zod, react-hook-form, @/components/ui/button, @/hooks/useAuth, @/lib/validators, @/lib/validators....

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: react, next, zod, react-hook-form, @/components/ui/button, @/hooks/useAuth, @/lib/validators, @/lib/validators, react-hook-form, @hookform/resolvers/zod.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: README.md

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: ai-tree/tree-app.txt

Purpose:
- Generated artifact to help inspect project structure.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: ai-tree/tree-db.txt

Purpose:
- Generated artifact to help inspect project structure.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: ai-tree/tree-hooks.txt

Purpose:
- Generated artifact to help inspect project structure.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: ai-tree/tree-lib.txt

Purpose:
- Generated artifact to help inspect project structure.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: ai-tree/tree-root.txt

Purpose:
- Generated artifact to help inspect project structure.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: ai-tree/tree-server.txt

Purpose:
- Generated artifact to help inspect project structure.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: ajaygit.txt

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: ajaygit.txt.pub

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: app/(public)/(login-signup)/forgot-password/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/auth/ForgetPasswordForm.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/auth/ForgetPasswordForm.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/(public)/(login-signup)/layout.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: react, next/link, next/image.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, next/link, next/image.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/(public)/(login-signup)/login/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/auth/LoginForm.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/auth/LoginForm.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/(public)/(login-signup)/reset-password/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/auth/ResetPasswordForm.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/auth/ResetPasswordForm.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/(public)/(login-signup)/signup/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/auth/SignupForm.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/auth/SignupForm.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/(public)/(login-signup)/verify-email/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: react, next/navigation.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, next/navigation.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.

---

FILE: app/(public)/about/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/about/about-hero/AboutHero, @/components/about/our-story/OurStory, @/components/about/trust-badges/TrustBadges, @/components/layout/Header, @/components/layout/Footer, @/components/about/final-cta/FinalCTA, @/components/about/core-values/CoreValues.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/about/about-hero/AboutHero, @/components/about/our-story/OurStory, @/components/about/trust-badges/TrustBadges, @/components/layout/Header, @/components/layout/Footer, @/components/about/final-cta/FinalCTA, @/components/about/core-values/CoreValues.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/(public)/help/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/layout/Header, @/components/layout/Footer, @/components/help/HelpTopicCard, @/components/help/FAQAccordion, next/image.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/layout/Header, @/components/layout/Footer, @/components/help/HelpTopicCard, @/components/help/FAQAccordion, next/image.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/(public)/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/(public)/policies/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/(public)/select-role/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/auth/SelectRoleForm.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/auth/SelectRoleForm.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/Header.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/api/doctors/[id]/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, drizzle-orm, @/db, @/db/schema, @/lib/auth, @/lib/validators.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, drizzle-orm, @/db, @/db/schema, @/lib/auth, @/lib/validators.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Database read/write operations may occur.

---

FILE: app/admin/api/doctors/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, drizzle-orm, @/db, @/db/schema, @/lib/auth, @/lib/validators.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, drizzle-orm, @/db, @/db/schema, @/lib/auth, @/lib/validators.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Database read/write operations may occur.

---

FILE: app/admin/appointment-requests/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/ui/button, lucide-react, @/components/admin/appointment-requests/AppointmentFilters, @/components/admin/appointment-requests/AppointmentTable, @/components/admin/appointment-requests/AppointmentPagination, @/components/admin/appointment-requests/AppointmentTableRow.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/button, lucide-react, @/components/admin/appointment-requests/AppointmentFilters, @/components/admin/appointment-requests/AppointmentTable, @/components/admin/appointment-requests/AppointmentPagination, @/components/admin/appointment-requests/AppointmentTableRow.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/clinics/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: next/link, @/components/ui/button, @/components/admin/clinic/ClinicStats, @/components/admin/clinic/ClinicTable, @/components/admin/clinic/ClinicPagination, @/components/admin/clinic/ClinicTableRow.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, @/components/ui/button, @/components/admin/clinic/ClinicStats, @/components/admin/clinic/ClinicTable, @/components/admin/clinic/ClinicPagination, @/components/admin/clinic/ClinicTableRow.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/dashboard/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/doctor/[doctorId]/edit/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/admin/doctor/DoctorForm.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/admin/doctor/DoctorForm.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/doctor/create/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/admin/doctor/DoctorForm.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/admin/doctor/DoctorForm.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/doctor/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: next/link, lucide-react, @/components/admin/doctor/BulkHelpCards, @/components/admin/doctor/DoctorTable, @/components/admin/doctor/StatsCard, @/components/ui/button.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, lucide-react, @/components/admin/doctor/BulkHelpCards, @/components/admin/doctor/DoctorTable, @/components/admin/doctor/StatsCard, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/doctors-verification/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/ui/button, @/components/admin/doctor-verification/VerificationFilters, @/components/admin/doctor-verification/VerificationTable, @/components/admin/doctor-verification/VerificationPagination, @/components/admin/doctor-verification/VerificationTableRow, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/button, @/components/admin/doctor-verification/VerificationFilters, @/components/admin/doctor-verification/VerificationTable, @/components/admin/doctor-verification/VerificationPagination, @/components/admin/doctor-verification/VerificationTableRow, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/layout.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: react, @/components/admin/AdminSidebar, @/components/admin/AdminTopBar, next/headers, next/navigation, @/server/utils/jwt.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @/components/admin/AdminSidebar, @/components/admin/AdminTopBar, next/headers, next/navigation, @/server/utils/jwt.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/admin/StatsGrid, @/components/admin/RecentActivity.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/admin/StatsGrid, @/components/admin/RecentActivity.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/settings/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/admin/users/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/api/admin/metrics/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/admin.service, @/server/utils/errors, @/server/policies/guards/isAdmin, @/server/policies/roles.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/admin.service, @/server/utils/errors, @/server/policies/guards/isAdmin, @/server/policies/roles.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/appointments/[id]/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/appointment.service, @/server/utils/errors, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/appointment.service, @/server/utils/errors, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/appointments/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/appointment.service, @/server/utils/errors.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/appointment.service, @/server/utils/errors.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/auth/login/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, @/server/validators/auth, next/server.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, @/server/validators/auth, next/server.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/api/auth/logout/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/auth/me/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/utils/errors.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/utils/errors.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/auth/otp/request/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, next/server.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, next/server.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/api/auth/otp/verify/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, next/server.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, next/server.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/api/auth/refresh/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, next/server.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, next/server.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/api/auth/register/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, @/server/validators/auth, next/server.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: @/server/http/route-helpers, @/server/http/response, @/server/services/auth.service, @/server/validators/auth, next/server.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/api/doctors/[id]/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/doctor.service, @/server/policies/roles, @/server/utils/errors.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/doctor.service, @/server/policies/roles, @/server/utils/errors.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/doctors/[id]/verify/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/doctor.service, @/server/policies/roles, @/server/policies/guards/isAdmin, @/server/utils/errors.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/doctor.service, @/server/policies/roles, @/server/policies/guards/isAdmin, @/server/utils/errors.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/doctors/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/doctor.service, @/server/policies/roles, @/server/policies/ability, @/server/utils/errors.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/doctor.service, @/server/policies/roles, @/server/policies/ability, @/server/utils/errors.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/health/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: @/server/http/route-helpers, @/server/http/response, @/db, drizzle-orm.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: @/server/http/route-helpers, @/server/http/response, @/db, drizzle-orm.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Database read/write operations may occur.

---

FILE: app/api/patients/[id]/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/patient.service, @/server/policies/roles, @/server/policies/access/canAccessPatient, @/server/policies/fields/patient.fields, @/server/policies/rbac-deps....
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/patient.service, @/server/policies/roles, @/server/policies/access/canAccessPatient, @/server/policies/fields/patient.fields, @/server/policies/rbac-deps, @/server/utils/errors.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/patients/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/patient.service, @/server/policies/roles, @/server/policies/ability, @/server/utils/errors.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/patient.service, @/server/policies/roles, @/server/policies/ability, @/server/utils/errors.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/users/[id]/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/user.service, @/server/policies/roles, @/server/policies/access/canAccessUser, @/server/policies/rbac-deps, @/server/utils/errors.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/user.service, @/server/policies/roles, @/server/policies/access/canAccessUser, @/server/policies/rbac-deps, @/server/utils/errors.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/api/users/route.ts

Purpose:
- Expose HTTP handlers for frontend/server callers.

Inputs:
- Imports: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/user.service, @/server/policies/roles, @/server/policies/ability, @/server/utils/errors.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns HTTP response payload (success/error JSON).

Dependencies:
- Depends on: next/server, @/server/http/route-helpers, @/server/http/response, @/server/services/user.service, @/server/policies/roles, @/server/policies/ability, @/server/utils/errors.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: app/clinics/[id]/ClinicDetails.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/clinics/[id]/ClinicDoctors.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: next/image, next/link, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/image, next/link, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/clinics/[id]/ClinicHero.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: next/image, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/image, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/clinics/[id]/ClinicPageLayout.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: react, @/components/layout/Header, @/components/layout/Footer.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @/components/layout/Header, @/components/layout/Footer.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/clinics/[id]/ClinicServices.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/clinics/[id]/ClinicSidebar.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/clinics/[id]/ClinicSummary.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: next/image, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/image, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/clinics/[id]/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: ./ClinicPageLayout, ./ClinicHero, ./ClinicSummary, ./ClinicDetails, ./ClinicServices, ./ClinicDoctors, ./ClinicSidebar.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./ClinicPageLayout, ./ClinicHero, ./ClinicSummary, ./ClinicDetails, ./ClinicServices, ./ClinicDoctors, ./ClinicSidebar.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/clinics/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/context/AuthContext.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: next/navigation, @/app/services/auth.service.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/navigation, @/app/services/auth.service.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Client navigation side effect.

---

FILE: app/doctor/appointments/[id]/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/appointments/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/doctor/appointment/AppointmentQueue, next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/doctor/appointment/AppointmentQueue, next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/dashboard/error.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/dashboard/loading.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/dashboard/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/doctor/dashboard/StatsSection, @/components/doctor/appointment/AppointmentQueue, @/components/doctor/dashboard/CurrentlyConsulting, @/components/doctor/dashboard/UrgentNotifications.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/doctor/dashboard/StatsSection, @/components/doctor/appointment/AppointmentQueue, @/components/doctor/dashboard/CurrentlyConsulting, @/components/doctor/dashboard/UrgentNotifications.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/earnings/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/doctor/earnings/EarningsSummary, @/components/doctor/earnings/EarningsTable.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/doctor/earnings/EarningsSummary, @/components/doctor/earnings/EarningsTable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/layout.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/doctor/dashboard/Sidebar, @/components/doctor/dashboard/Header.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/doctor/dashboard/Sidebar, @/components/doctor/dashboard/Header.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/onboarding/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/prescriptions/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: next/link, @/components/doctor/prescriptions/PrescriptionsTable.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, @/components/doctor/prescriptions/PrescriptionsTable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/settings/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/doctor/settings/ProfileSettings, @/components/doctor/settings/ClinicSettings, @/components/doctor/settings/NotificationSettings, @/components/doctor/settings/SecuritySettings.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/doctor/settings/ProfileSettings, @/components/doctor/settings/ClinicSettings, @/components/doctor/settings/NotificationSettings, @/components/doctor/settings/SecuritySettings.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctor/verification/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctors/booking/confirmation/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/layout/Header, @/components/layout/Footer, @/components/doctor/booking/confirmation/BookingConfirmationHero, @/components/doctor/booking/confirmation/BookingSummaryCard, @/components/doctor/booking/confirmation/BookingActions, @/components/doctor/booking/confirmation/WhatToExpect, @/components/doctor/booking/confirmation/SupportFooter.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/layout/Header, @/components/layout/Footer, @/components/doctor/booking/confirmation/BookingConfirmationHero, @/components/doctor/booking/confirmation/BookingSummaryCard, @/components/doctor/booking/confirmation/BookingActions, @/components/doctor/booking/confirmation/WhatToExpect, @/components/doctor/booking/confirmation/SupportFooter.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctors/booking/layout.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/doctors/booking/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/layout/Header, @/components/layout/Footer, @/components/doctor/booking/DoctorProfile, @/components/doctor/booking/DoctorStats, @/components/doctor/booking/AboutDoctor, @/components/doctor/booking/Reviews, @/components/doctor/booking/ClinicInfo, @/components/doctor/booking/BookingPanel.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/layout/Header, @/components/layout/Footer, @/components/doctor/booking/DoctorProfile, @/components/doctor/booking/DoctorStats, @/components/doctor/booking/AboutDoctor, @/components/doctor/booking/Reviews, @/components/doctor/booking/ClinicInfo, @/components/doctor/booking/BookingPanel.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/error.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/favicon.ico

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: app/globals.css

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/layout.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: next, next/font/local, @/app/context/AuthContext.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next, next/font/local, @/app/context/AuthContext.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/loading.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/notfound.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/layout/Header, @/components/layout/Footer, @/components/home/HeroSection, @/components/home/SpecialtiesSection, @/components/home/HowItWorksSection, @/components/home/TrustStatsSection, @/components/home/CTASection, @/components/home/WhyHealthDeeSection....
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/layout/Header, @/components/layout/Footer, @/components/home/HeroSection, @/components/home/SpecialtiesSection, @/components/home/HowItWorksSection, @/components/home/TrustStatsSection, @/components/home/CTASection, @/components/home/WhyHealthDeeSection, @/components/home/TopRatedDoctors.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/patient/appointments/book/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/patient/appointments/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/patient/dashboard/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: @/components/patient/PatientSettingsLayout, @/components/patient/ProfileHeader, @/components/patient/PersonalInformationSection, @/components/patient/EmergencyContactSection, @/components/patient/NotificationPrivacySection, @/components/patient/DangerZone.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/patient/PatientSettingsLayout, @/components/patient/ProfileHeader, @/components/patient/PersonalInformationSection, @/components/patient/EmergencyContactSection, @/components/patient/NotificationPrivacySection, @/components/patient/DangerZone.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/patient/layout.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- Imports: react, next/headers, next/navigation, @/components/patient/PatientSideBar, @/components/patient/PatientSideBar, @/server/utils/jwt.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, next/headers, next/navigation, @/components/patient/PatientSideBar, @/components/patient/PatientSideBar, @/server/utils/jwt.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/patient/profile/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/patient/records/page.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: app/services/auth.service.ts

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Network request may occur.

---

FILE: app/types/auth.tsx

Purpose:
- Render Next.js route UI, layout, or route-level behavior.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components.json

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: components/about/about-hero/AboutHero.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./HeroContent.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./HeroContent.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/about-hero/HeroContent.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/core-values/CoreValues.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react-icons/fa, ./ValueCard.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react-icons/fa, ./ValueCard.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/core-values/ValueCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/final-cta/FinalCTA.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/impact-stats/ImpactCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./StatCard.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./StatCard.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/impact-stats/StatCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/our-story/ImpactInlineStats.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/our-story/OurStory.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./StoryContent, ./StoryImageCard.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./StoryContent, ./StoryImageCard.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/our-story/StoryContent.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./ImpactInlineStats.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./ImpactInlineStats.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/our-story/StoryImageCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/image.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/image.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/trust-badges/BadgeItem.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/about/trust-badges/TrustBadges.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./BadgeItem.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./BadgeItem.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/AdminSidebar.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link, next/navigation, ../ui/button.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, next/navigation, ../ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/AdminTopBar.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ../ui/input, ../ui/button, ../ui/avatar.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ../ui/input, ../ui/button, ../ui/avatar.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/RecentActivity.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ../ui/card, ../ui/button.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ../ui/card, ../ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/StatsCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ../ui/card, ../ui/badge, react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ../ui/card, ../ui/badge, react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/StatsGrid.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, ./StatsCard.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, ./StatsCard.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Network request may occur.

---

FILE: components/admin/appointment-requests/AppointmentActionsMenu.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/button, lucide-react.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/button, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/appointment-requests/AppointmentFilters.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/button, lucide-react.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/button, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/appointment-requests/AppointmentPagination.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/appointment-requests/AppointmentStatusBadge.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/badge.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/badge.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/appointment-requests/AppointmentTable.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card, ./AppointmentTableRow.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card, ./AppointmentTableRow.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/appointment-requests/AppointmentTableRow.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/table, ./AppointmentStatusBadge, @/components/ui/avatar, lucide-react, @/components/ui/button.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/table, ./AppointmentStatusBadge, @/components/ui/avatar, lucide-react, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/appointment-requests/PatientInfoCell.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/avatar.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/avatar.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/clinic/ClinicPagination.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/clinic/ClinicStatCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/clinic/ClinicStats.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./ClinicStatCard.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./ClinicStatCard.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/clinic/ClinicStatusBadge.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/badge.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/badge.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/clinic/ClinicTable.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./ClinicTableRow, @/components/ui/card.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./ClinicTableRow, @/components/ui/card.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/clinic/ClinicTableRow.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link, @/components/ui/table, ./ClinicStatusBadge, lucide-react.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, @/components/ui/table, ./ClinicStatusBadge, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor-verification/DoctorsInfoCell.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/avatar.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/avatar.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor-verification/VerificationFilters.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/button, lucide-react.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/button, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor-verification/VerificationPagination.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor-verification/VerificationStatusBadge.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/badge.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/badge.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor-verification/VerificationTable.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card, ./VerificationTableRow.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card, ./VerificationTableRow.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor-verification/VerificationTableRow.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/table, ./VerificationStatusBadge, lucide-react, @/components/ui/button, @/components/ui/avatar.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/table, ./VerificationStatusBadge, lucide-react, @/components/ui/button, @/components/ui/avatar.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor-verification/VerificationsActionsMenu.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/button, lucide-react.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/button, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor/BulkHelpCards.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ../../ui/alert, lucide-react.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ../../ui/alert, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor/DoctorDeleteModal.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/button.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor/DoctorForm.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, react-hook-form, @hookform/resolvers/zod, zod, @/components/ui/button, @/components/ui/input, @/lib/validators.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, react-hook-form, @hookform/resolvers/zod, zod, @/components/ui/button, @/components/ui/input, @/lib/validators.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.

---

FILE: components/admin/doctor/DoctorRowAction.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link, lucide-react, @/components/ui/button, @/components/ui/switch.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, lucide-react, @/components/ui/button, @/components/ui/switch.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/admin/doctor/DoctorTable.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @/components/ui/badge, @/components/ui/avatar, @/components/admin/doctor/DoctorDeleteModal, @/components/admin/doctor/DoctorRowAction.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @/components/ui/badge, @/components/ui/avatar, @/components/admin/doctor/DoctorDeleteModal, @/components/admin/doctor/DoctorRowAction.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.

---

FILE: components/admin/doctor/StatsCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ../../ui/card.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ../../ui/card.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/auth/EmailLoginStep.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react-hook-form, @hookform/resolvers/zod, zod, next/navigation, @/lib/validators, @/components/ui/input, @/components/ui/PasswordInput, @/components/ui/button.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react-hook-form, @hookform/resolvers/zod, zod, next/navigation, @/lib/validators, @/components/ui/input, @/components/ui/PasswordInput, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.
- Client navigation side effect.

---

FILE: components/auth/EmailSignupStep.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react-hook-form, @hookform/resolvers/zod, zod, @/lib/validators, @/components/ui/input, @/components/ui/PasswordInput, @/components/ui/button.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react-hook-form, @hookform/resolvers/zod, zod, @/lib/validators, @/components/ui/input, @/components/ui/PasswordInput, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.

---

FILE: components/auth/EmailVerificationStep.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/auth/ForgetPasswordForm.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/navigation, react-hook-form, @/components/ui/input, @/components/ui/button.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/navigation, react-hook-form, @/components/ui/input, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.
- Client navigation side effect.

---

FILE: components/auth/LoginForm.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link, react, next/navigation, ./EmailLoginStep, ./PhoneLoginStep, ./LoginOtpStep.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, react, next/navigation, ./EmailLoginStep, ./PhoneLoginStep, ./LoginOtpStep.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Client navigation side effect.

---

FILE: components/auth/LoginOtpStep.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react-hook-form, @hookform/resolvers/zod, zod, @/lib/validators, @/components/ui/input, @/components/ui/button.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react-hook-form, @hookform/resolvers/zod, zod, @/lib/validators, @/components/ui/input, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/auth/OtpStep.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react-hook-form, @hookform/resolvers/zod, @/lib/validators, @/components/ui/input, @/components/ui/button, zod.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react-hook-form, @hookform/resolvers/zod, @/lib/validators, @/components/ui/input, @/components/ui/button, zod.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/auth/PhoneLoginStep.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react-hook-form, @hookform/resolvers/zod, zod, @/lib/validators, @/components/ui/input, @/components/ui/button.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react-hook-form, @hookform/resolvers/zod, zod, @/lib/validators, @/components/ui/input, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.

---

FILE: components/auth/PhoneSignupStep.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react-hook-form, @hookform/resolvers/zod, @/lib/validators, @/components/ui/input, @/components/ui/button, zod.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react-hook-form, @hookform/resolvers/zod, @/lib/validators, @/components/ui/input, @/components/ui/button, zod.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.

---

FILE: components/auth/ResetPasswordForm.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/navigation, react-hook-form, @hookform/resolvers/zod, zod, @/lib/validators, @/components/ui/PasswordInput, @/components/ui/button.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/navigation, react-hook-form, @hookform/resolvers/zod, zod, @/lib/validators, @/components/ui/PasswordInput, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Client navigation side effect.

---

FILE: components/auth/SelectRoleForm.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, next/navigation, @/components/ui/button.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, next/navigation, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Client navigation side effect.

---

FILE: components/auth/SignupForm.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, next/navigation, ./EmailSignupStep, ./PhoneSignupStep, ./OtpStep, ./EmailVerificationStep, next/link.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, next/navigation, ./EmailSignupStep, ./PhoneSignupStep, ./OtpStep, ./EmailVerificationStep, next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Client navigation side effect.

---

FILE: components/doctor/DoctorCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/PrescriptionForm.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/appointment/AppointmentQueue.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/appointment/appointmentSlot.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/AboutDoctor.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/BookingPanel.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @/components/ui/card, @/components/ui/button, @/lib/utils.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @/components/ui/card, @/components/ui/button, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.

---

FILE: components/doctor/booking/ClinicInfo.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card, @/components/ui/badge, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card, @/components/ui/badge, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/DoctorProfile.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/image, @/components/ui/card, @/components/ui/badge, @/components/ui/button, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/image, @/components/ui/card, @/components/ui/badge, @/components/ui/button, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/DoctorStats.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/Reviews.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card, @/components/ui/badge, next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card, @/components/ui/badge, next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/confirmation/AppointmentMeta.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/confirmation/BookingActions.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/button, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/button, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- Logging may occur.

---

FILE: components/doctor/booking/confirmation/BookingConfirmationHero.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/confirmation/BookingSummaryCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card, ./DoctorSummary, ./AppointmentMeta.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card, ./DoctorSummary, ./AppointmentMeta.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/confirmation/DoctorSummary.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/image, @/components/ui/badge, @/components/ui/button, lucide-react, next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/image, @/components/ui/badge, @/components/ui/button, lucide-react, next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/confirmation/ExpectationStep.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/confirmation/SupportFooter.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/booking/confirmation/WhatToExpect.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card, ./ExpectationStep, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card, ./ExpectationStep, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/dashboard/CurrentlyConsulting.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/dashboard/Header.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: lucide-react, react, next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: lucide-react, react, next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/dashboard/Sidebar.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link, next/navigation.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, next/navigation.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/dashboard/StatCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/dashboard/StatsSection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./StatCard.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./StatCard.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/dashboard/UrgentNotifications.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/earnings/EarningsSummary.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/earnings/EarningsTable.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/prescriptions/PrescriptionsTable.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/settings/ClinicSettings.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/settings/NotificationSettings.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/settings/ProfileSettings.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/doctor/settings/SecuritySettings.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/help/FAQAccordion.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/help/HelpTopicCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/home/CTASection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/home/HeroSection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react-icons/fi.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react-icons/fi.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/home/HowItWorksSection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/home/SpecialtiesSection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/home/TopRatedDoctors.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, next/link, next/image, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, next/link, next/image, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/home/TrustStatsSection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/home/WhyHealthDeeSection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/layout/Footer.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, next/link.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, next/link.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/layout/Header.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link, react-icons/fi.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, react-icons/fi.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/DangerZone.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/alert, @/components/ui/button, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/alert, @/components/ui/button, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/EmergencyContactItem.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card, @/components/ui/button, @/components/ui/badge, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card, @/components/ui/button, @/components/ui/badge, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/EmergencyContactSection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./EmergencyContactItem, @/components/ui/button, @/components/ui/badge, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./EmergencyContactItem, @/components/ui/button, @/components/ui/badge, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/NotificationPrivacySection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./ToggleSettingsItem.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./ToggleSettingsItem.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/PatientInfoCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/button, @/components/ui/avatar, @/components/ui/badge, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/button, @/components/ui/avatar, @/components/ui/badge, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/PatientSettingsLayout.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, ./PatientSideBar, ./PatientTopNav.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, ./PatientSideBar, ./PatientTopNav.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/PatientSideBar.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link, next/navigation, @/lib/utils, @/components/ui/card, @/components/ui/button, @radix-ui/react-select.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, next/navigation, @/lib/utils, @/components/ui/card, @/components/ui/button, @radix-ui/react-select.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/PatientTopNav.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: next/link, lucide-react, @/components/ui/button, @/components/ui/avatar.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: next/link, lucide-react, @/components/ui/button, @/components/ui/avatar.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/PersonalInfoFieldCard.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/PersonalInformationSection.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: ./PersonalInfoFieldCard, @/components/ui/button, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: ./PersonalInfoFieldCard, @/components/ui/button, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/ProfileHeader.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card, @/components/ui/button, @/components/ui/avatar, @/components/ui/badge, lucide-react.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card, @/components/ui/button, @/components/ui/avatar, @/components/ui/badge, lucide-react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/patient/ToggleSettingsItem.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @/components/ui/card, @/components/ui/switch.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @/components/ui/card, @/components/ui/switch.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/PasswordInput.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/RadioGroup.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/alert.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, class-variance-authority, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, class-variance-authority, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/avatar.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @radix-ui/react-avatar, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @radix-ui/react-avatar, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/badge.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, class-variance-authority, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, class-variance-authority, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/button.test.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: @testing-library/react, vitest, ./button.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: @testing-library/react, vitest, ./button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/button.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @radix-ui/react-slot, class-variance-authority, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @radix-ui/react-slot, class-variance-authority, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/card.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/dropdown-menu.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @radix-ui/react-dropdown-menu, lucide-react, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @radix-ui/react-dropdown-menu, lucide-react, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/input.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/pagination.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, lucide-react, @/lib/utils, @/components/ui/button.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, lucide-react, @/lib/utils, @/components/ui/button.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/select.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @radix-ui/react-select, lucide-react, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @radix-ui/react-select, lucide-react, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/switch.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @radix-ui/react-switch, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @radix-ui/react-switch, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/table.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: components/ui/tooltip.tsx

Purpose:
- Encapsulate reusable UI and interaction behavior.

Inputs:
- Imports: react, @radix-ui/react-tooltip, @/lib/utils.

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Depends on: react, @radix-ui/react-tooltip, @/lib/utils.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: db/index.ts

Purpose:
- Define DB connectivity and schema.

Inputs:
- Imports: drizzle-orm/libsql, @libsql/client, ./schema, dotenv.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: drizzle-orm/libsql, @libsql/client, ./schema, dotenv.

Invariants:
- Must remain migration-compatible and not violate referential integrity assumptions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: db/schema.ts

Purpose:
- Define DB connectivity and schema.

Inputs:
- Imports: drizzle-orm, zod.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: drizzle-orm, zod.

Invariants:
- Must remain migration-compatible and not violate referential integrity assumptions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: db/turso.tsx

Purpose:
- Define DB connectivity and schema.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must remain migration-compatible and not violate referential integrity assumptions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: drizzle.config.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: drizzle-kit, dotenv.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: drizzle-kit, dotenv.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: drizzle/0000_purple_tiger_shark.sql

Purpose:
- Track schema migrations and metadata snapshots.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must remain migration-compatible and not violate referential integrity assumptions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: drizzle/0001_exotic_dakota_north.sql

Purpose:
- Track schema migrations and metadata snapshots.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must remain migration-compatible and not violate referential integrity assumptions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: drizzle/meta/0000_snapshot.json

Purpose:
- Track schema migrations and metadata snapshots.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must remain migration-compatible and not violate referential integrity assumptions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: drizzle/meta/0001_snapshot.json

Purpose:
- Track schema migrations and metadata snapshots.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must remain migration-compatible and not violate referential integrity assumptions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: drizzle/meta/_journal.json

Purpose:
- Track schema migrations and metadata snapshots.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must remain migration-compatible and not violate referential integrity assumptions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: eslint.config.mjs

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: eslint/config, eslint-config-next/core-web-vitals, eslint-config-next/typescript.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: eslint/config, eslint-config-next/core-web-vitals, eslint-config-next/typescript.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: export-tree-for-ai.ps1

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: hooks/useAppointment.tsx

Purpose:
- Reusable client-side stateful logic.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: hooks/useAuth.tsx

Purpose:
- Reusable client-side stateful logic.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: hooks/useDebounce.tsx

Purpose:
- Reusable client-side stateful logic.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: hooks/useRole.tsx

Purpose:
- Reusable client-side stateful logic.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Returns JSX/stateful values consumed by React runtime.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve stable prop/state contracts and avoid breaking route UX.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: lib/auth.ts

Purpose:
- Shared constants/utilities/routes/auth helpers.

Inputs:
- Imports: next/server, next/headers.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: next/server, next/headers.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: lib/constant.tsx

Purpose:
- Shared constants/utilities/routes/auth helpers.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: lib/routes.tsx

Purpose:
- Shared constants/utilities/routes/auth helpers.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: lib/utils.test.ts

Purpose:
- Shared constants/utilities/routes/auth helpers.

Inputs:
- Imports: vitest, ./utils.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: vitest, ./utils.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: lib/utils.ts

Purpose:
- Shared constants/utilities/routes/auth helpers.

Inputs:
- Imports: clsx, tailwind-merge.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: clsx, tailwind-merge.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: lib/validators.tsx

Purpose:
- Shared constants/utilities/routes/auth helpers.

Inputs:
- Imports: zod, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod, @/db/schema.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: next.config.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: package-lock.json

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: package.json

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: postcss.config.mjs

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: public/clinic-logo.jpg

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: public/clinic.jpg

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: public/doctor-1.jpg

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: public/doctor-2.jpg

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: public/doctors.jpg

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: public/fonts/Geist-Bold.ttf

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: public/fonts/Geist-Regular.ttf

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: public/fonts/GeistMono-Regular.ttf

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: public/hospital.jpg

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: public/water-flask.png

Purpose:
- Static asset served by Next.js public folder.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: scripts/seed.ts

Purpose:
- One-off operational tasks (seed, migrations, exports).

Inputs:
- Imports: ../db.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: ../db.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- Database read/write operations may occur.
- Logging may occur.

---

FILE: server/constants/otp-channel.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/constants/user-role.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/constants/user-status.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/db/types.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: drizzle-orm, @/db/schema.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: drizzle-orm, @/db/schema.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/appointment.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- Imports: @/db/schema.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/audit.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/auth.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/clinic.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/consent.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- Imports: @/db/schema.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/consultation.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- Imports: @/db/schema, @/db/schema.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db/schema, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/doctor.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- Imports: @/db/schema.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/erasure.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- Imports: @/db/schema.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/index.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/prescription.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- Imports: @/db/schema.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/domain/user.domain.ts

Purpose:
- Hold domain rules and orchestration independent from transport/UI.

Inputs:
- Imports: @/db/schema.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/http/response.ts

Purpose:
- Standardize API route wrappers and response formats.

Inputs:
- Imports: next/server.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: next/server.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/http/route-helpers.ts

Purpose:
- Standardize API route wrappers and response formats.

Inputs:
- Imports: next/server, zod, ./response.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: next/server, zod, ./response.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- Authorization checks enforced.

---

FILE: server/middleware/auth.ts

Purpose:
- Cross-cutting request protections such as auth/rate-limits.

Inputs:
- Imports: next/server, @/server/utils/jwt.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: next/server, @/server/utils/jwt.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/middleware/rate-limit.ts

Purpose:
- Cross-cutting request protections such as auth/rate-limits.

Inputs:
- Imports: next/server, @/server/http/response, @/server/rate-limit/memory-store, @/server/rate-limit/sqlite-store.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: next/server, @/server/http/response, @/server/rate-limit/memory-store, @/server/rate-limit/sqlite-store.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/ability.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ./permissions, ./roles.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ./permissions, ./roles.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: server/policies/access/canAccess.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ../roles, ../guards/isAdmin, ../guards/isDoctor.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ../roles, ../guards/isAdmin, ../guards/isDoctor.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/access/canAccessAppointment.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ../roles, ../guards/isAdmin.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ../roles, ../guards/isAdmin.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/access/canAccessPatient.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ../roles, ../guards/isAdmin, ../guards/isDoctor.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ../roles, ../guards/isAdmin, ../guards/isDoctor.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/access/canAccessPrescription.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ../roles, ../guards/isAdmin.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ../roles, ../guards/isAdmin.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/access/canAccessUser.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ../roles, ../guards/isAdmin, ../guards/isDoctor, ../repositories.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ../roles, ../guards/isAdmin, ../guards/isDoctor, ../repositories.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/fields/patient.fields.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ../roles, ../guards/isAdmin.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ../roles, ../guards/isAdmin.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/guards/isAdmin.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ../roles.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ../roles.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/guards/isDoctor.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ../roles.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ../roles.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/guards/isPatient.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ../roles.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ../roles.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/permissions.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: ./roles.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: ./roles.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/rbac-deps.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- Imports: @/server/repositories/doctor.repo, @/server/repositories/appointment.repo, @/server/repositories/prescription.repo.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/server/repositories/doctor.repo, @/server/repositories/appointment.repo, @/server/repositories/prescription.repo.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/repositories.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/roles.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/policies/types.ts

Purpose:
- Authorization and permission checks for role/resource access.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/rate-limit/memory-store.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: ./store.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: ./store.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/rate-limit/sqlite-store.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: ./store, @/db, @/db/schema, drizzle-orm.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: ./store, @/db, @/db/schema, drizzle-orm.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- Database read/write operations may occur.

---

FILE: server/rate-limit/store.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/repositories/appointment.repo.ts

Purpose:
- Perform direct DB data-access queries and persistence.

Inputs:
- Imports: @/db, @/db/schema, drizzle-orm, ./user.repo.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db, @/db/schema, drizzle-orm, ./user.repo.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Database read/write operations may occur.

---

FILE: server/repositories/audit.repo.ts

Purpose:
- Perform direct DB data-access queries and persistence.

Inputs:
- Imports: @/db, @/db/schema, ../domain/audit.domain, ./user.repo.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db, @/db/schema, ../domain/audit.domain, ./user.repo.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Database read/write operations may occur.

---

FILE: server/repositories/doctor.repo.ts

Purpose:
- Perform direct DB data-access queries and persistence.

Inputs:
- Imports: @/db, @/db/schema, drizzle-orm, ./user.repo.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db, @/db/schema, drizzle-orm, ./user.repo.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Database read/write operations may occur.

---

FILE: server/repositories/patient.repo.ts

Purpose:
- Perform direct DB data-access queries and persistence.

Inputs:
- Imports: @/db, @/db/schema, ./user.repo.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db, @/db/schema, ./user.repo.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Database read/write operations may occur.

---

FILE: server/repositories/prescription.repo.ts

Purpose:
- Perform direct DB data-access queries and persistence.

Inputs:
- Imports: @/db, @/db/schema, drizzle-orm, ./user.repo.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db, @/db/schema, drizzle-orm, ./user.repo.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Database read/write operations may occur.

---

FILE: server/repositories/user.repo.ts

Purpose:
- Perform direct DB data-access queries and persistence.

Inputs:
- Imports: @/db, @/db/schema, drizzle-orm.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/db, @/db/schema, drizzle-orm.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Database read/write operations may occur.

---

FILE: server/services/admin.service.tsx

Purpose:
- Application-layer orchestration between domain/repository/transport.

Inputs:
- Imports: @/server/repositories/user.repo, @/server/repositories/doctor.repo, @/server/repositories/audit.repo, @/server/constants/user-role, @/server/constants/user-status, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/server/repositories/user.repo, @/server/repositories/doctor.repo, @/server/repositories/audit.repo, @/server/constants/user-role, @/server/constants/user-status, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: server/services/api.tsx

Purpose:
- Application-layer orchestration between domain/repository/transport.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/services/appointment.service.tsx

Purpose:
- Application-layer orchestration between domain/repository/transport.

Inputs:
- Imports: @/server/repositories/appointment.repo, @/server/repositories/doctor.repo, @/server/repositories/patient.repo, @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/constants/user-role, @/server/constants/user-status.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/server/repositories/appointment.repo, @/server/repositories/doctor.repo, @/server/repositories/patient.repo, @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/constants/user-role, @/server/constants/user-status.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: server/services/auth.service.tsx

Purpose:
- Application-layer orchestration between domain/repository/transport.

Inputs:
- Imports: @/server/repositories/user.repo, @/server/repositories/patient.repo, @/server/repositories/audit.repo, @/server/utils/password, @/server/constants/user-role, @/server/constants/user-status, @/server/constants/otp-channel.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/server/repositories/user.repo, @/server/repositories/patient.repo, @/server/repositories/audit.repo, @/server/utils/password, @/server/constants/user-role, @/server/constants/user-status, @/server/constants/otp-channel.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: server/services/doctor.service.tsx

Purpose:
- Application-layer orchestration between domain/repository/transport.

Inputs:
- Imports: @/server/repositories/doctor.repo, @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/constants/user-role, @/server/constants/user-status, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/server/repositories/doctor.repo, @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/constants/user-role, @/server/constants/user-status, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: server/services/patient.service.tsx

Purpose:
- Application-layer orchestration between domain/repository/transport.

Inputs:
- Imports: @/server/repositories/patient.repo, @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/constants/user-role, @/server/constants/user-status.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/server/repositories/patient.repo, @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/constants/user-role, @/server/constants/user-status.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: server/services/prescription.services.tsx

Purpose:
- Application-layer orchestration between domain/repository/transport.

Inputs:
- Imports: @/server/repositories/prescription.repo, @/server/repositories/appointment.repo, @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/utils/errors, @/server/constants/user-role.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/server/repositories/prescription.repo, @/server/repositories/appointment.repo, @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/utils/errors, @/server/constants/user-role.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: server/services/user.service.tsx

Purpose:
- Application-layer orchestration between domain/repository/transport.

Inputs:
- Imports: @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/utils/errors, @/server/constants/user-role, @/server/constants/user-status.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: @/server/repositories/user.repo, @/server/repositories/audit.repo, @/server/utils/errors, @/server/constants/user-role, @/server/constants/user-status.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- Authorization checks enforced.

---

FILE: server/types/next-request.d.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/utils/errors.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- Authorization checks enforced.

---

FILE: server/utils/jwt.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: crypto.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: crypto.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- Database read/write operations may occur.

---

FILE: server/utils/logger.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- Logging may occur.

---

FILE: server/utils/logger_test.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: ./logger.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: ./logger.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- Logging may occur.

---

FILE: server/utils/pagination.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/utils/pagination_test.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- Logging may occur.

---

FILE: server/utils/password.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: crypto.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: crypto.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/utils/password_test.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: ./password.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: ./password.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- Logging may occur.

---

FILE: server/validators/appointment.ts

Purpose:
- Validate and normalize runtime inputs with schemas.

Inputs:
- Imports: zod, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/validators/audit.ts

Purpose:
- Validate and normalize runtime inputs with schemas.

Inputs:
- Imports: zod.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/validators/auth.ts

Purpose:
- Validate and normalize runtime inputs with schemas.

Inputs:
- Imports: zod.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/validators/clinic.ts

Purpose:
- Validate and normalize runtime inputs with schemas.

Inputs:
- Imports: zod.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/validators/consent.ts

Purpose:
- Validate and normalize runtime inputs with schemas.

Inputs:
- Imports: zod, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/validators/consultation.ts

Purpose:
- Validate and normalize runtime inputs with schemas.

Inputs:
- Imports: zod, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/validators/doctor.ts

Purpose:
- Validate and normalize runtime inputs with schemas.

Inputs:
- Imports: zod, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/validators/prescription.ts

Purpose:
- Validate and normalize runtime inputs with schemas.

Inputs:
- Imports: zod, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: server/validators/user.ts

Purpose:
- Validate and normalize runtime inputs with schemas.

Inputs:
- Imports: zod, @/db/schema.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Exports functions/types/constants used by higher layers.

Dependencies:
- Depends on: zod, @/db/schema.

Invariants:
- Must preserve input validation, auth boundaries, and typed contracts.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: tailwind.config.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: tailwindcss.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: tailwindcss.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: tsconfig.json

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- N/A (static/config/artifact file; consumed by tooling/runtime).

Outputs:
- Static bytes or metadata used by app/build tooling.

Dependencies:
- Referenced by browser/build/runtime directly.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None at runtime beyond file serving/reading.

---

FILE: vitest.config.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- Imports: vitest/config, @vitejs/plugin-react, vite-tsconfig-paths.
- Exposes exported symbols/components/handlers for other modules.

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Depends on: vitest/config, @vitejs/plugin-react, vite-tsconfig-paths.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---

FILE: vitest.setup.ts

Purpose:
- Project configuration, lockfiles, docs, and agent guidance.

Inputs:
- No explicit runtime imports (or non-code file).

Outputs:
- Provides project configuration or metadata consumed externally.

Dependencies:
- Minimal/none or not applicable.

Invariants:
- Must stay syntactically valid and aligned with repository conventions.

Side effects:
- None obvious; mostly pure declarations/rendering/config.

---
