# AI Codebase Map & 2-Week Prioritized Completion Plan

> Update note (2026-03-19): Refreshed structure references and regenerated the per-file index to match the current tracked repository state.

## Incremental Refresh Notes (2026-03-19)
- Regenerated `docs/folder-structure.md` from current `git ls-files` output.
- Rebuilt per-file analysis index in this document for all 440 tracked files.
- Kept implementation guidance aligned with the current App Router + server-layer architecture.

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
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/details.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/details.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: .VSCodeCounter/2026-02-11_18-50-40/diff-details.md

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/diff-details.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/diff-details.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: .VSCodeCounter/2026-02-11_18-50-40/diff.csv

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/diff.csv`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/diff.csv` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: .VSCodeCounter/2026-02-11_18-50-40/diff.md

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/diff.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/diff.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: .VSCodeCounter/2026-02-11_18-50-40/diff.txt

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/diff.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/diff.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: .VSCodeCounter/2026-02-11_18-50-40/results.csv

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/results.csv`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/results.csv` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/results.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: .VSCodeCounter/2026-02-11_18-50-40/results.md

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/results.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/results.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: .VSCodeCounter/2026-02-11_18-50-40/results.txt

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.VSCodeCounter/2026-02-11_18-50-40/results.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.VSCodeCounter/2026-02-11_18-50-40/results.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: .gitignore

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `.gitignore`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.gitignore` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `.vscode/settings.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: AGENTS.md

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `AGENTS.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `AGENTS.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: README.md

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `README.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `README.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: ai-tree/tree-app.txt

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-app.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `ai-tree/tree-app.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: ai-tree/tree-db.txt

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-db.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `ai-tree/tree-db.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: ai-tree/tree-hooks.txt

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-hooks.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `ai-tree/tree-hooks.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: ai-tree/tree-lib.txt

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-lib.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `ai-tree/tree-lib.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: ai-tree/tree-root.txt

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-root.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `ai-tree/tree-root.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: ai-tree/tree-server.txt

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ai-tree/tree-server.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `ai-tree/tree-server.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: ajaygit.txt

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ajaygit.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `ajaygit.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: ajaygit.txt.pub

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `ajaygit.txt.pub`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `ajaygit.txt.pub` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/(login-signup)/forgot-password/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/forgot-password/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/forgot-password/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/(login-signup)/layout.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/layout.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/layout.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/(login-signup)/login/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/login/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/login/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/(login-signup)/reset-password/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/reset-password/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/reset-password/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/(login-signup)/signup/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/signup/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/signup/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/(login-signup)/verify-email/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/(login-signup)/verify-email/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/(login-signup)/verify-email/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/about/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/about/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/about/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/doctor-privacy-policy/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/doctor-privacy-policy/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/doctor-privacy-policy/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/healthcare-provider-terms/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/healthcare-provider-terms/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/healthcare-provider-terms/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/help/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/help/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/help/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/policies/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/policies/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/policies/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/privacy-policy/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/privacy-policy/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/privacy-policy/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/select-role/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/select-role/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/select-role/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/(public)/terms-and-conditions/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/(public)/terms-and-conditions/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/(public)/terms-and-conditions/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/Header.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/Header.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/Header.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/appointment-requests/AppointmentRequestsClient.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/appointment-requests/AppointmentRequestsClient.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/appointment-requests/AppointmentRequestsClient.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/appointment-requests/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/appointment-requests/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/appointment-requests/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/clinics/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/clinics/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/clinics/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/dashboard/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/dashboard/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/dashboard/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/doctors-verification/DoctorsVerificationClient.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctors-verification/DoctorsVerificationClient.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/doctors-verification/DoctorsVerificationClient.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/doctors-verification/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctors-verification/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/doctors-verification/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/doctors/DoctorsPageClient.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctors/DoctorsPageClient.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/doctors/DoctorsPageClient.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/doctors/[doctorId]/edit/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctors/[doctorId]/edit/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/doctors/[doctorId]/edit/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/doctors/create/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctors/create/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/doctors/create/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/doctors/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/doctors/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/doctors/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/layout.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/layout.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/layout.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/patients/PatientsClientPage.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/patients/PatientsClientPage.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/patients/PatientsClientPage.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/patients/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/patients/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/patients/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/settings/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/settings/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/settings/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/admin/users/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/admin/users/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/admin/users/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/admin/metrics/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/admin/metrics/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/admin/metrics/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/appointments/[id]/cancel/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/cancel/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/cancel/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/appointments/[id]/complete/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/complete/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/complete/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/appointments/[id]/confirm/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/confirm/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/confirm/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/appointments/[id]/reschedule/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/reschedule/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/reschedule/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/appointments/[id]/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/[id]/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/appointments/[id]/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/appointments/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/appointments/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/appointments/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/auth/login/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/login/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/auth/login/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/auth/logout/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/logout/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/auth/logout/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/auth/me/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/me/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/auth/me/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/auth/otp/request/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/otp/request/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/auth/otp/request/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/auth/otp/verify/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/otp/verify/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/auth/otp/verify/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/auth/password/forgot/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/password/forgot/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/auth/password/forgot/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/auth/password/reset/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/password/reset/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/auth/password/reset/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/auth/refresh/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/refresh/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/auth/refresh/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/auth/register/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/auth/register/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/auth/register/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/doctor/availability/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctor/availability/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/doctor/availability/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/doctors/[id]/appointments-public/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/[id]/appointments-public/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/doctors/[id]/appointments-public/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/doctors/[id]/availability-public/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/[id]/availability-public/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/doctors/[id]/availability-public/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/doctors/[id]/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/[id]/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/doctors/[id]/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/doctors/[id]/verify/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/[id]/verify/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/doctors/[id]/verify/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/doctors/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/doctors/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/doctors/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/files/[...path]/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/files/[...path]/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/files/[...path]/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/health/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/health/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/health/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/patients/[id]/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/patients/[id]/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/patients/[id]/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/patients/me/preferences/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/patients/me/preferences/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/patients/me/preferences/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/patients/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/patients/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/patients/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/users/[id]/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/users/[id]/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/users/[id]/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/api/users/route.ts

Purpose:
- Next.js App Router API handler.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/api/users/route.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/api/users/route.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/clinics/[id]/ClinicDetails.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicDetails.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicDetails.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/clinics/[id]/ClinicDoctors.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicDoctors.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicDoctors.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/clinics/[id]/ClinicHero.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicHero.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicHero.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/clinics/[id]/ClinicPageLayout.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicPageLayout.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicPageLayout.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/clinics/[id]/ClinicServices.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicServices.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicServices.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/clinics/[id]/ClinicSidebar.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicSidebar.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicSidebar.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/clinics/[id]/ClinicSummary.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/ClinicSummary.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/clinics/[id]/ClinicSummary.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/clinics/[id]/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/[id]/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/clinics/[id]/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/clinics/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/clinics/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/clinics/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/context/AuthContext.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/context/AuthContext.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/context/AuthContext.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/appointments/AppointmentQueueSkeleton.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/appointments/AppointmentQueueSkeleton.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/appointments/AppointmentQueueSkeleton.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/appointments/[id]/AppointmentsDetailsSkeleton.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/appointments/[id]/AppointmentsDetailsSkeleton.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/appointments/[id]/AppointmentsDetailsSkeleton.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/appointments/[id]/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/appointments/[id]/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/appointments/[id]/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/appointments/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/appointments/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/appointments/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/availability/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/availability/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/availability/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/dashboard/error.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/dashboard/error.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/dashboard/error.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/dashboard/loading.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/dashboard/loading.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/dashboard/loading.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/dashboard/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/dashboard/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/dashboard/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/earnings/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/earnings/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/earnings/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/layout.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/layout.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/layout.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/onboarding/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/onboarding/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/onboarding/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/prescriptions/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/prescriptions/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/prescriptions/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/settings/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/settings/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/settings/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctor/verification/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctor/verification/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctor/verification/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctors/[publicId]/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctors/[publicId]/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctors/[publicId]/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctors/booking/confirmation/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctors/booking/confirmation/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctors/booking/confirmation/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctors/booking/layout.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctors/booking/layout.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctors/booking/layout.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/doctors/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/doctors/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/doctors/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/error.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/error.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/error.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/favicon.ico

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/favicon.ico`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/favicon.ico` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/globals.css

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/globals.css`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/globals.css` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/layout.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/layout.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/layout.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/loading.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/loading.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/loading.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/notfound.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/notfound.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/notfound.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/appointments/book/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/appointments/book/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/appointments/book/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/appointments/loading.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/appointments/loading.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/appointments/loading.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/appointments/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/appointments/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/appointments/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/danger-zone/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/danger-zone/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/danger-zone/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/emergency-contacts/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/emergency-contacts/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/emergency-contacts/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/layout.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/layout.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/layout.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/notifications/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/notifications/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/notifications/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/profile/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/profile/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/profile/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/patient/records/page.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/patient/records/page.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/patient/records/page.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/services/auth.service.ts

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/services/auth.service.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/services/auth.service.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: app/types/auth.tsx

Purpose:
- Next.js route, layout, or page component.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `app/types/auth.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `app/types/auth.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/about-hero/AboutHero.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/about-hero/AboutHero.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/about-hero/AboutHero.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/about-hero/HeroContent.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/about-hero/HeroContent.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/about-hero/HeroContent.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/core-values/CoreValues.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/core-values/CoreValues.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/core-values/CoreValues.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/core-values/ValueCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/core-values/ValueCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/core-values/ValueCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/final-cta/FinalCTA.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/final-cta/FinalCTA.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/final-cta/FinalCTA.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/impact-stats/ImpactCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/impact-stats/ImpactCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/impact-stats/ImpactCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/impact-stats/StatCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/impact-stats/StatCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/impact-stats/StatCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/our-story/ImpactInlineStats.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/our-story/ImpactInlineStats.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/our-story/ImpactInlineStats.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/our-story/OurStory.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/our-story/OurStory.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/our-story/OurStory.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/our-story/StoryContent.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/our-story/StoryContent.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/our-story/StoryContent.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/our-story/StoryImageCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/our-story/StoryImageCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/our-story/StoryImageCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/trust-badges/BadgeItem.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/trust-badges/BadgeItem.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/trust-badges/BadgeItem.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/about/trust-badges/TrustBadges.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/about/trust-badges/TrustBadges.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/about/trust-badges/TrustBadges.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/AdminSidebar.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/AdminSidebar.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/AdminSidebar.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/AdminTopBar.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/AdminTopBar.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/AdminTopBar.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/RecentActivity.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/RecentActivity.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/RecentActivity.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/StatsCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/StatsCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/StatsCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/StatsGrid.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/StatsGrid.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/StatsGrid.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/appointment-requests/AppointmentActionsMenu.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentActionsMenu.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentActionsMenu.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/appointment-requests/AppointmentFilters.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentFilters.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentFilters.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/appointment-requests/AppointmentPagination.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentPagination.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentPagination.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/appointment-requests/AppointmentStatusBadge.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentStatusBadge.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentStatusBadge.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/appointment-requests/AppointmentTable.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentTable.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentTable.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/appointment-requests/AppointmentTableRow.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/AppointmentTableRow.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/AppointmentTableRow.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/appointment-requests/PatientInfoCell.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/appointment-requests/PatientInfoCell.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/appointment-requests/PatientInfoCell.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/clinic/ClinicPagination.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicPagination.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicPagination.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/clinic/ClinicStatCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicStatCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicStatCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/clinic/ClinicStats.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicStats.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicStats.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/clinic/ClinicStatusBadge.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicStatusBadge.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicStatusBadge.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/clinic/ClinicTable.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicTable.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicTable.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/clinic/ClinicTableRow.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/clinic/ClinicTableRow.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/clinic/ClinicTableRow.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor-verification/DoctorsInfoCell.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/DoctorsInfoCell.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/DoctorsInfoCell.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor-verification/VerificationFilters.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationFilters.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationFilters.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor-verification/VerificationPagination.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationPagination.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationPagination.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor-verification/VerificationStatusBadge.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationStatusBadge.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationStatusBadge.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor-verification/VerificationTable.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationTable.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationTable.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor-verification/VerificationTableRow.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationTableRow.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationTableRow.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor-verification/VerificationsActionsMenu.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor-verification/VerificationsActionsMenu.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor-verification/VerificationsActionsMenu.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor/BulkHelpCards.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/BulkHelpCards.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor/BulkHelpCards.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor/DoctorDeleteModal.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorDeleteModal.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorDeleteModal.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor/DoctorFilters.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorFilters.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorFilters.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor/DoctorForm.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorForm.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorForm.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor/DoctorPagination.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorPagination.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorPagination.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor/DoctorRowAction.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorRowAction.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorRowAction.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor/DoctorTable.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/DoctorTable.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor/DoctorTable.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor/StatsCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/StatsCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor/StatsCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/doctor/types.ts

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/doctor/types.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/doctor/types.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/patient/PatientFilter.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/patient/PatientFilter.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/patient/PatientFilter.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/patient/PatientPagination.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/patient/PatientPagination.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/patient/PatientPagination.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/patient/PatientStatsCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/patient/PatientStatsCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/patient/PatientStatsCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/admin/patient/PatientTable.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/admin/patient/PatientTable.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/admin/patient/PatientTable.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/EmailLoginStep.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/EmailLoginStep.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/EmailLoginStep.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/EmailSignupStep.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/EmailSignupStep.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/EmailSignupStep.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/EmailVerificationStep.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/EmailVerificationStep.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/EmailVerificationStep.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/ForgetPasswordForm.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/ForgetPasswordForm.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/ForgetPasswordForm.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/LoginForm.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/LoginForm.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/LoginForm.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/LoginOtpStep.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/LoginOtpStep.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/LoginOtpStep.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/LogoutButton.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/LogoutButton.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/LogoutButton.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/OtpStep.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/OtpStep.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/OtpStep.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/PhoneLoginStep.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/PhoneLoginStep.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/PhoneLoginStep.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/PhoneSignupStep.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/PhoneSignupStep.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/PhoneSignupStep.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/ResetPasswordForm.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/ResetPasswordForm.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/ResetPasswordForm.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/SelectRoleForm.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/SelectRoleForm.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/SelectRoleForm.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/auth/SignupForm.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/auth/SignupForm.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/auth/SignupForm.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/DoctorCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/DoctorCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/DoctorCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/PrescriptionForm.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/PrescriptionForm.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/PrescriptionForm.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/appointment/AppointmentQueue.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/appointment/AppointmentQueue.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/appointment/AppointmentQueue.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/appointment/appointmentSlot.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/appointment/appointmentSlot.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/appointment/appointmentSlot.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/AboutDoctor.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/AboutDoctor.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/AboutDoctor.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/BookingPanel.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/BookingPanel.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/BookingPanel.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/ClinicInfo.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/ClinicInfo.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/ClinicInfo.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/DoctorProfile.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/DoctorProfile.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/DoctorProfile.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/DoctorStats.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/DoctorStats.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/DoctorStats.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/Reviews.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/Reviews.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/Reviews.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/confirmation/AppointmentMeta.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/AppointmentMeta.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/AppointmentMeta.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/confirmation/BookingActions.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/BookingActions.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/BookingActions.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/confirmation/BookingConfirmationHero.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/BookingConfirmationHero.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/BookingConfirmationHero.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/confirmation/BookingSummaryCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/BookingSummaryCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/BookingSummaryCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/confirmation/DoctorSummary.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/DoctorSummary.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/DoctorSummary.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/confirmation/ExpectationStep.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/ExpectationStep.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/ExpectationStep.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/confirmation/SupportFooter.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/SupportFooter.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/SupportFooter.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/booking/confirmation/WhatToExpect.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/booking/confirmation/WhatToExpect.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/booking/confirmation/WhatToExpect.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/dashboard/CurrentlyConsulting.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/CurrentlyConsulting.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/dashboard/CurrentlyConsulting.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/dashboard/Header.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/Header.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/dashboard/Header.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/dashboard/Sidebar.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/Sidebar.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/dashboard/Sidebar.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/dashboard/StatCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/StatCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/dashboard/StatCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/dashboard/StatsSection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/StatsSection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/dashboard/StatsSection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/dashboard/UrgentNotifications.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/dashboard/UrgentNotifications.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/dashboard/UrgentNotifications.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/earnings/EarningsSummary.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/earnings/EarningsSummary.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/earnings/EarningsSummary.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/earnings/EarningsSummarySkeleton.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/earnings/EarningsSummarySkeleton.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/earnings/EarningsSummarySkeleton.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/earnings/EarningsTable.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/earnings/EarningsTable.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/earnings/EarningsTable.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/earnings/EarningsTableSkeleton.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/earnings/EarningsTableSkeleton.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/earnings/EarningsTableSkeleton.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/prescriptions/PrescriptionsTable.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/prescriptions/PrescriptionsTable.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/prescriptions/PrescriptionsTable.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/settings/ClinicSettings.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/settings/ClinicSettings.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/settings/ClinicSettings.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/settings/NotificationSettings.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/settings/NotificationSettings.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/settings/NotificationSettings.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/settings/ProfileSettings.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/settings/ProfileSettings.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/settings/ProfileSettings.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctor/settings/SecuritySettings.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctor/settings/SecuritySettings.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctor/settings/SecuritySettings.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctors/DoctorsCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctors/DoctorsCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctors/DoctorsFilter.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsFilter.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctors/DoctorsFilter.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctors/DoctorsList.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsList.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctors/DoctorsList.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctors/DoctorsPagination.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsPagination.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctors/DoctorsPagination.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/doctors/DoctorsTopBar.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/doctors/DoctorsTopBar.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/doctors/DoctorsTopBar.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/help/FAQAccordion.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/help/FAQAccordion.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/help/FAQAccordion.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/help/HelpTopicCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/help/HelpTopicCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/help/HelpTopicCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/home/CTASection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/CTASection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/home/CTASection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/home/HeroSection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/HeroSection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/home/HeroSection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/home/HowItWorksSection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/HowItWorksSection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/home/HowItWorksSection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/home/SpecialtiesSection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/SpecialtiesSection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/home/SpecialtiesSection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/home/TopRatedDoctors.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/TopRatedDoctors.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/home/TopRatedDoctors.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/home/TrustStatsSection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/TrustStatsSection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/home/TrustStatsSection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/home/WhyHealthDeeSection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/home/WhyHealthDeeSection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/home/WhyHealthDeeSection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/layout/Footer.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/layout/Footer.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/layout/Footer.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/layout/Header.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/layout/Header.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/layout/Header.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/AddEmergencyContactForm.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/AddEmergencyContactForm.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/AddEmergencyContactForm.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/DangerZone.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/DangerZone.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/DangerZone.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/EditProfileModal.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/EditProfileModal.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/EditProfileModal.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/EmergencyContactItem.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/EmergencyContactItem.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/EmergencyContactItem.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/EmergencyContactSection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/EmergencyContactSection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/EmergencyContactSection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/NotificationPrivacySection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/NotificationPrivacySection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/NotificationPrivacySection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/PatientInfoCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PatientInfoCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/PatientInfoCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/PatientSideBar.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PatientSideBar.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/PatientSideBar.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/PatientTopNav.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PatientTopNav.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/PatientTopNav.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/PersonalInfoFieldCard.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PersonalInfoFieldCard.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/PersonalInfoFieldCard.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/PersonalInformationSection.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/PersonalInformationSection.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/PersonalInformationSection.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/ProfileHeader.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/ProfileHeader.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/ProfileHeader.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/patient/ToggleSettingsItem.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/patient/ToggleSettingsItem.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/patient/ToggleSettingsItem.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/PasswordInput.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/PasswordInput.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/PasswordInput.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/RadioGroup.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/RadioGroup.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/RadioGroup.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/alert.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/alert.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/alert.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/avatar.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/avatar.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/avatar.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/badge.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/badge.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/badge.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/button.test.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/button.test.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/button.test.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/button.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/button.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/button.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/card.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/card.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/card.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/dialog.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/dialog.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/dialog.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/dropdown-menu.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/dropdown-menu.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/dropdown-menu.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/input.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/input.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/input.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/pagination.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/pagination.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/pagination.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/select.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/select.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/select.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/switch.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/switch.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/switch.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/table.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/table.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/table.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/ui/tooltip.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/ui/tooltip.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/ui/tooltip.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/upload/AvatarUploader.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/upload/AvatarUploader.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/upload/AvatarUploader.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: components/upload/ImageUploader.tsx

Purpose:
- Reusable UI/component module.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `components/upload/ImageUploader.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `components/upload/ImageUploader.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: currentlyWorking.md

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `currentlyWorking.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `currentlyWorking.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: db/index.ts

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `db/index.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `db/index.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: db/schema.ts

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `db/schema.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `db/schema.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: db/turso.tsx

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `db/turso.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `db/turso.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/ai-codebase-map.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/ai-codebase-map.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/ai-codebase-map.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/api-spec.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/api-spec.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/api-spec.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/architecture.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/architecture.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/architecture.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/auth-flow.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/auth-flow.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/auth-flow.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/changelog.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/changelog.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/changelog.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/completed-tasks.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/completed-tasks.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/completed-tasks.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/decisions.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/decisions.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/decisions.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/folder-structure.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/folder-structure.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/folder-structure.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/product-requirements-completed.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/product-requirements-completed.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/product-requirements-completed.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/roadmap.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/roadmap.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/roadmap.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: docs/tasks.md

Purpose:
- Project documentation and navigation metadata.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `docs/tasks.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `docs/tasks.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle.config.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0000_purple_tiger_shark.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0000_purple_tiger_shark.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0000_purple_tiger_shark.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0001_exotic_dakota_north.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0001_exotic_dakota_north.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0001_exotic_dakota_north.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0002_breezy_shape.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0002_breezy_shape.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0002_breezy_shape.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0003_easy_omega_flight.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0003_easy_omega_flight.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0003_easy_omega_flight.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0004_melodic_toad_men.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0004_melodic_toad_men.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0004_melodic_toad_men.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0005_military_otto_octavius.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0005_military_otto_octavius.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0005_military_otto_octavius.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0006_many_arachne.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0006_many_arachne.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0006_many_arachne.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0007_ambiguous_shadow_king.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0007_ambiguous_shadow_king.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0007_ambiguous_shadow_king.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0008_amusing_toad.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0008_amusing_toad.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0008_amusing_toad.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0009_overconfident_pandemic.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0009_overconfident_pandemic.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0009_overconfident_pandemic.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0010_mushy_whirlwind.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0010_mushy_whirlwind.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0010_mushy_whirlwind.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0011_spotty_rage.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0011_spotty_rage.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0011_spotty_rage.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/0012_slippery_lady_vermin.sql

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/0012_slippery_lady_vermin.sql`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/0012_slippery_lady_vermin.sql` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0000_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0000_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0000_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0001_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0001_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0001_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0002_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0002_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0002_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0003_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0003_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0003_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0004_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0004_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0004_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0005_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0005_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0005_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0006_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0006_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0006_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0007_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0007_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0007_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0008_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0008_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0008_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0009_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0009_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0009_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0010_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0010_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0010_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0011_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0011_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0011_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/0012_snapshot.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/0012_snapshot.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/0012_snapshot.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: drizzle/meta/_journal.json

Purpose:
- Database schema or migration artifact.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `drizzle/meta/_journal.json`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `drizzle/meta/_journal.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: eslint.config.mjs

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `eslint.config.mjs`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `eslint.config.mjs` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: export-tree-for-ai.ps1

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `export-tree-for-ai.ps1`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `export-tree-for-ai.ps1` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: hooks/useAppointment.tsx

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `hooks/useAppointment.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `hooks/useAppointment.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: hooks/useAuth.tsx

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `hooks/useAuth.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `hooks/useAuth.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: hooks/useDebounce.tsx

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `hooks/useDebounce.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `hooks/useDebounce.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: hooks/useRole.tsx

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `hooks/useRole.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `hooks/useRole.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: lib/auth.ts

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/auth.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `lib/auth.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: lib/constant.tsx

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/constant.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `lib/constant.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: lib/routes.tsx

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/routes.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `lib/routes.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: lib/utils.test.ts

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/utils.test.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `lib/utils.test.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: lib/utils.ts

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/utils.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `lib/utils.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: lib/utils/slot.ts

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/utils/slot.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `lib/utils/slot.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: lib/validators.tsx

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `lib/validators.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `lib/validators.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `next.config.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `package-lock.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `package.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: planning.md

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `planning.md`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `planning.md` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: postcss.config.mjs

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `postcss.config.mjs`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `postcss.config.mjs` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/avatar.jpg

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/avatar.jpg`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/avatar.jpg` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/avatar.png

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/avatar.png`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/avatar.png` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/clinic-logo.jpg

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/clinic-logo.jpg`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/clinic-logo.jpg` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/clinic.jpg

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/clinic.jpg`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/clinic.jpg` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/doctor-1.jpg

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/doctor-1.jpg`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/doctor-1.jpg` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/doctor-2.jpg

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/doctor-2.jpg`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/doctor-2.jpg` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/doctors.jpg

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/doctors.jpg`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/doctors.jpg` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/fonts/Geist-Bold.ttf

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/fonts/Geist-Bold.ttf`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/fonts/Geist-Bold.ttf` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/fonts/Geist-Regular.ttf

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/fonts/Geist-Regular.ttf`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/fonts/Geist-Regular.ttf` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/fonts/GeistMono-Regular.ttf

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/fonts/GeistMono-Regular.ttf`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/fonts/GeistMono-Regular.ttf` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/hospital.jpg

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/hospital.jpg`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/hospital.jpg` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: public/water-flask.png

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `public/water-flask.png`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `public/water-flask.png` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: scripts/get-s3.ts

Purpose:
- Developer automation script.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/get-s3.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `scripts/get-s3.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: scripts/presigned.ts

