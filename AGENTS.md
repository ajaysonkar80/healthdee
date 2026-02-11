# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Healthdee is a healthcare platform with role-based access for patients, doctors, and administrators. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Build & Production
npm run build        # Production build
npm run start        # Start production server

# Linting & Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix (if available)

# Database
npm run db:push      # Push database schema changes
npm run db:seed      # Seed database with initial data
```

## Testing

Tests are powered by Vitest and React Testing Library.

```bash
npm run test          # Run all tests once
npm run test:watch    # Run tests in watch mode
npx vitest <file>     # Run a specific test file
```

## Architecture

### Route Structure (Next.js App Router)

The app uses role-based routing with three main portals:

- `app/(public)/` - Public-facing pages (landing, marketing)
- `app/(login-signup)/` - Authentication flows
- `app/admin/` - Admin dashboard (user management, doctor verification)
- `app/doctor/` - Doctor portal (appointments, prescriptions, earnings, onboarding, verification)
- `app/patient/` - Patient portal (appointments, records, profile)
- `app/types/` - Shared TypeScript types

### Component Organization

```
components/
├── ui/           # Reusable UI primitives (Button, Input, Modal, Card, etc.)
├── auth/         # Authentication flow components (multi-step signup/login)
├── doctor/       # Doctor-specific components (dashboard, appointments, settings)
├── admin/        # Admin-specific components (user management, verification)
├── home/         # Landing page sections
└── layout/       # Layout components (Header, Footer)
```

### Services Layer

`services/` contains API service modules:
- `auth.service.tsx` - Authentication operations
- `doctor.service.tsx` - Doctor-specific operations
- `admin.service.tsx` - Admin operations
- `appointments.tsx` - Appointment management
- `api.tsx` - Base API configuration

### Custom Hooks

`hooks/` provides reusable stateful logic:
- `useAuth` - Authentication state management
- `useRole` - Role-based access control
- `useAppointment` - Appointment management
- `useDebounce` - Input debouncing utility

### Lib Utilities

- `lib/validators.tsx` - Zod schemas for form validation (email/phone signup, login, password reset, OTP)
- `lib/utils.ts` - Utility functions (cn for className merging)
- `lib/routes.tsx` - Route definitions and helpers
- `lib/constant.tsx` - Application constants

## Code Style Guidelines

### Import Organization
```typescript
// 1. React and Next.js imports
import { useState } from "react"
import { NextPage } from "next"

// 2. Third-party libraries
import { z } from "zod"
import { useForm } from "react-hook-form"

// 3. Internal imports (use @/* alias)
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { authSchema } from "@/lib/validators"
```

### Path Alias
Always use `@/*` to import from project root: `import { Button } from "@/components/ui/button"`

### Component Structure
- Use `"use client"` directive for components with interactivity, hooks, or browser APIs
- Export interfaces/types alongside components
- Use PascalCase for component names and file names
- Keep components focused and single-responsibility

### TypeScript Patterns
- Use strict TypeScript configuration (already enabled)
- Define proper interfaces for API responses and component props
- Use Zod for runtime validation and TypeScript inference
- Prefer `interface` over `type` for object shapes

### Form Validation
Forms use `react-hook-form` with `@hookform/resolvers` and Zod schemas from `lib/validators.tsx`:
```typescript
import { emailSignupSchema } from "@/lib/validators"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const form = useForm({
  resolver: zodResolver(emailSignupSchema),
  defaultValues: { email: "", name: "" }
})
```

### Error Handling
- Use try-catch blocks for async operations
- Provide user-friendly error messages
- Use proper TypeScript error types
- Log errors appropriately without exposing sensitive data

### Color System
Colors are defined as CSS variables in `app/globals.css` under `@theme`:
- `--color-accent-primary: #F26A8D` (pink accent)
- `--color-secondary-blue: #587CFF`
- `--color-text-primary: #111827`
- `--color-text-secondary: #374151`
- `--color-bg-base: #FFFFFF`

Use these via Tailwind: `bg-accent-primary`, `text-secondary-blue`

### CSS/Utility Classes
- Use the `cn()` utility from `lib/utils.ts` for className merging
- Prefer Tailwind utility classes over custom CSS
- Use semantic class names that reflect purpose, not appearance
- Follow mobile-first responsive design

### Database & State Management
- Use Drizzle ORM for database operations
- Keep services focused on specific domains (auth, doctor, admin)
- Use React hooks for local state management
- Consider server components for data fetching when appropriate

## Key Patterns

### Authentication Flow
Multi-step signup/login supporting both email and phone:
- Email flow: form → email verification → role selection
- Phone flow: form → OTP verification → role selection

Types defined in `app/types/auth.tsx`

### Role-Based Access
Use the `useRole` hook to check user permissions and redirect appropriately:
```typescript
const { user, isLoading } = useAuth()
const { isDoctor, isAdmin } = useRole()
```

### API Services
Service modules handle API calls and data transformation:
```typescript
// services/doctor.service.tsx
export async function getDoctorAppointments(doctorId: string) {
  // API call logic
}
```

### Component Props Pattern
Define clear prop interfaces:
```typescript
interface DoctorCardProps {
  doctor: Doctor
  onBook?: (doctorId: string) => void
  className?: string
}
```

## Development Notes

- No current test framework - set up testing before adding tests
- ESLint configured with Next.js recommended rules
- TypeScript strict mode enabled
- Tailwind CSS v4 with custom color system
- Use semantic HTML5 elements
- Follow accessibility best practices
- Mobile-responsive design required

## AI Navigation Protocol (Repository-Specific)

When an AI model starts work in this repository, use this exact order:

1. `AGENTS.md` (this file) for constraints and conventions.
2. `docs/folder-structure.md` for full folder/file discovery.
3. `docs/ai-codebase-map.md` for:
   - 2-week prioritized completion plan
   - feature-to-file mapping
   - critical end-to-end flows
   - extension rules
   - per-file analysis blocks

### How to navigate quickly

- If changing UI routes, start in `app/<segment>/` and matching `components/<segment>/`.
- If changing API behavior, start in `app/api/*` then follow into:
  `server/validators` → `server/services` → `server/domain` → `server/repositories`.
- If changing data model, update `db/schema.ts` first, then migrations in `drizzle/`, then repository/service callsites.

### Mandatory implementation order for new features

1. Validation schema (`server/validators` and/or `lib/validators.tsx`)
2. Domain rule (`server/domain`)
3. Repository query/mutation (`server/repositories`)
4. Service orchestration (`server/services`)
5. API handler (`app/api/.../route.ts`)
6. Route/page/components (`app/*`, `components/*`)
7. Tests and static checks (`npm run test`, `npm run lint`, `npm run typecheck`)

### Non-negotiables

- Do not bypass authz/authn wrappers (`withAuth`, ability checks, access guards).
- Do not return non-standard API envelopes where existing wrappers are used.
- Do not break migration compatibility between `db/schema.ts` and `drizzle/*`.
