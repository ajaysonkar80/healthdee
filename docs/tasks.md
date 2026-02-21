# Tasks Backlog

## P0 — Critical
- [ ] Connect forgot/reset password UI to finalized backend contract and handle all validation codes.
- [ ] Normalize auth flows so email/phone login and signup return consistent session behavior.
- [ ] Add robust test coverage for:
  - [ ] `/api/auth/*` happy + edge paths
  - [ ] policy guards and access-control helpers
  - [ ] appointment state transitions
- [ ] Enforce rate limiting for OTP and login endpoints.

## P1 — Core Product
- [ ] Replace static/mock doctor/clinic data with repository-backed API data in all patient-facing pages.
- [ ] Complete doctor workflow pages (appointments, prescriptions, earnings, settings).
- [ ] Complete patient records/profile workflows including UX polish.
- [ ] Expand admin dashboard with actionable operational widgets and pagination/filter consistency.

## P2 — Hardening & Observability
- [ ] Add structured logging around critical service operations.
- [ ] Add API metrics instrumentation for latency and error-rate tracking.
- [ ] Improve resilience patterns (retry-safe boundaries, clearer operational errors).

## Documentation & Process
- [ ] Keep `docs/api-spec.md` updated whenever route contracts change.
- [ ] Keep `docs/decisions.md` updated with new architecture/security decisions.
- [ ] Add release checklist execution logs per milestone.


## Completed Tasks
- [x] Auth (OTP-based)
- [x] Roles (patient / doctor / admin)
- [x] Doctor verification
- [x] Appointments API
- [x] Dashboard layouts
- [x] Database schema
- [x] Repository layer
- [x] Service layer
- [x] Domain layer

For a fuller completion inventory, see `docs/completed-tasks.md`.