Purpose:
- Developer automation script.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/presigned.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `scripts/presigned.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: scripts/seed.ts

Purpose:
- Developer automation script.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/seed.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `scripts/seed.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: scripts/seedAvailability.ts

Purpose:
- Developer automation script.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/seedAvailability.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `scripts/seedAvailability.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: scripts/test-s3.ts

Purpose:
- Developer automation script.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/test-s3.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `scripts/test-s3.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: scripts/test.txt

Purpose:
- Developer automation script.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/test.txt`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `scripts/test.txt` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: scripts/wifi-network-warning.js

Purpose:
- Developer automation script.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `scripts/wifi-network-warning.js`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `scripts/wifi-network-warning.js` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/actions/emergencyContacts.actions.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/actions/emergencyContacts.actions.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/actions/emergencyContacts.actions.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/actions/patient.actions.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/actions/patient.actions.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/actions/patient.actions.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/actions/patientProfile.actions.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/actions/patientProfile.actions.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/actions/patientProfile.actions.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/actions/patientsProfile.actions.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/actions/patientsProfile.actions.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/actions/patientsProfile.actions.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/actions/uploadAvatar.actions.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/actions/uploadAvatar.actions.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/actions/uploadAvatar.actions.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/constants/otp-channel.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/constants/otp-channel.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/constants/otp-channel.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/constants/user-role.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/constants/user-role.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/constants/user-role.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/constants/user-status.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/constants/user-status.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/constants/user-status.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/db/types.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/db/types.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/db/types.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/appointment.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/appointment.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/appointment.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/audit.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/audit.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/audit.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/auth.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/auth.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/auth.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/clinic.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/clinic.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/clinic.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/consent.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/consent.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/consent.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/consultation.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/consultation.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/consultation.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/doctor.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/doctor.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/doctor.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/erasure.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/erasure.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/erasure.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/index.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/index.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/index.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/prescription.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/prescription.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/prescription.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/domain/user.domain.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/domain/user.domain.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/domain/user.domain.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/http/response.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/http/response.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/http/response.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/http/route-helpers.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/http/route-helpers.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/http/route-helpers.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/middleware/rate-limit.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/middleware/rate-limit.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/middleware/rate-limit.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/ability.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/ability.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/ability.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/access/canAccess.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccess.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/access/canAccess.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/access/canAccessAppointment.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccessAppointment.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/access/canAccessAppointment.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/access/canAccessPatient.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccessPatient.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/access/canAccessPatient.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/access/canAccessPrescription.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccessPrescription.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/access/canAccessPrescription.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/access/canAccessUser.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/access/canAccessUser.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/access/canAccessUser.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/fields/patient.fields.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/fields/patient.fields.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/fields/patient.fields.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/guards/isAdmin.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/guards/isAdmin.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/guards/isAdmin.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/guards/isDoctor.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/guards/isDoctor.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/guards/isDoctor.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/guards/isPatient.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/guards/isPatient.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/guards/isPatient.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/permissions.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/permissions.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/permissions.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/rbac-deps.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/rbac-deps.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/rbac-deps.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/repositories.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/repositories.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/repositories.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/roles.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/roles.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/roles.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/policies/types.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/policies/types.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/policies/types.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/rate-limit/memory-store.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/rate-limit/memory-store.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/rate-limit/memory-store.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/rate-limit/sqlite-store.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/rate-limit/sqlite-store.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/rate-limit/sqlite-store.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/rate-limit/store.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/rate-limit/store.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/rate-limit/store.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/repositories/appointment.repo.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/appointment.repo.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/repositories/appointment.repo.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/repositories/audit.repo.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/audit.repo.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/repositories/audit.repo.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/repositories/doctor.repo.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/doctor.repo.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/repositories/doctor.repo.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/repositories/doctor_earning.repo.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/doctor_earning.repo.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/repositories/doctor_earning.repo.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/repositories/patient.repo.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/patient.repo.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/repositories/patient.repo.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/repositories/prescription.repo.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/prescription.repo.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/repositories/prescription.repo.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/repositories/refreshToken.repo.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/refreshToken.repo.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/repositories/refreshToken.repo.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/repositories/user.repo.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/repositories/user.repo.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/repositories/user.repo.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/services/admin.service.tsx

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/admin.service.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/services/admin.service.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/services/api.tsx

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/api.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/services/api.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/services/appointment.service.tsx

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/appointment.service.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/services/appointment.service.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/services/auth.service.tsx

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/auth.service.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/services/auth.service.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/services/doctor.service.tsx

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/doctor.service.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/services/doctor.service.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/services/doctor_earning.service.tsx

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/doctor_earning.service.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/services/doctor_earning.service.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/services/patient.service.tsx

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/patient.service.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/services/patient.service.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/services/prescription.services.tsx

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/prescription.services.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/services/prescription.services.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/services/user.service.tsx

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/services/user.service.tsx`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/services/user.service.tsx` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/storage/getFileStream.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/storage/getFileStream.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/storage/getFileStream.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/storage/imageUpload.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/storage/imageUpload.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/storage/imageUpload.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/storage/s3.client.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/storage/s3.client.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/storage/s3.client.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/types/next-request.d.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/types/next-request.d.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/types/next-request.d.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/utils/errors.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/errors.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/utils/errors.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/utils/hash.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/hash.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/utils/hash.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/utils/jwt.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/jwt.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/utils/jwt.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/utils/logger.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/logger.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/utils/logger.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/utils/logger_test.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/logger_test.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/utils/logger_test.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/utils/pagination.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/pagination.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/utils/pagination.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/utils/pagination_test.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/pagination_test.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/utils/pagination_test.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/utils/password.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/password.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/utils/password.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/utils/password_test.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/utils/password_test.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/utils/password_test.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/validators/appointment.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/appointment.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/validators/appointment.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/validators/audit.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/audit.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/validators/audit.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/validators/auth.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/auth.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/validators/auth.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/validators/clinic.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/clinic.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/validators/clinic.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/validators/consent.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/consent.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/validators/consent.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/validators/consultation.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/consultation.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/validators/consultation.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/validators/doctor.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/doctor.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/validators/doctor.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/validators/prescription.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/prescription.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/validators/prescription.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: server/validators/user.ts

Purpose:
- Backend/domain/service/repository implementation.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `server/validators/user.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `server/validators/user.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `tailwind.config.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: tests/appointment.api.test.ts

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `tests/appointment.api.test.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `tests/appointment.api.test.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `tsconfig.json` (pure rendering, IO, DB access, runtime setup, or static metadata).

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
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `vitest.config.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
FILE: vitest.setup.ts

Purpose:
- Project source, asset, or metadata file.

Inputs:
- Determined by imports/callers for this file within its module boundary.

Outputs:
- Exposes behavior, UI, or configuration consumed by adjacent layers.

Dependencies:
- See direct imports/usages in `vitest.setup.ts`.

Invariants:
- Must remain consistent with repository architecture, coding conventions, and auth/response wrappers where applicable.

Side effects:
- Depends on implementation in `vitest.setup.ts` (pure rendering, IO, DB access, runtime setup, or static metadata).

---
