import { company } from "@/config/company";
import { routes, siteConfig } from "@/config/site";
import { escapeHtml, firstName, renderEmail, type EmailContent } from "@/lib/mail/templates/layout";

export function passwordChangedEmail({ name, appUrl }: { name: string; appUrl: string }): EmailContent {
  return {
    subject: `Your ${siteConfig.name} password was changed`,
    ...renderEmail({
      appUrl,
      preheader: "Other devices have been signed out.",
      heading: "Your password was changed",
      paragraphs: [
        `Hi ${escapeHtml(firstName(name))},`,
        `The password for your ${siteConfig.name} account was just changed. For your security, every other device signed in to your account has been signed out.`,
        `If you didn't make this change, reset your password right away and contact us at <a href="mailto:${company.email}" style="color:#10120d;">${company.email}</a>.`,
      ],
      cta: { label: "Reset password", url: `${appUrl}${routes.forgotPassword}` },
      reason: "You received this email because the password on your account changed.",
    }),
  };
}
