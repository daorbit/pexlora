import { siteConfig } from "@/config/site";
import { renderEmail, type EmailContent } from "@/lib/mail/templates/layout";

type VerificationCodeEmailOptions = { appUrl: string; code: string; expiresInMinutes: number };

export function verificationCodeEmail({ appUrl, code, expiresInMinutes }: VerificationCodeEmailOptions): EmailContent {
  return {
    subject: `${code} is your ${siteConfig.name} verification code`,
    ...renderEmail({
      appUrl,
      preheader: `Enter this code to finish creating your account. It expires in ${expiresInMinutes} minutes.`,
      heading: "Confirm your email address",
      paragraphs: [`Enter this code on the sign-up page to finish creating your ${siteConfig.name} account.`],
      code,
      note: `The code expires in ${expiresInMinutes} minutes. Never share it with anyone. ${siteConfig.name} will never ask you for it.`,
      reason: `You received this email because someone started creating a ${siteConfig.name} account with this address. If it wasn't you, you can ignore it.`,
    }),
  };
}
