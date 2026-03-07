# AI Codebase Map & 2-Week Prioritized Completion Plan

> Update note (2026-03-07): Refreshed structure references and regenerated the per-file index to match the current tracked repository state.

## Incremental Refresh Notes (2026-03-07)
- Regenerated `docs/folder-structure.md` from the current `git ls-files` output.
- Rebuilt the per-file analysis index in this document for all 397 tracked files.
- Kept implementation guidance (flows, extension rules, and priorities) aligned with the present App Router + server-layer architecture.

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
   - Files: `server/**/*.test.ts`, `app/api/**/route.test.ts`, and critical component tests.

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

FILE: .VSCodeCounter/2026-02-11_18-50-40/details.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/details.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/details.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .VSCodeCounter/2026-02-11_18-50-40/diff-details.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/diff-details.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/diff-details.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .VSCodeCounter/2026-02-11_18-50-40/diff.csv

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/diff.csv`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/diff.csv` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .VSCodeCounter/2026-02-11_18-50-40/diff.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/diff.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/diff.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .VSCodeCounter/2026-02-11_18-50-40/diff.txt

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/diff.txt`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/diff.txt` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .VSCodeCounter/2026-02-11_18-50-40/results.csv

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/results.csv`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/results.csv` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .VSCodeCounter/2026-02-11_18-50-40/results.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/results.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/results.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .VSCodeCounter/2026-02-11_18-50-40/results.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/results.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/results.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .VSCodeCounter/2026-02-11_18-50-40/results.txt

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/results.txt`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/results.txt` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .gitignore

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.gitignore`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.gitignore` (pure rendering, IO, DB access, or runtime setup).

---

FILE: .vscode/settings.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.vscode/settings.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `.vscode/settings.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: AGENTS.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `AGENTS.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `AGENTS.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: README.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `README.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `README.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: ai-tree/tree-app.txt

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-app.txt`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `ai-tree/tree-app.txt` (pure rendering, IO, DB access, or runtime setup).

---

FILE: ai-tree/tree-db.txt

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-db.txt`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `ai-tree/tree-db.txt` (pure rendering, IO, DB access, or runtime setup).

---

FILE: ai-tree/tree-hooks.txt

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-hooks.txt`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `ai-tree/tree-hooks.txt` (pure rendering, IO, DB access, or runtime setup).

---

FILE: ai-tree/tree-lib.txt

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-lib.txt`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `ai-tree/tree-lib.txt` (pure rendering, IO, DB access, or runtime setup).

---

FILE: ai-tree/tree-root.txt

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-root.txt`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `ai-tree/tree-root.txt` (pure rendering, IO, DB access, or runtime setup).

---

FILE: ai-tree/tree-server.txt

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-server.txt`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `ai-tree/tree-server.txt` (pure rendering, IO, DB access, or runtime setup).

---

FILE: ajaygit.txt

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ajaygit.txt`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `ajaygit.txt` (pure rendering, IO, DB access, or runtime setup).

---

