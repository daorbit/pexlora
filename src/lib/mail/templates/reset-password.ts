import { siteConfig } from "@/config/site";
import { escapeHtml, firstName, renderEmail, type EmailContent } from "@/lib/mail/templates/layout";

type ResetPasswordEmailOptions = {
  name: string;
  appUrl: string;
  resetUrl: string;
  expiresInMinutes: number;
};

export function resetPasswordEmail({ name, appUrl, resetUrl, expiresInMinutes }: ResetPasswordEmailOptions): EmailContent {
  return {
    subject: `Reset your ${siteConfig.name} password`,
    ...renderEmail({
      appUrl,
      preheader: `This link expires in ${expiresInMinutes} minutes.`,
      heading: "Reset your password",
      paragraphs: [
        `Hi ${escapeHtml(firstName(name))},`,
        `We received a request to reset the password for your ${siteConfig.name} account. Use the button below to choose a new one.`,
      ],
      cta: { label: "Choose a new password", url: resetUrl },
      note: `The link expires in ${expiresInMinutes} minutes and works once. If you didn't ask for this, ignore this email and your password won't change.`,
      reason: "You received this email because a password reset was requested for your account.",
    }),
  };
}
