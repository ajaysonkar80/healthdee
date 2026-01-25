# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Healthdee is a healthcare platform with role-based access for patients, doctors, and administrators. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Build & Production
npm run build        # Production build
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
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
├── shared/       # Reusable UI primitives (Button, Input, Modal, Card, etc.)
├── domain/       # Feature-specific components
│   └── auth/     # Authentication flow components (multi-step signup/login)
├── doctor/       # Doctor-specific components (dashboard, appointments)
├── home/         # Landing page sections
└── layout/       # Layout components (Navbar, Footer)
```

### Services Layer

`services/` contains API service modules:
- `auth.service.tsx` - Authentication
- `doctor.service.tsx` - Doctor operations
- `admin.service.tsx` - Admin operations
- `appointments.tsx` - Appointment management

### Custom Hooks

`hooks/` provides reusable stateful logic:
- `useAuth` - Authentication state
- `useRole` - Role-based access
- `useAppointment` - Appointment management
- `useDebounce` - Input debouncing

### Lib Utilities

- `lib/validators.tsx` - Zod schemas for form validation (email/phone signup, login, password reset, OTP)

## Key Patterns

### Path Alias
Use `@/*` to import from project root: `import { Button } from "@/components/shared/Button"`

### Form Validation
Forms use `react-hook-form` with `@hookform/resolvers` and Zod schemas from `lib/validators.tsx`:
```typescript
import { emailSignupSchema } from "@/lib/validators"
```

### Client Components
Use `"use client"` directive for components with interactivity, hooks, or browser APIs.

### Color System
Colors are defined as CSS variables in `app/globals.css` under `@theme`:
- `--color-accent-primary: #F26A8D` (pink accent)
- `--color-secondary-blue: #587CFF`
- Use these via Tailwind: `bg-accent-primary`, `text-secondary-blue`

### Authentication Flow
Multi-step signup/login supporting both email and phone:
- Email flow: form → email verification → role selection
- Phone flow: form → OTP verification → role selection

Types defined in `app/types/auth.tsx`
