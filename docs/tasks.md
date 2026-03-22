# Tasks Backlog

_Last updated: 2026-03-22_

## P0 — Critical (Do First)
- [ ] Close auth reliability gaps:
  - [ ] Connect forgot/reset UI flows to finalized API contracts.
  - [ ] Align OTP/email login+signup session behavior and error semantics.
  - [ ] Add endpoint-level rate limiting for OTP, login, and reset attempts.
- [ ] Lock appointment state integrity across roles:
  - [ ] Enforce allowed transitions (confirm/reschedule/cancel/complete) with policy checks.
  - [ ] Ensure doctor and patient UI timelines reflect identical appointment status changes.
- [ ] Expand tests for high-risk paths:
  - [ ] `/api/auth/*` happy + edge cases.
  - [ ] `/api/appointments/*` state transition and permission checks.
  - [ ] authz policy guards and access helper coverage.

## P1 — Core Product Completion
- [ ] Replace remaining static/mock data with repository-backed API data (doctors/clinics/home discovery).
- [ ] Complete doctor workflows (appointments detail actions, prescriptions, earnings, onboarding/verification edges).
- [ ] Complete patient workflows (records, profile, notifications, emergency contacts).
- [ ] Finish admin operations UX (dashboard metrics, consistent filters, pagination, bulk actions where needed).

## P2 — Hardening & Observability
- [ ] Add structured logging for service and route-level failures.
- [ ] Add API metrics instrumentation for latency/error-rate across core endpoints.
- [ ] Improve resilience patterns (typed operational errors, retry-safe boundaries, graceful degradation).
- [ ] Run and track pre-release quality gate:
  - [ ] `npm run typecheck`
  - [ ] `npm run lint`
  - [ ] `npm run test`
  - [ ] `npm run build`

## Documentation & Process
- [ ] Keep `docs/api-spec.md` updated whenever route contracts change.
- [ ] Keep `docs/decisions.md` updated for architecture/security choices.
- [ ] Keep `docs/folder-structure.md` and `docs/ai-codebase-map.md` in sync after major file churn.
- [ ] Add milestone release check logs in `docs/changelog.md` or a release note doc.

## Completed Foundation Work (Snapshot)
- [x] OTP-based authentication baseline.
- [x] Role foundations (`patient` / `doctor` / `admin`).
- [x] Doctor verification baseline flow.
- [x] Appointment API baseline.
- [x] Dashboard layout scaffolding.
- [x] Database schema + repository + service + domain layering.
