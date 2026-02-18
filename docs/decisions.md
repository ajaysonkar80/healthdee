# Architecture & Product Decisions (ADR-lite)

## Decision 001 — Use Next.js App Router as Full-Stack Host
- **Status:** Accepted
- **Context:** Need role-based UI + API in one deployable app.
- **Decision:** Keep route handlers in `app/api/*` with App Router pages/components.
- **Consequence:** Faster iteration and shared TypeScript context, with need for strict layering discipline.

## Decision 002 — Enforce Service/Domain/Repository Separation
- **Status:** Accepted
- **Context:** Healthcare workflows require explicit business-rule boundaries and auditable logic.
- **Decision:** Route -> service -> domain -> repository structure is mandatory for new features.
- **Consequence:** Slightly more boilerplate but clearer ownership and safer refactoring.

## Decision 003 — Standardize API Response Envelopes
- **Status:** Accepted
- **Context:** Frontend and integrations require predictable shapes.
- **Decision:** Use centralized `success(...)` and `error(...)` response helpers.
- **Consequence:** Easier client handling and reduced accidental contract drift.

## Decision 004 — JWT Access + Refresh Token Session Model
- **Status:** Accepted
- **Context:** Need stateless auth checks with renewable sessions.
- **Decision:** Use short-lived access tokens + refresh flow, persisted in HTTP-only cookies.
- **Consequence:** Better UX and security tradeoff; requires careful refresh-token revocation hygiene.

## Decision 005 — Policy-Driven Authorization
- **Status:** Accepted
- **Context:** Role-only checks are not enough for patient/user resource boundaries.
- **Decision:** Keep ability model + access-policy checks (`canAccessUser`, `canAccessPatient`, guards).
- **Consequence:** More robust authz posture, but increased testing burden.

## Decision 006 — Drizzle ORM with Migration Files as Source of Truth
- **Status:** Accepted
- **Context:** Need type-safe data access and reproducible schema evolution.
- **Decision:** Maintain `db/schema.ts` + `drizzle/*` migration snapshots in sync.
- **Consequence:** Stronger data safety; schema changes require disciplined migration workflow.

## Decision 007 — Prioritize Auth Reliability and Booking Flows for Near-Term Delivery
- **Status:** Accepted
- **Context:** These are core to product viability and user trust.
- **Decision:** Near-term roadmap focuses on auth hardening, booking lifecycle completion, and admin visibility.
- **Consequence:** Non-critical enhancements are deferred until these flows stabilize.