FILE: ajaygit.txt.pub

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ajaygit.txt.pub`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `ajaygit.txt.pub` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/(login-signup)/forgot-password/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/forgot-password/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/forgot-password/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/(login-signup)/layout.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/layout.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/layout.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/(login-signup)/login/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/login/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/login/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/(login-signup)/reset-password/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/reset-password/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/reset-password/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/(login-signup)/signup/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/signup/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/signup/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/(login-signup)/verify-email/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/verify-email/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/verify-email/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/about/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/about/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/about/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/doctor-privacy-policy/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/doctor-privacy-policy/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/doctor-privacy-policy/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/healthcare-provider-terms/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/healthcare-provider-terms/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/healthcare-provider-terms/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/help/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/help/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/help/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/policies/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/policies/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/policies/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/privacy-policy/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/privacy-policy/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/privacy-policy/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/select-role/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/select-role/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/select-role/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/(public)/terms-and-conditions/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/terms-and-conditions/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/(public)/terms-and-conditions/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/Header.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/Header.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/Header.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/appointment-requests/AppointmentRequestsClient.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/appointment-requests/AppointmentRequestsClient.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/appointment-requests/AppointmentRequestsClient.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/appointment-requests/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/appointment-requests/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/appointment-requests/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/clinics/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/clinics/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/clinics/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/dashboard/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/dashboard/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/dashboard/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/doctor/[doctorId]/edit/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctor/[doctorId]/edit/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/doctor/[doctorId]/edit/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/doctor/create/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctor/create/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/doctor/create/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/doctor/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctor/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/doctor/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/doctors-verification/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctors-verification/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/doctors-verification/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/layout.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/layout.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/layout.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/settings/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/settings/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/settings/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/admin/users/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/users/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/admin/users/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/admin/metrics/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/admin/metrics/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/admin/metrics/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/appointments/[id]/cancel/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/cancel/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/cancel/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/appointments/[id]/complete/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/complete/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/complete/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/appointments/[id]/confirm/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/confirm/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/confirm/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/appointments/[id]/reschedule/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/reschedule/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/reschedule/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/appointments/[id]/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/appointments/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/appointments/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/auth/login/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/login/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/auth/login/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/auth/logout/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/logout/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/auth/logout/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/auth/me/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/me/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/auth/me/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/auth/otp/request/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/otp/request/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/auth/otp/request/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/auth/otp/verify/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/otp/verify/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/auth/otp/verify/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/auth/password/forgot/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/password/forgot/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/auth/password/forgot/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/auth/password/reset/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/password/reset/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/auth/password/reset/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/auth/refresh/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/refresh/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/auth/refresh/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/auth/register/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/register/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/auth/register/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/doctor/availability/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctor/availability/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/doctor/availability/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/doctors/[id]/appointments-public/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/[id]/appointments-public/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/doctors/[id]/appointments-public/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/doctors/[id]/availability-public/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/[id]/availability-public/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/doctors/[id]/availability-public/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/doctors/[id]/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/[id]/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/doctors/[id]/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/doctors/[id]/verify/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/[id]/verify/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/doctors/[id]/verify/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/doctors/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/doctors/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/health/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/health/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/health/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/patients/[id]/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/patients/[id]/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/patients/[id]/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/patients/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/patients/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/patients/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/users/[id]/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/users/[id]/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/users/[id]/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/api/users/route.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/users/route.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/api/users/route.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/clinics/[id]/ClinicDetails.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicDetails.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicDetails.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/clinics/[id]/ClinicDoctors.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicDoctors.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicDoctors.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/clinics/[id]/ClinicHero.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicHero.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicHero.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/clinics/[id]/ClinicPageLayout.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicPageLayout.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicPageLayout.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/clinics/[id]/ClinicServices.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicServices.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicServices.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/clinics/[id]/ClinicSidebar.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicSidebar.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicSidebar.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/clinics/[id]/ClinicSummary.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicSummary.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicSummary.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/clinics/[id]/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/clinics/[id]/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/clinics/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/clinics/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/context/AuthContext.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/context/AuthContext.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/context/AuthContext.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/appointments/[id]/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/appointments/[id]/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/appointments/[id]/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/appointments/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/appointments/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/appointments/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/availability/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/availability/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/availability/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/dashboard/error.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/dashboard/error.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/dashboard/error.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/dashboard/loading.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/dashboard/loading.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/dashboard/loading.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/dashboard/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/dashboard/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/dashboard/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/earnings/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/earnings/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/earnings/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/layout.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/layout.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/layout.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/onboarding/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/onboarding/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/onboarding/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/prescriptions/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/prescriptions/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/prescriptions/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/settings/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/settings/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/settings/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctor/verification/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/verification/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctor/verification/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctors/[publicId]/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctors/[publicId]/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctors/[publicId]/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctors/booking/confirmation/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctors/booking/confirmation/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctors/booking/confirmation/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctors/booking/layout.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctors/booking/layout.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctors/booking/layout.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/doctors/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctors/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/doctors/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/error.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/error.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/error.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/favicon.ico

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/favicon.ico`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/favicon.ico` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/globals.css

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/globals.css`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/globals.css` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/layout.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/layout.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/layout.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/loading.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/loading.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/loading.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/notfound.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/notfound.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/notfound.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/appointments/book/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/appointments/book/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/appointments/book/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/appointments/loading.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/appointments/loading.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/appointments/loading.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/appointments/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/appointments/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/appointments/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/danger-zone/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/danger-zone/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/danger-zone/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/emergency-contacts/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/emergency-contacts/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/emergency-contacts/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/layout.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/layout.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/layout.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/notifications/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/notifications/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/notifications/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/profile/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/profile/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/profile/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/patient/records/page.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/records/page.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/patient/records/page.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/services/auth.service.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/services/auth.service.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/services/auth.service.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: app/types/auth.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/types/auth.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `app/types/auth.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/about-hero/AboutHero.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/about-hero/AboutHero.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/about-hero/AboutHero.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/about-hero/HeroContent.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/about-hero/HeroContent.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/about-hero/HeroContent.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/core-values/CoreValues.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/core-values/CoreValues.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/core-values/CoreValues.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/core-values/ValueCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/core-values/ValueCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/core-values/ValueCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/final-cta/FinalCTA.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/final-cta/FinalCTA.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/final-cta/FinalCTA.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/impact-stats/ImpactCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/impact-stats/ImpactCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/impact-stats/ImpactCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/impact-stats/StatCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/impact-stats/StatCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/impact-stats/StatCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/our-story/ImpactInlineStats.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/our-story/ImpactInlineStats.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/our-story/ImpactInlineStats.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/our-story/OurStory.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/our-story/OurStory.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/our-story/OurStory.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/our-story/StoryContent.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/our-story/StoryContent.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/our-story/StoryContent.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/our-story/StoryImageCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/our-story/StoryImageCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/our-story/StoryImageCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/trust-badges/BadgeItem.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/trust-badges/BadgeItem.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/trust-badges/BadgeItem.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/about/trust-badges/TrustBadges.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/trust-badges/TrustBadges.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/about/trust-badges/TrustBadges.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/AdminSidebar.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/AdminSidebar.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/AdminSidebar.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/AdminTopBar.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/AdminTopBar.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/AdminTopBar.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/RecentActivity.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/RecentActivity.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/RecentActivity.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/StatsCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/StatsCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/StatsCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/StatsGrid.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/StatsGrid.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/StatsGrid.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/appointment-requests/AppointmentActionsMenu.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentActionsMenu.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentActionsMenu.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/appointment-requests/AppointmentFilters.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentFilters.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentFilters.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/appointment-requests/AppointmentPagination.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentPagination.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentPagination.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/appointment-requests/AppointmentStatusBadge.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentStatusBadge.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentStatusBadge.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/appointment-requests/AppointmentTable.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentTable.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentTable.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/appointment-requests/AppointmentTableRow.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentTableRow.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentTableRow.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/appointment-requests/PatientInfoCell.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/PatientInfoCell.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/PatientInfoCell.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/clinic/ClinicPagination.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicPagination.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicPagination.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/clinic/ClinicStatCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicStatCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicStatCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/clinic/ClinicStats.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicStats.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicStats.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/clinic/ClinicStatusBadge.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicStatusBadge.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicStatusBadge.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/clinic/ClinicTable.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicTable.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicTable.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/clinic/ClinicTableRow.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicTableRow.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicTableRow.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor-verification/DoctorsInfoCell.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/DoctorsInfoCell.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/DoctorsInfoCell.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor-verification/VerificationFilters.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationFilters.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationFilters.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor-verification/VerificationPagination.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationPagination.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationPagination.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor-verification/VerificationStatusBadge.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationStatusBadge.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationStatusBadge.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor-verification/VerificationTable.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationTable.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationTable.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor-verification/VerificationTableRow.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationTableRow.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationTableRow.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor-verification/VerificationsActionsMenu.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationsActionsMenu.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationsActionsMenu.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor/BulkHelpCards.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/BulkHelpCards.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor/BulkHelpCards.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor/DoctorDeleteModal.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorDeleteModal.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorDeleteModal.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor/DoctorForm.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorForm.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorForm.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor/DoctorRowAction.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorRowAction.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorRowAction.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor/DoctorTable.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorTable.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorTable.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/admin/doctor/StatsCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/StatsCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/admin/doctor/StatsCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/EmailLoginStep.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/EmailLoginStep.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/EmailLoginStep.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/EmailSignupStep.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/EmailSignupStep.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/EmailSignupStep.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/EmailVerificationStep.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/EmailVerificationStep.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/EmailVerificationStep.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/ForgetPasswordForm.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/ForgetPasswordForm.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/ForgetPasswordForm.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/LoginForm.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/LoginForm.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/LoginForm.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/LoginOtpStep.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/LoginOtpStep.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/LoginOtpStep.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/LogoutButton.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/LogoutButton.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/LogoutButton.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/OtpStep.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/OtpStep.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/OtpStep.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/PhoneLoginStep.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/PhoneLoginStep.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/PhoneLoginStep.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/PhoneSignupStep.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/PhoneSignupStep.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/PhoneSignupStep.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/ResetPasswordForm.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/ResetPasswordForm.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/ResetPasswordForm.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/SelectRoleForm.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/SelectRoleForm.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/SelectRoleForm.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/auth/SignupForm.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/SignupForm.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/auth/SignupForm.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/DoctorCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/DoctorCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/DoctorCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/PrescriptionForm.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/PrescriptionForm.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/PrescriptionForm.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/appointment/AppointmentQueue.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/appointment/AppointmentQueue.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/appointment/AppointmentQueue.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/appointment/appointmentSlot.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/appointment/appointmentSlot.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/appointment/appointmentSlot.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/AboutDoctor.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/AboutDoctor.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/AboutDoctor.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/BookingPanel.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/BookingPanel.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/BookingPanel.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/ClinicInfo.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/ClinicInfo.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/ClinicInfo.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/DoctorProfile.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/DoctorProfile.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/DoctorProfile.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/DoctorStats.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/DoctorStats.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/DoctorStats.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/Reviews.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/Reviews.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/Reviews.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/confirmation/AppointmentMeta.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/AppointmentMeta.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/AppointmentMeta.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/confirmation/BookingActions.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/BookingActions.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/BookingActions.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/confirmation/BookingConfirmationHero.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/BookingConfirmationHero.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/BookingConfirmationHero.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/confirmation/BookingSummaryCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/BookingSummaryCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/BookingSummaryCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/confirmation/DoctorSummary.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/DoctorSummary.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/DoctorSummary.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/confirmation/ExpectationStep.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/ExpectationStep.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/ExpectationStep.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/confirmation/SupportFooter.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/SupportFooter.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/SupportFooter.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/booking/confirmation/WhatToExpect.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/WhatToExpect.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/WhatToExpect.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/dashboard/CurrentlyConsulting.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/CurrentlyConsulting.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/dashboard/CurrentlyConsulting.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/dashboard/Header.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/Header.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/dashboard/Header.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/dashboard/Sidebar.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/Sidebar.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/dashboard/Sidebar.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/dashboard/StatCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/StatCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/dashboard/StatCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/dashboard/StatsSection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/StatsSection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/dashboard/StatsSection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/dashboard/UrgentNotifications.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/UrgentNotifications.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/dashboard/UrgentNotifications.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/earnings/EarningsSummary.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/earnings/EarningsSummary.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/earnings/EarningsSummary.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/earnings/EarningsTable.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/earnings/EarningsTable.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/earnings/EarningsTable.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/prescriptions/PrescriptionsTable.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/prescriptions/PrescriptionsTable.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/prescriptions/PrescriptionsTable.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/settings/ClinicSettings.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/settings/ClinicSettings.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/settings/ClinicSettings.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/settings/NotificationSettings.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/settings/NotificationSettings.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/settings/NotificationSettings.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/settings/ProfileSettings.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/settings/ProfileSettings.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/settings/ProfileSettings.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctor/settings/SecuritySettings.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/settings/SecuritySettings.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctor/settings/SecuritySettings.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctors/DoctorsCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctors/DoctorsCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctors/DoctorsFilter.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsFilter.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctors/DoctorsFilter.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctors/DoctorsList.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsList.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctors/DoctorsList.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctors/DoctorsPagination.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsPagination.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctors/DoctorsPagination.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/doctors/DoctorsTopBar.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsTopBar.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/doctors/DoctorsTopBar.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/help/FAQAccordion.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/help/FAQAccordion.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/help/FAQAccordion.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/help/HelpTopicCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/help/HelpTopicCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/help/HelpTopicCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/home/CTASection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/CTASection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/home/CTASection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/home/HeroSection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/HeroSection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/home/HeroSection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/home/HowItWorksSection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/HowItWorksSection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/home/HowItWorksSection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/home/SpecialtiesSection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/SpecialtiesSection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/home/SpecialtiesSection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/home/TopRatedDoctors.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/TopRatedDoctors.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/home/TopRatedDoctors.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/home/TrustStatsSection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/TrustStatsSection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/home/TrustStatsSection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/home/WhyHealthDeeSection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/WhyHealthDeeSection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/home/WhyHealthDeeSection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/layout/Footer.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/layout/Footer.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/layout/Footer.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/layout/Header.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/layout/Header.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/layout/Header.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/DangerZone.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/DangerZone.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/DangerZone.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/EmergencyContactItem.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/EmergencyContactItem.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/EmergencyContactItem.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/EmergencyContactSection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/EmergencyContactSection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/EmergencyContactSection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/NotificationPrivacySection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/NotificationPrivacySection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/NotificationPrivacySection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/PatientInfoCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PatientInfoCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/PatientInfoCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/PatientSideBar.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PatientSideBar.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/PatientSideBar.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/PatientTopNav.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PatientTopNav.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/PatientTopNav.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/PersonalInfoFieldCard.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PersonalInfoFieldCard.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/PersonalInfoFieldCard.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/PersonalInformationSection.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PersonalInformationSection.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/PersonalInformationSection.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/ProfileHeader.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/ProfileHeader.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/ProfileHeader.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/patient/ToggleSettingsItem.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/ToggleSettingsItem.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/patient/ToggleSettingsItem.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/PasswordInput.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/PasswordInput.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/PasswordInput.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/RadioGroup.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/RadioGroup.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/RadioGroup.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/alert.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/alert.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/alert.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/avatar.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/avatar.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/avatar.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/badge.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/badge.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/badge.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/button.test.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/button.test.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/button.test.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/button.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/button.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/button.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/card.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/card.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/card.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/dialog.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/dialog.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/dialog.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/dropdown-menu.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/dropdown-menu.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/dropdown-menu.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/input.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/input.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/input.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/pagination.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/pagination.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/pagination.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/select.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/select.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/select.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/switch.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/switch.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/switch.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/table.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/table.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/table.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: components/ui/tooltip.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/tooltip.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `components/ui/tooltip.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: currentlyWorking.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `currentlyWorking.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `currentlyWorking.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: db/index.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `db/index.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `db/index.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: db/schema.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `db/schema.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `db/schema.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: db/turso.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `db/turso.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `db/turso.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/ai-codebase-map.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/ai-codebase-map.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/ai-codebase-map.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/api-spec.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/api-spec.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/api-spec.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/architecture.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/architecture.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/architecture.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/auth-flow.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/auth-flow.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/auth-flow.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/changelog.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/changelog.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/changelog.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/completed-tasks.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/completed-tasks.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/completed-tasks.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/decisions.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/decisions.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/decisions.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/folder-structure.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/folder-structure.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/folder-structure.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/product-requirements-completed.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/product-requirements-completed.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/product-requirements-completed.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/roadmap.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/roadmap.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/roadmap.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: docs/tasks.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/tasks.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `docs/tasks.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle.config.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle.config.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle.config.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0000_purple_tiger_shark.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0000_purple_tiger_shark.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0000_purple_tiger_shark.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0001_exotic_dakota_north.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0001_exotic_dakota_north.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0001_exotic_dakota_north.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0002_breezy_shape.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0002_breezy_shape.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0002_breezy_shape.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0003_easy_omega_flight.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0003_easy_omega_flight.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0003_easy_omega_flight.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0004_melodic_toad_men.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0004_melodic_toad_men.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0004_melodic_toad_men.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0005_military_otto_octavius.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0005_military_otto_octavius.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0005_military_otto_octavius.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0006_many_arachne.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0006_many_arachne.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0006_many_arachne.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0007_ambiguous_shadow_king.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0007_ambiguous_shadow_king.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0007_ambiguous_shadow_king.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0008_amusing_toad.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0008_amusing_toad.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0008_amusing_toad.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/0009_overconfident_pandemic.sql

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0009_overconfident_pandemic.sql`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/0009_overconfident_pandemic.sql` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0000_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0000_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0000_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0001_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0001_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0001_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0002_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0002_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0002_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0003_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0003_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0003_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0004_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0004_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0004_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0005_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0005_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0005_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0006_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0006_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0006_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0007_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0007_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0007_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0008_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0008_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0008_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/0009_snapshot.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0009_snapshot.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/0009_snapshot.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: drizzle/meta/_journal.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/_journal.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `drizzle/meta/_journal.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: eslint.config.mjs

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `eslint.config.mjs`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `eslint.config.mjs` (pure rendering, IO, DB access, or runtime setup).

---

FILE: export-tree-for-ai.ps1

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `export-tree-for-ai.ps1`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `export-tree-for-ai.ps1` (pure rendering, IO, DB access, or runtime setup).

---

FILE: hooks/useAppointment.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `hooks/useAppointment.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `hooks/useAppointment.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: hooks/useAuth.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `hooks/useAuth.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `hooks/useAuth.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: hooks/useDebounce.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `hooks/useDebounce.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `hooks/useDebounce.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: hooks/useRole.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `hooks/useRole.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `hooks/useRole.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: lib/auth.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/auth.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `lib/auth.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: lib/constant.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/constant.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `lib/constant.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: lib/routes.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/routes.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `lib/routes.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: lib/utils.test.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/utils.test.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `lib/utils.test.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: lib/utils.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/utils.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `lib/utils.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: lib/utils/slot.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/utils/slot.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `lib/utils/slot.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: lib/validators.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/validators.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `lib/validators.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: next.config.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `next.config.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `next.config.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: package-lock.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `package-lock.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `package-lock.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: package.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `package.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `package.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: planning.md

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `planning.md`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `planning.md` (pure rendering, IO, DB access, or runtime setup).

