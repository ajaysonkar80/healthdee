## To do

### 🔴 P0 — Auth Parity + Forgot/Reset Integration

  - due: 2026-02-20
  - priority: high
  - workload: Hard
  - defaultExpanded: false
  - steps:
      - [ ] Create POST /auth/send-otp
      - [ ] Create POST /auth/verify-otp
      - [ ] Create POST /auth/forgot-password
      - [ ] Create POST /auth/reset-password
      - [ ] Implement auth.domain.ts (AuthSessionResponse, ResetToken, OTPAttempt, AuthErrorCode, SessionPayload)
      - [ ] Implement auth.repo.ts (createResetToken, getResetToken, invalidateResetToken, incrementOtpAttempts)
      - [ ] Implement auth.service.ts (loginWithOTP, signupWithOTP, requestPasswordReset, resetPassword, normalizeSessionResponse)
      - [ ] Add rateLimiter.middleware.ts
      - [ ] Create hashPassword.ts
      - [ ] Create otpValidator.ts
      - [ ] Build /auth/forgot-password/page.tsx
      - [ ] Build /auth/reset-password/page.tsx
      - [ ] Build /auth/verify/page.tsx
      - [ ] Create ForgotPasswordForm.tsx
      - [ ] Create ResetPasswordForm.tsx
      - [ ] Create OTPInput.tsx
      - [ ] Implement authApi.ts
      - [ ] Implement useSession.ts
      - [ ] Tests: OTP success/failure
      - [ ] Tests: expired reset token
      - [ ] Tests: duplicate signup
      - [ ] Tests: login parity behavior :contentReference[oaicite:0]{index=0}

### 🔴 P0 — Booking Reliability Hardening (Slot Locking)

  - due: 2026-02-20
  - priority: high
  - workload: Hard
  - defaultExpanded: false
  - steps:
      - [ ] Add AppointmentStatus enum
      - [ ] Add SlotLock model
      - [ ] Add BookingErrorCode
      - [ ] appointment.repo.ts: isSlotBooked
      - [ ] appointment.repo.ts: lockSlot
      - [ ] appointment.repo.ts: createAppointment
      - [ ] appointment.repo.ts: updateAppointmentStatus
      - [ ] appointment.service.ts: createAppointmentWithLock
      - [ ] appointment.service.ts: retrySafeBooking
      - [ ] appointment.service.ts: preventDuplicateBooking
      - [ ] Route POST /appointments
      - [ ] Route PATCH /doctor/appointments/:id
      - [ ] Component TimeSlotButton.tsx
      - [ ] Component BookingGuard.tsx
      - [ ] Component AppointmentStatusBadge.tsx
      - [ ] Utility appointmentApi.ts
      - [ ] Tests: double booking race
      - [ ] Tests: idempotency retry
      - [ ] Tests: invalid transitions :contentReference[oaicite:1]{index=1}

### 🟠 P1 — Replace Mock Data with Repository APIs

  - due: 2026-02-22
  - priority: high
  - workload: Normal
  - defaultExpanded: false
  - steps:
      - [ ] doctor.domain.ts
      - [ ] doctor.repo.ts findDoctors(filters)
      - [ ] doctor.service.ts searchDoctors
      - [ ] clinic.domain.ts
      - [ ] clinic.repo.ts getClinicDetail
      - [ ] clinic.service.ts
      - [ ] Route GET /doctors
      - [ ] Route GET /clinics/:id
      - [ ] Page /doctors/page.tsx
      - [ ] Page /clinics/[id]/page.tsx
      - [ ] DoctorCard.tsx
      - [ ] DoctorFilters.tsx
      - [ ] ClinicDoctorsList.tsx
      - [ ] AvailabilitySlots.tsx
      - [ ] doctorApi.ts
      - [ ] clinicApi.ts :contentReference[oaicite:2]{index=2}

### 🟠 P1 — Doctor Workflow Completion

  - due: 2026-02-24
  - priority: high
  - workload: Hard
  - defaultExpanded: false
  - steps:
      - [ ] appointment.repo.ts updateAppointmentStatus
      - [ ] appointment.service.ts accept/reject/cancel
      - [ ] /doctor/appointments/page.tsx
      - [ ] AppointmentCard.tsx
      - [ ] StatusActionButtons.tsx
      - [ ] prescription.domain.ts
      - [ ] prescription.repo.ts insertPrescription
      - [ ] prescription.service.ts createPrescription
      - [ ] POST /doctor/prescriptions
      - [ ] PrescriptionEditor.tsx
      - [ ] PrescriptionPreview.tsx
      - [ ] earnings.domain.ts
      - [ ] earnings.repo.ts
      - [ ] earnings.service.ts
      - [ ] GET /doctor/earnings
      - [ ] POST /doctor/earnings
      - [ ] /doctor/earnings/page.tsx
      - [ ] EarningsChart.tsx
      - [ ] EarningsTable.tsx
      - [ ] /doctor/settings/page.tsx
      - [ ] DoctorProfileForm.tsx
      - [ ] AvailabilityScheduler.tsx :contentReference[oaicite:3]{index=3}

