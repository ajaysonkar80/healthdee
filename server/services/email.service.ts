// server/services/email.service.ts
// Reusable named functions — the rest of the app calls ONLY these, never transport directly.
import { logger } from "../utils/logger";
import { sendEmail }                            from "@/server/email/transport";
import { otpEmailTemplate }                     from "@/server/email/templates/otp.template";
import { passwordResetEmailTemplate }           from "@/server/email/templates/password-reset.template";
import { doctorApprovedEmailTemplate }          from "@/server/email/templates/doctor-approved.template";
import { doctorRejectedEmailTemplate }          from "@/server/email/templates/doctor-rejected.template";
import { appointmentConfirmationEmailTemplate } from "@/server/email/templates/appointment-confirmation.template";
import { appointmentReminderEmailTemplate }     from "@/server/email/templates/appointment-reminder.template";
import { appointmentCancelledEmailTemplate }    from "@/server/email/templates/appointment-cancelled.template";
import { features }                             from "@/lib/config/features";

export const emailService = {

  /* --------------------------------------------------
     OTP — signup / email verification
  --------------------------------------------------- */
  async sendOtp(to: string, name: string, otp: string, expiresInMinutes = 10) {
    if (!features.SEND_OTP_EMAIL) {
      logger.debug("OTP email skipped (feature flag off)", { to, otp });
      return;
    }
    const { subject, html } = otpEmailTemplate({ name, otp, expiresInMinutes, purpose: "signup" });
    await sendEmail({ to, toName: name, subject, html });
  },

  /* --------------------------------------------------
     Password reset OTP
  --------------------------------------------------- */
  async sendPasswordReset(to: string, name: string, otp: string, expiresInMinutes = 10) {
    if (!features.SEND_PASSWORD_RESET_EMAIL) {
      logger.debug("Password reset email skipped (feature flag off)", { to, otp });
      return;
    }
    const { subject, html } = passwordResetEmailTemplate({ name, otp, expiresInMinutes });
    await sendEmail({ to, toName: name, subject, html });
  },

  /* --------------------------------------------------
     Doctor verification: approved
  --------------------------------------------------- */
  async sendDoctorApproved(to: string, name: string) {
    if (!features.SEND_DOCTOR_APPROVAL_EMAIL) return;
    const { subject, html } = doctorApprovedEmailTemplate({ name });
    await sendEmail({ to, toName: name, subject, html });
  },

  /* --------------------------------------------------
     Doctor verification: rejected
  --------------------------------------------------- */
  async sendDoctorRejected(to: string, name: string, reason: string) {
    if (!features.SEND_DOCTOR_APPROVAL_EMAIL) return;
    const { subject, html } = doctorRejectedEmailTemplate({ name, reason });
    await sendEmail({ to, toName: name, subject, html });
  },

  /* --------------------------------------------------
     Appointment confirmation
  --------------------------------------------------- */
  async sendAppointmentConfirmation(
    to: string,
    data: { patientName: string; doctorName: string; date: string; clinicName?: string }
  ) {
    if (!features.SEND_APPOINTMENT_CONFIRMATION_EMAIL) return;
    const { subject, html } = appointmentConfirmationEmailTemplate(data);
    await sendEmail({ to, toName: data.patientName, subject, html });
  },

  /* --------------------------------------------------
     Appointment reminder (1 hour before)
  --------------------------------------------------- */
  async sendAppointmentReminder(
    to: string,
    data: { name: string; doctorName: string; date: string }
  ) {
    if (!features.SEND_APPOINTMENT_REMINDER_EMAIL) return;
    const { subject, html } = appointmentReminderEmailTemplate(data);
    await sendEmail({ to, toName: data.name, subject, html });
  },

  /* --------------------------------------------------
     Appointment cancellation
  --------------------------------------------------- */
  async sendAppointmentCancellation(
    to: string,
    data: { name: string; doctorName: string; date: string }
  ) {
    if (!features.SEND_APPOINTMENT_CANCELLATION_EMAIL) return;
    const { subject, html } = appointmentCancelledEmailTemplate(data);
    await sendEmail({ to, toName: data.name, subject, html });
  },
};