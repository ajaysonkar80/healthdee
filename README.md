# Healthdee

Healthdee is a healthcare platform with role-based access for patients, doctors, and administrators. It is built with Next.js App Router, React, TypeScript, Tailwind CSS, and Drizzle ORM.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Core Commands

```bash
# App lifecycle
npm run dev
npm run build
npm run start

# Code quality
npm run typecheck
npm run lint
npm run test

# Database
npm run db:push
npm run db:seed
```

## Architecture at a Glance

- `app/` → route segments, pages, layouts, and API route handlers.
- `components/` → role-focused and reusable UI components.
- `server/` → service/domain/repository/policy layers.
- `db/` + `drizzle/` → schema, DB connection, migrations.
- `lib/` + `hooks/` → shared client utilities and hooks.

## AI/Contributor Navigation Docs

For complete onboarding and implementation guidance, use these first:

1. `AGENTS.md` → coding and architecture conventions for agents.
2. `docs/folder-structure.md` → full repository folder and file tree.
3. `docs/ai-codebase-map.md` → 2-week prioritized completion plan, critical flows, extension rules, and per-file analysis template output.

## Suggested AI Workflow

1. Start from `docs/folder-structure.md` to find relevant areas quickly.
2. Read `docs/ai-codebase-map.md` sections in this order:
   - `2-Week Prioritized Completion Plan`
   - `Feature-to-File Mapping`
   - `CRITICAL FLOWS`
   - `EXTENSION RULES`
3. Make changes in this sequence: validator → domain → repository → service → API route → UI.
4. Verify with `npm run typecheck && npm run lint && npm run test && npm run build`.
