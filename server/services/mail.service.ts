import { ValidationError } from "@/server/utils/errors";

/* ======================================================
    INTERNAL TEMPLATE HELPERS
   ====================================================== */

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

/* ======================================================
    MAIL SERVICE
   ====================================================== */

export const mailService = {
  /**
   * Core reusable send method using Zepto Mail API
   */
  async send(to: { email: string; name: string }, subject: string, html: string) {
    // Fetch variables inside the function to ensure they are loaded from process.env at runtime
    const ZEPTOMAIL_API_KEY = process.env.ZEPTOMAIL_API_KEY;
    const SENDER_EMAIL = process.env.ZEPTOMAIL_SENDER_EMAIL;

    if (!ZEPTOMAIL_API_KEY) {
      console.warn("⚠️ ZEPTOMAIL_API_KEY not found. Skipping email send.");
      return;
    }

    if (!SENDER_EMAIL) {
      console.error("❌ ZEPTOMAIL_SENDER_EMAIL not found. Cannot send email.");
      throw new ValidationError("Mail server configuration error.");
    }

    try {
      const response = await fetch("https://api.zeptomail.in/v1.1/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": ZEPTOMAIL_API_KEY,
        },
        body: JSON.stringify({
          from: { 
            address: SENDER_EMAIL, 
            name: "HealthDee" 
          },
          to: [
            { 
              email_address: { 
                address: to.email, 
                name: to.name 
              } 
            }
          ],
          subject: subject,
          // FIX: ZeptoMail expects 'htmlbody' (no underscore)
          htmlbody: html, 
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        // Log the full error for debugging in terminal
        console.error("ZeptoMail API Error Details:", JSON.stringify(err, null, 2));
        throw new Error(`ZeptoMail Error: ${err.message || response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Mail Service Failure:", error);
      throw new ValidationError("Could not send email notification.");
    }
  },

  /* --------------------------------------------------
      1. Email Verification
  --------------------------------------------------- */
  async sendVerification(email: string, name: string, token: string) {
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const link = `${APP_URL}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
    
    const content = `
      <p>Hi ${name},</p>
      <p>Welcome to HealthDee! Please verify your email address to secure your account and access our network of specialist doctors.</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${link}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Verify Email Address</a>
      </div>
      <p style="font-size: 13px; color: #64748b;">If the button doesn't work, copy and paste this link: <br/> <span style="word-break: break-all;">${link}</span></p>
    `;
    
    const html = BaseLayout("Verify Your Account", content, "This link expires in 24 hours.");
    return await this.send({ email, name }, "Verify your HealthDee Account", html);
  },

  /* --------------------------------------------------
      2. Welcome Mail
  --------------------------------------------------- */
  async sendWelcome(email: string, name: string) {
    const link = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const content = `
      <p>Hi ${name},</p>
      <p>Welcome to the family! Your account is now fully verified.</p>
      <p>You can now book consultations, manage health records, and chat with experts directly from your dashboard.</p>
      <div style="text-align: center; margin: 24px 0;">
        <a href="${link}/patient/appointments/book" style="color: #2563eb; font-weight: 600; text-decoration: none;">Book Your First Consultation &rarr;</a>
      </div>
    `;
    const html = BaseLayout("Welcome to HealthDee!", content);
    return await this.send({ email, name }, "Welcome to HealthDee!", html);
  },

  /* --------------------------------------------------
      3. Appointment Confirmation
  --------------------------------------------------- */
  async sendAppointmentConfirmation(email: string, name: string, d: { doctor: string; date: string; time: string; mode: string }) {
    const content = `
      <p>Hi ${name},</p>
      <p>Your appointment has been successfully booked and confirmed.</p>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #edf2f7;">
        <p style="margin: 5px 0;"><strong>Doctor:</strong> Dr. ${d.doctor}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${d.date}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${d.time}</p>
        <p style="margin: 5px 0;"><strong>Mode:</strong> ${d.mode.toUpperCase()}</p>
      </div>
      <p>Please join the room 5 minutes early to ensure a smooth consultation.</p>
    `;
    const html = BaseLayout("Appointment Confirmed", content);
    return await this.send({ email, name }, `Appointment Confirmed: Dr. ${d.doctor}`, html);
  },

  // ... rest of the methods follow the same pattern
};