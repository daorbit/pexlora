import { siteConfig } from "@/config/site";
import { escapeHtml, renderEmail, type EmailContent } from "@/lib/mail/templates/layout";

type ResetPasswordEmailOptions = {
  name: string;
  appUrl: string;
  resetUrl: string;
  expiresInMinutes: number;
};

export function resetPasswordEmail({ name, appUrl, resetUrl, expiresInMinutes }: ResetPasswordEmailOptions): EmailContent {
  const firstName = escapeHtml(name.split(" ")[0] ?? name);

  return {
    subject: `Reset your ${siteConfig.name} password`,
    ...renderEmail({
      appUrl,
      preheader: `This link works for ${expiresInMinutes} minutes.`,
      heading: `Reset your password, ${firstName}.`,
      paragraphs: [
        `Someone asked to reset the password for your ${escapeHtml(siteConfig.name)} account. Use the button below to choose a new one.`,
        `The link works once and expires in <strong>${expiresInMinutes} minutes</strong>.`,
      ],
      cta: { label: "Choose a new password", url: resetUrl },
      footnote: "If you didn't ask for this, you can ignore this email. Your password stays the same.",
    }),
  };
}
