// server/email/templates/appointment-reminder.template.ts

interface AppointmentReminderTemplateData {
  name:       string;
  doctorName: string;
  date:       string;
}

export function appointmentReminderEmailTemplate(data: AppointmentReminderTemplateData) {
  return {
    subject: `Reminder: Appointment with ${data.doctorName} in 1 hour`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;padding:40px;box-shadow:0 1px 3px rgba(0,0,0,.08);">
        <tr><td>
          <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#db2777;">HealthDee</p>
          <h1 style="margin:24px 0 8px;font-size:20px;font-weight:600;color:#111827;">Appointment Reminder</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">
            Hi ${data.name}, your appointment with <strong>${data.doctorName}</strong> is in 1 hour.
          </p>
          <div style="background:#fdf2f8;border-radius:8px;padding:16px;text-align:center;margin:0 0 24px;">
            <p style="margin:0;font-size:18px;font-weight:700;color:#db2777;">${data.date}</p>
          </div>
          <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">
          <p style="margin:0;font-size:12px;color:#d1d5db;text-align:center;">HealthDee · Secure Healthcare Platform</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}