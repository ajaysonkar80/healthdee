export const OtpChannel = {
  whatsapp: "whatsapp",
  email: "email",
} as const;

export type OtpChannelValue =
  typeof OtpChannel[keyof typeof OtpChannel];
