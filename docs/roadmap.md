# Healthdee Product Roadmap

_Last updated: 2026-02-18_

## Vision
Healthdee is evolving into a role-aware healthcare platform where patients can discover and book care, doctors can operate their practice workflows, and administrators can manage compliance and operations from a single system.

## Current State Snapshot
- Next.js App Router application with patient, doctor, admin, and public route segments.
- API-first backend in `app/api/*` with service/domain/repository layering.
- Authentication supports email + password and OTP-based phone flows.
- Core entities and healthcare data model are defined in Drizzle schema + migrations.

## Roadmap (Prioritized)

### Phase 1 — Platform Reliability (Now)
- Harden authentication and password-reset UX/API parity.
- Ensure consistent validation and error envelopes across all API routes.
- Expand automated coverage for auth, policies, and critical route handlers.
- Stabilize typecheck/lint/test/build gate for release confidence.

### Phase 2 — Core Care Workflows (Next)
- Complete patient appointment lifecycle (book → confirm → complete/cancel).
- Complete doctor-side operational pages (appointments, earnings, prescriptions).
- Replace remaining static/mock clinic/doctor data with API-backed data.
- Improve patient profile and records workflows with ABHA/FHIR-related integration points.

### Phase 3 — Admin & Operations (Near-Term)
- Finish admin dashboards with complete metrics and actionable tables.
- Improve doctor verification tooling and approval/rejection auditability.
- Add operational visibility (activity timelines, status tracking, better filtering/search).
- Add robust guardrails for account deactivation/recovery and user lifecycle management.

### Phase 4 — Security, Compliance, and Observability
- Roll out stronger rate limiting and abuse prevention across auth endpoints.
- Enhance audit trails and domain-level business event logging.
- Expand consent/erasure workflows and compliance review tooling.
- Add operational telemetry for API latency/error rates and failed auth patterns.

### Phase 5 — Release Readiness
- Pre-release verification gate: typecheck, lint, tests, production build.
- Documentation hardening for contributors and operators.
- Performance tuning for high-traffic patient discovery and booking flows.
- Define incident response and rollback playbook for production deployments.

## Suggested Success Metrics
- Auth success/failure ratio and refresh-token stability.
- Appointment conversion rate (booked → completed).
- Doctor verification turnaround time.
- API error-rate trend and p95 latency by domain.
- Test coverage trend for critical auth/booking/admin paths.
