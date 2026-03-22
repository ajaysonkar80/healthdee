// server/email/templates/password-reset.template.ts

interface PasswordResetTemplateData {
  name:             string;
  otp:              string;
  expiresInMinutes: number;
}

export function passwordResetEmailTemplate(data: PasswordResetTemplateData) {
  return {
    subject: `Reset your HealthDee password`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;padding:40px;box-shadow:0 1px 3px rgba(0,0,0,.08);">
        <tr><td>
          <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#db2777;">HealthDee</p>
          <h1 style="margin:24px 0 8px;font-size:20px;font-weight:600;color:#111827;">Reset your password</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">
            Hi ${data.name}, we received a request to reset your password. Use the code below.
          </p>

          <div style="background:#fdf2f8;border:1px solid #fbcfe8;border-radius:8px;padding:24px;text-align:center;margin:0 0 24px;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:500;color:#9ca3af;letter-spacing:.08em;text-transform:uppercase;">Reset code</p>
            <p style="margin:0;font-size:40px;font-weight:700;color:#db2777;letter-spacing:.2em;">${data.otp}</p>
          </div>

          <p style="margin:0 0 24px;font-size:13px;color:#9ca3af;">
            Expires in <strong>${data.expiresInMinutes} minutes</strong>.
            If you didn't request a password reset, please ignore this email — your password will not change.
          </p>

          <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">
          <p style="margin:0;font-size:12px;color:#d1d5db;text-align:center;">
            HealthDee · Never share this code with anyone, including HealthDee staff.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}