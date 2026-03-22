// server/email/templates/appointment-cancelled.template.ts

interface AppointmentCancelledTemplateData {
  name:       string;
  doctorName: string;
  date:       string;
}

export function appointmentCancelledEmailTemplate(data: AppointmentCancelledTemplateData) {
  return {
    subject: `Appointment with ${data.doctorName} has been cancelled`,
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
          <h1 style="margin:24px 0 8px;font-size:20px;font-weight:600;color:#111827;">Appointment Cancelled</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">
            Hi ${data.name}, your appointment with <strong>${data.doctorName}</strong> scheduled for <strong>${data.date}</strong> has been cancelled.
          </p>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">
            You can book a new appointment at any time from the patient portal.
          </p>
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