### 🟠 P1 — Patient Profile + Records Workflow

  - due: 2026-02-25
  - priority: high
  - workload: Hard
  - defaultExpanded: false
  - steps:
      - [ ] patient.domain.ts
      - [ ] patient.repo.ts
      - [ ] patient.service.ts
      - [ ] GET /patient/profile
      - [ ] PATCH /patient/profile
      - [ ] getEmergencyContacts
      - [ ] patchEmergencyContacts
      - [ ] validateContacts
      - [ ] setPrimaryContact
      - [ ] POST /patient/delete-account
      - [ ] GET /patient/export-data
      - [ ] export.worker.ts
      - [ ] consultation.domain.ts
      - [ ] consultation.repo.ts
      - [ ] consultation.service.ts
      - [ ] GET /patient/consultations
      - [ ] /patient/profile/page.tsx
      - [ ] ProfileForm.tsx
      - [ ] EmergencyContactsList.tsx
      - [ ] DangerZoneCard.tsx
      - [ ] ConsultationTimeline.tsx
      - [ ] patientApi.ts :contentReference[oaicite:4]{index=4}

### 🟠 P1 — Admin Dashboard Operational Depth

  - due: 2026-02-26
  - priority: high
  - workload: Normal
  - defaultExpanded: false
  - steps:
      - [ ] admin.domain.ts
      - [ ] getPatients({page,filters})
      - [ ] getDoctors({status})
      - [ ] getClinics()
      - [ ] verifyDoctor()
      - [ ] updateSettings()
      - [ ] PATCH /admin/settings
      - [ ] PATCH /admin/doctors/:id/verify
      - [ ] GET /admin/patients
      - [ ] GET /admin/doctors
      - [ ] GET /admin/clinics
      - [ ] /admin/dashboard/page.tsx
      - [ ] DoctorVerificationQueue.tsx
      - [ ] PatientsTable.tsx
      - [ ] ClinicsTable.tsx
      - [ ] AdminFiltersBar.tsx
      - [ ] PaginationControls.tsx
      - [ ] adminApi.ts :contentReference[oaicite:5]{index=5}

### 🟡 P2 — Hardening & Observability

  - due: 2026-02-28
  - priority: medium
  - workload: Normal
  - defaultExpanded: false
  - steps:
      - [ ] Create logger.ts
      - [ ] Add logging to auth.service.ts
      - [ ] Add logging to appointment.service.ts
      - [ ] Add logging to admin.service.ts
      - [ ] Add logging to doctor.service.ts
      - [ ] Create metrics.middleware.ts
      - [ ] Track request latency
      - [ ] Track error rate
      - [ ] Track route usage
      - [ ] Attach middleware to routers
      - [ ] Create errors.ts
      - [ ] ValidationError
      - [ ] PermissionError
      - [ ] OperationalError
      - [ ] RateLimitError
      - [ ] Enforce no raw DB errors rule :contentReference[oaicite:6]{index=6}

### 🧪 Test Coverage + Documentation

  - due: 2026-03-01
  - priority: high
  - workload: Normal
  - defaultExpanded: false
  - steps:
      - [ ] Auth tests (OTP success/failure, reset token expiry, rate limit exceeded)
      - [ ] Access control tests (role-based blocking, admin-only endpoints)
      - [ ] Appointment lifecycle tests
      - [ ] Update docs/api-spec.md
      - [ ] Update docs/decisions.md (slot locking, auth normalization, logging)
      - [ ] Create docs/releases/milestone-logs.md
      - [ ] Checklist: migrations applied
      - [ ] Checklist: env vars validated
      - [ ] Checklist: rate limiting tested
      - [ ] Checklist: metrics visible :contentReference[oaicite:7]{index=7}

## currently doing

### appointment booking page properly working

  - due: 2026-02-20
  - priority: high
  - workload: Hard
  - defaultExpanded: true
  - steps:
      - [x] Design the exact availability schema change
      - [x] Write the updated appointmentService logic
      - [x] Write slot generation utility
      - [x] Refactor BookingPanel properly
      - [ ] Design doctor approval dashboard flow
      - [ ] doctor booking confirmation page

## done

