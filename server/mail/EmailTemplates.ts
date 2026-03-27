const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://healthdee.vercel.app";

/**
 * Reusable base layout to maintain consistent branding and styling.
 */
const BaseLayout = (title: string, content: string, footer?: string) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a202c; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #2563eb; margin: 0; font-size: 24px;">HealthDee</h1>
      <p style="font-size: 14px; color: #64748b; margin-top: 4px;">Your Digital Health Partner</p>
    </div>
    
    <div style="background-color: #ffffff; padding: 10px;">
      <h2 style="color: #2d3748; font-size: 20px; margin-bottom: 16px;">${title}</h2>
      ${content}
    </div>

    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
      <p style="margin: 4px 0;">${footer || "Need help? Contact our support team at support@healthdee.com"}</p>
      <p style="margin: 4px 0;">&copy; ${new Date().getFullYear()} HealthDee Technologies Pvt Ltd.</p>
    </div>
  </div>
`;

export const EmailTemplates = {
  /**
   * 1. Email Verification
   */
  Verification: (name: string, token: string, email: string) => {
    const link = `${APP_URL}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
    const content = `
      <p>Hi ${name},</p>
      <p>Thank you for joining HealthDee! Please verify your email address to secure your account and access our network of specialist doctors.</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${link}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Verify Email Address</a>
      </div>
      <p style="font-size: 13px; color: #64748b;">If the button doesn't work, copy and paste this link: <br/> <span style="word-break: break-all;">${link}</span></p>
    `;
    return BaseLayout("Verify Your Account", content, "This link expires in 24 hours. If you didn't sign up, you can safely ignore this email.");
  },

  /**
   * 2. Welcome Mail
   */
  Welcome: (name: string) => {
    const content = `
      <p>Hi ${name},</p>
      <p>Welcome to the HealthDee family! Your account is now fully verified.</p>
      <p>You can now start booking consultations, managing your health records, and chatting with our medical experts directly from your dashboard.</p>
      <div style="text-align: center; margin: 24px 0;">
        <a href="${APP_URL}/patient/appointments/book" style="color: #2563eb; font-weight: 600; text-decoration: none;">Book Your First Consultation &rarr;</a>
      </div>
    `;
    return BaseLayout("Welcome to HealthDee!", content);
  },

  /**
   * 3. Appointment Confirmation
   */
  AppointmentConfirmation: (name: string, details: { doctor: string; date: string; time: string; mode: string }) => {
    const content = `
      <p>Hi ${name},</p>
      <p>Your appointment has been successfully booked and confirmed.</p>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #edf2f7;">
        <p style="margin: 5px 0;"><strong>Doctor:</strong> Dr. ${details.doctor}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${details.date}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${details.time}</p>
        <p style="margin: 5px 0;"><strong>Mode:</strong> ${details.mode.toUpperCase()}</p>
      </div>
      <p>Please ensure you have a stable internet connection and join the room 5 minutes before the scheduled time.</p>
    `;
    return BaseLayout("Appointment Confirmed", content);
  },

  /**
   * 4. Appointment Cancellation
   */
  AppointmentCancellation: (name: string, details: { doctor: string; date: string; reason?: string }) => {
    const content = `
      <p>Hi ${name},</p>
      <p>We regret to inform you that your appointment with <strong>Dr. ${details.doctor}</strong> on ${details.date} has been cancelled.</p>
      ${details.reason ? `<p style="color: #e53e3e;"><strong>Reason:</strong> ${details.reason}</p>` : ""}
      <p>If you have already paid, a refund will be initiated automatically and should reflect in your account within 5-7 business days.</p>
      <p><a href="${APP_URL}/doctors" style="color: #2563eb;">Click here to book a new slot.</a></p>
    `;
    return BaseLayout("Appointment Cancelled", content);
  },

  /**
   * 5. Appointment Completion/Success
   */
  AppointmentSuccess: (name: string, doctor: string) => {
    const content = `
      <p>Hi ${name},</p>
      <p>Your consultation with <strong>Dr. ${doctor}</strong> is now complete. We hope you received the care you needed.</p>
      <p>Your digital prescription and clinical summary are now ready for download in your patient portal.</p>
      <div style="margin: 24px 0; text-align: center;">
        <a href="${APP_URL}/patient/records" style="background-color: #059669; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">View Medical Records</a>
      </div>
    `;
    return BaseLayout("Consultation Completed", content, "How was your experience? Reply to this email to give us feedback!");
  },

  /**
   * 6. Appointment Reminder
   */
  AppointmentReminder: (name: string, doctor: string, timeRemaining: string, joinLink: string) => {
    const content = `
      <p>Hi ${name},</p>
      <p>This is a friendly reminder that your consultation with <strong>Dr. ${doctor}</strong> starts in <strong>${timeRemaining}</strong>.</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${joinLink}" style="background-color: #f59e0b; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">Join Meeting Room</a>
      </div>
      <p>Please be ready with any previous reports you might want to share.</p>
    `;
    return BaseLayout("Upcoming Appointment Reminder", content);
  },
};