---

FILE: postcss.config.mjs

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `postcss.config.mjs`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `postcss.config.mjs` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/clinic-logo.jpg

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/clinic-logo.jpg`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/clinic-logo.jpg` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/clinic.jpg

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/clinic.jpg`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/clinic.jpg` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/doctor-1.jpg

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/doctor-1.jpg`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/doctor-1.jpg` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/doctor-2.jpg

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/doctor-2.jpg`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/doctor-2.jpg` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/doctors.jpg

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/doctors.jpg`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/doctors.jpg` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/fonts/Geist-Bold.ttf

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/fonts/Geist-Bold.ttf`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/fonts/Geist-Bold.ttf` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/fonts/Geist-Regular.ttf

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/fonts/Geist-Regular.ttf`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/fonts/Geist-Regular.ttf` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/fonts/GeistMono-Regular.ttf

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/fonts/GeistMono-Regular.ttf`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/fonts/GeistMono-Regular.ttf` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/hospital.jpg

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/hospital.jpg`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/hospital.jpg` (pure rendering, IO, DB access, or runtime setup).

---

FILE: public/water-flask.png

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/water-flask.png`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `public/water-flask.png` (pure rendering, IO, DB access, or runtime setup).

---

FILE: scripts/seed.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/seed.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `scripts/seed.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: scripts/seedAvailability.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/seedAvailability.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `scripts/seedAvailability.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: scripts/wifi-network-warning.js

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/wifi-network-warning.js`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `scripts/wifi-network-warning.js` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/constants/otp-channel.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/constants/otp-channel.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/constants/otp-channel.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/constants/user-role.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/constants/user-role.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/constants/user-role.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/constants/user-status.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/constants/user-status.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/constants/user-status.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/db/types.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/db/types.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/db/types.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/appointment.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/appointment.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/appointment.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/audit.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/audit.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/audit.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/auth.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/auth.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/auth.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/clinic.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/clinic.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/clinic.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/consent.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/consent.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/consent.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/consultation.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/consultation.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/consultation.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/doctor.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/doctor.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/doctor.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/erasure.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/erasure.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/erasure.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/index.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/index.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/index.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/prescription.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/prescription.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/prescription.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/domain/user.domain.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/user.domain.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/domain/user.domain.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/http/response.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/http/response.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/http/response.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/http/route-helpers.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/http/route-helpers.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/http/route-helpers.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/middleware/rate-limit.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/middleware/rate-limit.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/middleware/rate-limit.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/ability.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/ability.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/ability.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/access/canAccess.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccess.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/access/canAccess.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/access/canAccessAppointment.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccessAppointment.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/access/canAccessAppointment.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/access/canAccessPatient.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccessPatient.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/access/canAccessPatient.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/access/canAccessPrescription.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccessPrescription.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/access/canAccessPrescription.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/access/canAccessUser.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccessUser.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/access/canAccessUser.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/fields/patient.fields.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/fields/patient.fields.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/fields/patient.fields.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/guards/isAdmin.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/guards/isAdmin.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/guards/isAdmin.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/guards/isDoctor.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/guards/isDoctor.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/guards/isDoctor.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/guards/isPatient.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/guards/isPatient.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/guards/isPatient.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/permissions.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/permissions.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/permissions.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/rbac-deps.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/rbac-deps.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/rbac-deps.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/repositories.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/repositories.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/repositories.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/roles.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/roles.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/roles.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/policies/types.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/types.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/policies/types.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/rate-limit/memory-store.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/rate-limit/memory-store.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/rate-limit/memory-store.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/rate-limit/sqlite-store.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/rate-limit/sqlite-store.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/rate-limit/sqlite-store.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/rate-limit/store.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/rate-limit/store.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/rate-limit/store.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/repositories/appointment.repo.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/appointment.repo.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/repositories/appointment.repo.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/repositories/audit.repo.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/audit.repo.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/repositories/audit.repo.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/repositories/doctor.repo.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/doctor.repo.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/repositories/doctor.repo.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/repositories/patient.repo.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/patient.repo.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/repositories/patient.repo.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/repositories/prescription.repo.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/prescription.repo.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/repositories/prescription.repo.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/repositories/refreshToken.repo.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/refreshToken.repo.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/repositories/refreshToken.repo.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/repositories/user.repo.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/user.repo.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/repositories/user.repo.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/services/admin.service.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/admin.service.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/services/admin.service.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/services/api.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/api.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/services/api.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/services/appointment.service.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/appointment.service.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/services/appointment.service.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/services/auth.service.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/auth.service.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/services/auth.service.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/services/doctor.service.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/doctor.service.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/services/doctor.service.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/services/patient.service.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/patient.service.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/services/patient.service.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/services/prescription.services.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/prescription.services.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/services/prescription.services.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/services/user.service.tsx

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/user.service.tsx`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/services/user.service.tsx` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/types/next-request.d.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/types/next-request.d.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/types/next-request.d.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/utils/errors.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/errors.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/utils/errors.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/utils/hash.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/hash.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/utils/hash.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/utils/jwt.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/jwt.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/utils/jwt.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/utils/logger.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/logger.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/utils/logger.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/utils/logger_test.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/logger_test.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/utils/logger_test.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/utils/pagination.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/pagination.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/utils/pagination.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/utils/pagination_test.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/pagination_test.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/utils/pagination_test.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/utils/password.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/password.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/utils/password.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/utils/password_test.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/password_test.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/utils/password_test.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/validators/appointment.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/appointment.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/validators/appointment.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/validators/audit.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/audit.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/validators/audit.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/validators/auth.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/auth.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/validators/auth.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/validators/clinic.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/clinic.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/validators/clinic.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/validators/consent.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/consent.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/validators/consent.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/validators/consultation.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/consultation.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/validators/consultation.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/validators/doctor.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/doctor.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/validators/doctor.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/validators/prescription.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/prescription.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/validators/prescription.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: server/validators/user.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/user.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `server/validators/user.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: tailwind.config.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `tailwind.config.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `tailwind.config.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: tests/appointment.api.test.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `tests/appointment.api.test.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `tests/appointment.api.test.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: tsconfig.json

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `tsconfig.json`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `tsconfig.json` (pure rendering, IO, DB access, or runtime setup).

---

FILE: vitest.config.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `vitest.config.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `vitest.config.ts` (pure rendering, IO, DB access, or runtime setup).

---

FILE: vitest.setup.ts

Purpose:
- Project configuration, lockfile, or workspace metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `vitest.setup.ts`.

Invariants:
- Must remain consistent with the repository architecture and coding conventions.

Side effects:
- Depends on implementation in `vitest.setup.ts` (pure rendering, IO, DB access, or runtime setup).

---
