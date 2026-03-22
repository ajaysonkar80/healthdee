import { features } from "@/lib/config/features";
import { logger } from "../utils/logger";

const ZEPTO_API_URL = "https://api.zeptomail.in/v1.1/email";
const ZEPTO_API_KEY = process.env.ZEPTO_API_KEY ?? "";
const FROM_ADDRESS  = process.env.EMAIL_FROM_ADDRESS ?? "noreply@healthdee.in";
const FROM_NAME     = process.env.EMAIL_FROM_NAME    ?? "HealthDee";

export interface SendEmailOptions {
  to:      string;
  toName?: string;
  subject: string;
  html:    string;
}

export async function sendEmail(opts: SendEmailOptions): Promise<void> {
  if (!features.SEND_EMAILS) {
    logger.debug("Email sending disabled — skipping", {
      to:      opts.to,
      subject: opts.subject,
      preview: opts.html.replace(/<[^>]+>/g, " ").trim().slice(0, 200),
    });
    return;
  }

  if (!ZEPTO_API_KEY) {
    logger.error("ZEPTO_API_KEY not set — email not sent", { to: opts.to });
    return;
  }

  const payload = {
    from: { address: FROM_ADDRESS, name: FROM_NAME },
    to: [{ email_address: { address: opts.to, name: opts.toName ?? opts.to } }],
    subject:  opts.subject,
    htmlbody: opts.html,
  };

  const res = await fetch(ZEPTO_API_URL, {
    method:  "POST",
    headers: {
      Authorization: `Zoho-enczapikey ${ZEPTO_API_KEY}`,
      "Content-Type": "application/json",
      Accept:         "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    logger.error("Zepto API error", { status: res.status, body });
  }
}