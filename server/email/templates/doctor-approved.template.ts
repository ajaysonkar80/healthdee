// server/email/templates/doctor-approved.template.ts

interface DoctorApprovedTemplateData {
  name: string;
}

export function doctorApprovedEmailTemplate(data: DoctorApprovedTemplateData) {
  return {
    subject: `Your HealthDee doctor profile has been verified ✓`,
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
          <div style="text-align:center;padding:24px 0;">
            <div style="display:inline-block;background:#d1fae5;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;">✓</div>
          </div>
          <h1 style="margin:0 0 12px;font-size:20px;font-weight:600;color:#111827;text-align:center;">
            You're verified, Dr. ${data.name}!
          </h1>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;text-align:center;">
            Your profile has been verified by our team. You can now start accepting patient appointments on HealthDee.
          </p>
          <div style="text-align:center;margin:0 0 24px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://healthdee.in"}/doctor"
               style="display:inline-block;background:#db2777;color:#fff;padding:12px 28px;border-radius:8px;font-weight:600;text-decoration:none;font-size:14px;">
              Go to Dashboard
            </a>
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