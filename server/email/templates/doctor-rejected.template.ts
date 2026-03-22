// server/email/templates/doctor-rejected.template.ts

interface DoctorRejectedTemplateData {
  name:   string;
  reason: string;
}

export function doctorRejectedEmailTemplate(data: DoctorRejectedTemplateData) {
  return {
    subject: `Update on your HealthDee verification application`,
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
          <h1 style="margin:24px 0 12px;font-size:20px;font-weight:600;color:#111827;">
            Verification not approved
          </h1>
          <p style="margin:0 0 16px;font-size:14px;color:#6b7280;">
            Hi Dr. ${data.name}, after reviewing your application our team was unable to verify your profile at this time.
          </p>
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:0 0 24px;">
            <p style="margin:0;font-size:13px;color:#dc2626;font-weight:500;">Reason:</p>
            <p style="margin:4px 0 0;font-size:13px;color:#7f1d1d;">${data.reason}</p>
          </div>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">
            Please update your profile with the correct information and our team will review it again.
          </p>
          <div style="text-align:center;margin:0 0 24px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://healthdee.in"}/doctor/verification"
               style="display:inline-block;background:#db2777;color:#fff;padding:12px 28px;border-radius:8px;font-weight:600;text-decoration:none;font-size:14px;">
              Update Profile
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