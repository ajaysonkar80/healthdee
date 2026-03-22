// server/email/templates/appointment-confirmation.template.ts

interface AppointmentConfirmationTemplateData {
  patientName: string;
  doctorName:  string;
  date:        string; // formatted string e.g. "Feb 25, 2026 at 3:00 PM"
  clinicName?: string;
}

export function appointmentConfirmationEmailTemplate(data: AppointmentConfirmationTemplateData) {
  return {
    subject: `Appointment confirmed with ${data.doctorName}`,
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
          <h1 style="margin:24px 0 8px;font-size:20px;font-weight:600;color:#111827;">Appointment Confirmed</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Hi ${data.patientName}, your appointment has been confirmed.</p>
          <div style="background:#f9fafb;border-radius:8px;padding:20px;margin:0 0 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:13px;color:#9ca3af;padding:4px 0;">Doctor</td>
                <td style="font-size:13px;font-weight:600;color:#111827;text-align:right;">${data.doctorName}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#9ca3af;padding:4px 0;">Date & Time</td>
                <td style="font-size:13px;font-weight:600;color:#111827;text-align:right;">${data.date}</td>
              </tr>
              ${data.clinicName ? `<tr><td style="font-size:13px;color:#9ca3af;padding:4px 0;">Clinic</td><td style="font-size:13px;font-weight:600;color:#111827;text-align:right;">${data.clinicName}</td></tr>` : ""}
            </table>
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