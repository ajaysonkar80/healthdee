# Folder Structure for AI Navigation

Generated from `git ls-files` on 2026-03-22 to provide a complete, deterministic map (479 tracked files).

```text
.
├── .VSCodeCounter
│   ├── 2026-02-11_18-50-40
│   │   ├── details.md
│   │   ├── diff-details.md
│   │   ├── diff.csv
│   │   ├── diff.md
│   │   ├── diff.txt
│   │   ├── results.csv
│   │   ├── results.json
│   │   ├── results.md
│   │   └── results.txt
│   └── 2026-03-21_00-38-59
│       ├── details.md
│       ├── diff-details.md
│       ├── diff.csv
│       ├── diff.md
│       ├── diff.txt
│       ├── results.csv
│       ├── results.json
│       ├── results.md
│       └── results.txt
├── .vscode
│   └── settings.json
├── ai-tree
│   ├── tree-app.txt
│   ├── tree-db.txt
│   ├── tree-hooks.txt
│   ├── tree-lib.txt
│   ├── tree-root.txt
│   └── tree-server.txt
├── app
│   ├── (public)
│   │   ├── (login-signup)
│   │   │   ├── forgot-password
│   │   │   │   └── page.tsx
│   │   │   ├── login
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password
│   │   │   │   └── page.tsx
│   │   │   ├── select-role
│   │   │   │   └── page.tsx
│   │   │   ├── signup
│   │   │   │   └── page.tsx
│   │   │   ├── verify-email
│   │   │   │   ├── VerifyEmailClient.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── about
│   │   │   └── page.tsx
│   │   ├── doctor-privacy-policy
│   │   │   └── page.tsx
│   │   ├── healthcare-provider-terms
│   │   │   └── page.tsx
│   │   ├── help
│   │   │   └── page.tsx
│   │   ├── policies
│   │   │   └── page.tsx
│   │   ├── privacy-policy
│   │   │   └── page.tsx
│   │   ├── terms-and-conditions
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── admin
│   │   ├── appointment-requests
│   │   │   ├── AppointmentRequestsClient.tsx
│   │   │   └── page.tsx
│   │   ├── clinics
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── doctors
│   │   │   ├── [doctorId]
│   │   │   │   └── edit
│   │   │   │       └── page.tsx
│   │   │   ├── create
│   │   │   │   └── page.tsx
│   │   │   ├── DoctorsPageClient.tsx
│   │   │   └── page.tsx
│   │   ├── doctors-verification
│   │   │   ├── DoctorsVerificationClient.tsx
│   │   │   └── page.tsx
│   │   ├── patients
│   │   │   ├── PatientsClientPage.tsx
│   │   │   └── page.tsx
│   │   ├── settings
│   │   │   └── page.tsx
│   │   ├── users
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api
│   │   ├── admin
│   │   │   └── metrics
│   │   │       └── route.ts
│   │   ├── appointments
│   │   │   ├── [id]
│   │   │   │   ├── cancel
│   │   │   │   │   └── route.ts
│   │   │   │   ├── complete
│   │   │   │   │   └── route.ts
│   │   │   │   ├── confirm
│   │   │   │   │   └── route.ts
│   │   │   │   ├── reschedule
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── route.ts
│   │   │   ├── logout
│   │   │   │   └── route.ts
│   │   │   ├── me
│   │   │   │   └── route.ts
│   │   │   ├── otp
│   │   │   │   ├── request
│   │   │   │   │   └── route.ts
│   │   │   │   ├── resend-email
│   │   │   │   │   └── route.ts
│   │   │   │   ├── verify
│   │   │   │   │   └── route.ts
│   │   │   │   └── verify-email
│   │   │   │       └── route.ts
│   │   │   ├── password
│   │   │   │   ├── forgot
│   │   │   │   │   └── route.ts
│   │   │   │   └── reset
│   │   │   │       └── route.ts
│   │   │   ├── refresh
│   │   │   │   └── route.ts
│   │   │   ├── register
│   │   │   │   └── route.ts
│   │   │   └── select-role
│   │   │       └── route.ts
│   │   ├── doctor
│   │   │   ├── active
│   │   │   │   └── route.ts
│   │   │   ├── availability
│   │   │   │   └── route.ts
│   │   │   ├── preferences
│   │   │   │   └── route.ts
│   │   │   └── profile
│   │   │       └── route.ts
│   │   ├── doctors
│   │   │   ├── [id]
│   │   │   │   ├── appointments-public
│   │   │   │   │   └── route.ts
│   │   │   │   ├── availability-public
│   │   │   │   │   └── route.ts
│   │   │   │   ├── verify
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── files
│   │   │   └── [...path]
│   │   │       └── route.ts
│   │   ├── health
│   │   │   └── route.ts
│   │   ├── patients
│   │   │   ├── [id]
│   │   │   │   └── route.ts
│   │   │   ├── me
│   │   │   │   └── preferences
│   │   │   │       └── route.ts
│   │   │   └── route.ts
│   │   └── users
│   │       ├── [id]
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── clinics
│   │   ├── [id]
│   │   │   ├── ClinicDetails.tsx
│   │   │   ├── ClinicDoctors.tsx
│   │   │   ├── ClinicHero.tsx
│   │   │   ├── ClinicPageLayout.tsx
│   │   │   ├── ClinicServices.tsx
│   │   │   ├── ClinicSidebar.tsx
│   │   │   ├── ClinicSummary.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── context
│   │   └── AuthContext.tsx
│   ├── doctor
│   │   ├── appointments
│   │   │   ├── [id]
│   │   │   │   ├── AppointmentsDetailsSkeleton.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── AppointmentQueueSkeleton.tsx
│   │   │   └── page.tsx
│   │   ├── availability
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── earnings
│   │   │   └── page.tsx
│   │   ├── onboarding
│   │   │   └── page.tsx
│   │   ├── prescriptions
│   │   │   └── page.tsx
│   │   ├── settings
│   │   │   ├── clinic
│   │   │   │   └── page.tsx
│   │   │   ├── personal
│   │   │   │   └── page.tsx
│   │   │   ├── professional
│   │   │   │   └── page.tsx
│   │   │   ├── security
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── verification
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── doctors
│   │   ├── [publicId]
│   │   │   └── page.tsx
│   │   ├── booking
│   │   │   ├── confirmation
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   └── page.tsx
│   ├── patient
│   │   ├── appointments
│   │   │   ├── book
│   │   │   │   └── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── danger-zone
│   │   │   └── page.tsx
│   │   ├── emergency-contacts
│   │   │   └── page.tsx
│   │   ├── notifications
│   │   │   └── page.tsx
│   │   ├── profile
│   │   │   └── page.tsx
│   │   ├── records
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── services
│   │   └── auth.service.ts
│   ├── types
│   │   └── auth.tsx
│   ├── Header.tsx
│   ├── error.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── notfound.tsx
│   └── page.tsx
├── components
│   ├── about
│   │   ├── about-hero
│   │   │   ├── AboutHero.tsx
│   │   │   └── HeroContent.tsx
│   │   ├── core-values
│   │   │   ├── CoreValues.tsx
│   │   │   └── ValueCard.tsx
│   │   ├── final-cta
│   │   │   └── FinalCTA.tsx
│   │   ├── impact-stats
│   │   │   ├── ImpactCard.tsx
│   │   │   └── StatCard.tsx
│   │   ├── our-story
│   │   │   ├── ImpactInlineStats.tsx
│   │   │   ├── OurStory.tsx
│   │   │   ├── StoryContent.tsx
│   │   │   └── StoryImageCard.tsx
│   │   └── trust-badges
│   │       ├── BadgeItem.tsx
│   │       └── TrustBadges.tsx
│   ├── admin
│   │   ├── appointment-requests
│   │   │   ├── AppointmentActionsMenu.tsx
│   │   │   ├── AppointmentFilters.tsx
│   │   │   ├── AppointmentPagination.tsx
│   │   │   ├── AppointmentStatusBadge.tsx
│   │   │   ├── AppointmentTable.tsx
│   │   │   ├── AppointmentTableRow.tsx
│   │   │   └── PatientInfoCell.tsx
│   │   ├── clinic
│   │   │   ├── ClinicPagination.tsx
│   │   │   ├── ClinicStatCard.tsx
│   │   │   ├── ClinicStats.tsx
│   │   │   ├── ClinicStatusBadge.tsx
│   │   │   ├── ClinicTable.tsx
│   │   │   └── ClinicTableRow.tsx
│   │   ├── doctor
│   │   │   ├── BulkHelpCards.tsx
│   │   │   ├── DoctorDeleteModal.tsx
│   │   │   ├── DoctorFilters.tsx
│   │   │   ├── DoctorForm.tsx
│   │   │   ├── DoctorPagination.tsx
│   │   │   ├── DoctorRowAction.tsx
│   │   │   ├── DoctorTable.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── types.ts
│   │   ├── doctor-verification
│   │   │   ├── DoctorsInfoCell.tsx
│   │   │   ├── VerificationFilters.tsx
│   │   │   ├── VerificationPagination.tsx
│   │   │   ├── VerificationStatusBadge.tsx
│   │   │   ├── VerificationTable.tsx
│   │   │   ├── VerificationTableRow.tsx
│   │   │   └── VerificationsActionsMenu.tsx
│   │   ├── patient
│   │   │   ├── PatientFilter.tsx
│   │   │   ├── PatientPagination.tsx
│   │   │   ├── PatientStatsCard.tsx
│   │   │   └── PatientTable.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminTopBar.tsx
│   │   ├── RecentActivity.tsx
│   │   ├── StatsCard.tsx
│   │   └── StatsGrid.tsx
│   ├── auth
│   │   ├── EmailLoginStep.tsx
│   │   ├── EmailSignupStep.tsx
│   │   ├── EmailVerificationStep.tsx
│   │   ├── ForgetPasswordForm.tsx
│   │   ├── LoginForm.tsx
│   │   ├── LoginOtpStep.tsx
│   │   ├── LogoutButton.tsx
│   │   ├── OtpStep.tsx
│   │   ├── PhoneLoginStep.tsx
│   │   ├── PhoneSignupStep.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   ├── SelectRoleForm.tsx
│   │   └── SignupForm.tsx
│   ├── doctor
│   │   ├── appointment
│   │   │   ├── AppointmentQueue.tsx
│   │   │   └── appointmentSlot.tsx
│   │   ├── booking
│   │   │   ├── confirmation
│   │   │   │   ├── AppointmentMeta.tsx
│   │   │   │   ├── BookingActions.tsx
│   │   │   │   ├── BookingConfirmationHero.tsx
│   │   │   │   ├── BookingSummaryCard.tsx
│   │   │   │   ├── DoctorSummary.tsx
│   │   │   │   ├── ExpectationStep.tsx
│   │   │   │   ├── SupportFooter.tsx
│   │   │   │   └── WhatToExpect.tsx
│   │   │   ├── AboutDoctor.tsx
│   │   │   ├── BookingPanel.tsx
│   │   │   ├── ClinicInfo.tsx
│   │   │   ├── DoctorProfile.tsx
│   │   │   ├── DoctorStats.tsx
│   │   │   └── Reviews.tsx
│   │   ├── dashboard
│   │   │   ├── CurrentlyConsulting.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   └── UrgentNotifications.tsx
│   │   ├── earnings
│   │   │   ├── EarningsSummary.tsx
│   │   │   ├── EarningsSummarySkeleton.tsx
│   │   │   ├── EarningsTable.tsx
│   │   │   └── EarningsTableSkeleton.tsx
│   │   ├── prescriptions
│   │   │   └── PrescriptionsTable.tsx
│   │   ├── settings
│   │   │   ├── ClinicSettings.tsx
│   │   │   ├── ClinicSettingsForm.tsx
│   │   │   ├── NotificationSettings.tsx
│   │   │   ├── PersonalDetailsForm.tsx
│   │   │   ├── ProfessionalDetailsForm.tsx
│   │   │   ├── ProfileSettings.tsx
│   │   │   ├── SecuritySettings.tsx
│   │   │   ├── SecuritySettingsForm.tsx
│   │   │   └── SettingsTab.tsx
│   │   ├── DoctorCard.tsx
│   │   └── PrescriptionForm.tsx
│   ├── doctors
│   │   ├── DoctorsCard.tsx
│   │   ├── DoctorsFilter.tsx
│   │   ├── DoctorsList.tsx
│   │   ├── DoctorsPagination.tsx
│   │   └── DoctorsTopBar.tsx
│   ├── help
│   │   ├── FAQAccordion.tsx
│   │   └── HelpTopicCard.tsx
│   ├── home
│   │   ├── CTASection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── SpecialtiesSection.tsx
│   │   ├── TopRatedDoctors.tsx
│   │   ├── TrustStatsSection.tsx
│   │   └── WhyHealthDeeSection.tsx
│   ├── layout
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── patient
│   │   ├── AddEmergencyContactForm.tsx
│   │   ├── DangerZone.tsx
│   │   ├── EditProfileModal.tsx
│   │   ├── EmergencyContactItem.tsx
│   │   ├── EmergencyContactSection.tsx
│   │   ├── NotificationPrivacySection.tsx
│   │   ├── PatientInfoCard.tsx
│   │   ├── PatientSideBar.tsx
│   │   ├── PatientTopNav.tsx
│   │   ├── PersonalInfoFieldCard.tsx
│   │   ├── PersonalInformationSection.tsx
│   │   ├── ProfileHeader.tsx
│   │   └── ToggleSettingsItem.tsx
│   ├── ui
│   │   ├── PasswordInput.tsx
│   │   ├── RadioGroup.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.test.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── pagination.tsx
│   │   ├── select.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   └── tooltip.tsx
│   └── upload
│       ├── AvatarUploader.tsx
│       └── ImageUploader.tsx
├── db
│   ├── index.ts
│   ├── schema.ts
│   └── turso.tsx
├── docs
│   ├── ai-codebase-map.md
│   ├── api-spec.md
│   ├── architecture.md
│   ├── auth-flow.md
│   ├── changelog.md
│   ├── completed-tasks.md
│   ├── decisions.md
│   ├── folder-structure.md
│   ├── product-requirements-completed.md
│   ├── roadmap.md
│   └── tasks.md
├── drizzle
│   ├── meta
│   │   ├── 0000_snapshot.json
│   │   ├── 0001_snapshot.json
│   │   ├── 0002_snapshot.json
│   │   ├── 0003_snapshot.json
│   │   ├── 0004_snapshot.json
│   │   ├── 0005_snapshot.json
│   │   ├── 0006_snapshot.json
│   │   ├── 0007_snapshot.json
│   │   ├── 0008_snapshot.json
│   │   ├── 0009_snapshot.json
│   │   ├── 0010_snapshot.json
│   │   ├── 0011_snapshot.json
│   │   ├── 0012_snapshot.json
│   │   └── _journal.json
│   ├── 0000_purple_tiger_shark.sql
│   ├── 0001_exotic_dakota_north.sql
│   ├── 0002_breezy_shape.sql
│   ├── 0003_easy_omega_flight.sql
│   ├── 0004_melodic_toad_men.sql
│   ├── 0005_military_otto_octavius.sql
│   ├── 0006_many_arachne.sql
│   ├── 0007_ambiguous_shadow_king.sql
│   ├── 0008_amusing_toad.sql
│   ├── 0009_overconfident_pandemic.sql
│   ├── 0010_mushy_whirlwind.sql
│   ├── 0011_spotty_rage.sql
│   └── 0012_slippery_lady_vermin.sql
├── hooks
│   ├── useAppointment.tsx
│   ├── useAuth.tsx
│   ├── useDebounce.tsx
│   └── useRole.tsx
├── lib
│   ├── config
│   │   └── features.ts
│   ├── utils
│   │   └── slot.ts
│   ├── auth.ts
│   ├── constant.tsx
│   ├── routes.tsx
│   ├── utils.test.ts
│   ├── utils.ts
│   └── validators.tsx
├── public
│   ├── fonts
│   │   ├── Geist-Bold.ttf
│   │   ├── Geist-Regular.ttf
│   │   └── GeistMono-Regular.ttf
│   ├── avatar.jpg
│   ├── avatar.png
│   ├── clinic-logo.jpg
│   ├── clinic.jpg
│   ├── doctor-1.jpg
│   ├── doctor-2.jpg
│   ├── doctors.jpg
│   ├── hospital.jpg
│   └── water-flask.png
├── scripts
│   ├── get-s3.ts
│   ├── presigned.ts
│   ├── seed.ts
│   ├── seedAvailability.ts
│   ├── test-s3.ts
│   ├── test.txt
│   └── wifi-network-warning.js
├── server
│   ├── actions
│   │   ├── doctorSettings.actions.ts
│   │   ├── emergencyContacts.actions.ts
│   │   ├── patient.actions.ts
│   │   ├── patientProfile.actions.ts
│   │   ├── patientsProfile.actions.ts
│   │   └── uploadAvatar.actions.ts
│   ├── constants
│   │   ├── otp-channel.ts
│   │   ├── user-role.ts
│   │   └── user-status.ts
│   ├── db
│   │   └── types.ts
│   ├── domain
│   │   ├── appointment.domain.ts
│   │   ├── audit.domain.ts
│   │   ├── auth.domain.ts
│   │   ├── clinic.domain.ts
│   │   ├── consent.domain.ts
│   │   ├── consultation.domain.ts
│   │   ├── doctor.domain.ts
│   │   ├── erasure.domain.ts
│   │   ├── index.ts
│   │   ├── prescription.domain.ts
│   │   └── user.domain.ts
│   ├── email
│   │   ├── templates
│   │   │   ├── appointment-cancelled.template.ts
│   │   │   ├── appointment-confirmation.template.ts
│   │   │   ├── appointment-reminder.template.ts
│   │   │   ├── doctor-approved.template.ts
│   │   │   ├── doctor-rejected.template.ts
│   │   │   ├── otp.template.ts
│   │   │   └── password-reset.template.ts
│   │   └── transport.ts
│   ├── http
│   │   ├── response.ts
│   │   └── route-helpers.ts
│   ├── middleware
│   │   └── rate-limit.ts
│   ├── policies
│   │   ├── access
│   │   │   ├── canAccess.ts
│   │   │   ├── canAccessAppointment.ts
│   │   │   ├── canAccessPatient.ts
│   │   │   ├── canAccessPrescription.ts
│   │   │   └── canAccessUser.ts
│   │   ├── fields
│   │   │   └── patient.fields.ts
│   │   ├── guards
│   │   │   ├── isAdmin.ts
│   │   │   ├── isDoctor.ts
│   │   │   └── isPatient.ts
│   │   ├── ability.ts
│   │   ├── permissions.ts
│   │   ├── rbac-deps.ts
│   │   ├── repositories.ts
│   │   ├── roles.ts
│   │   └── types.ts
│   ├── rate-limit
│   │   ├── memory-store.ts
│   │   ├── sqlite-store.ts
│   │   └── store.ts
│   ├── repositories
│   │   ├── appointment.repo.ts
│   │   ├── audit.repo.ts
│   │   ├── doctor.repo.ts
│   │   ├── doctor_earning.repo.ts
│   │   ├── patient.repo.ts
│   │   ├── prescription.repo.ts
│   │   ├── refreshToken.repo.ts
│   │   └── user.repo.ts
│   ├── services
│   │   ├── admin.service.tsx
│   │   ├── api.tsx
│   │   ├── appointment.service.tsx
│   │   ├── auth.service.tsx
│   │   ├── doctor.service.tsx
│   │   ├── doctor_earning.service.tsx
│   │   ├── email.service.ts
│   │   ├── patient.service.tsx
│   │   ├── prescription.services.tsx
│   │   └── user.service.tsx
│   ├── storage
│   │   ├── getFileStream.ts
│   │   ├── imageUpload.ts
│   │   └── s3.client.ts
│   ├── types
│   │   └── next-request.d.ts
│   ├── utils
│   │   ├── errors.ts
│   │   ├── hash.ts
│   │   ├── jwt.ts
│   │   ├── logger.ts
│   │   ├── logger_test.ts
│   │   ├── pagination.ts
│   │   ├── pagination_test.ts
│   │   ├── password.ts
│   │   ├── password_test.ts
│   │   └── sessions.ts
│   └── validators
│       ├── appointment.ts
│       ├── audit.ts
│       ├── auth.ts
│       ├── clinic.ts
│       ├── consent.ts
│       ├── consultation.ts
│       ├── doctor.ts
│       ├── prescription.ts
│       └── user.ts
├── tests
│   └── appointment.api.test.ts
├── .gitignore
├── AGENTS.md
├── README.md
├── ajaygit.txt
├── ajaygit.txt.pub
├── components.json
├── currentlyWorking.md
├── drizzle.config.ts
├── eslint.config.mjs
├── export-tree-for-ai.ps1
├── middleware.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── planning.md
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── vitest.setup.ts
```
