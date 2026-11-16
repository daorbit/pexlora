import { DAILY_LIMITS } from "@/config/limits";
import { routes, siteConfig } from "@/config/site";
import { escapeHtml, firstName, renderEmail, type EmailContent } from "@/lib/mail/templates/layout";

export function welcomeEmail({ name, appUrl }: { name: string; appUrl: string }): EmailContent {
  return {
    subject: `Your ${siteConfig.name} account is ready`,
    ...renderEmail({
      appUrl,
      preheader: `You can now process up to ${DAILY_LIMITS.user} files a day.`,
      heading: "Your account is ready",
      paragraphs: [
        `Hi ${escapeHtml(firstName(name))},`,
        `Thanks for signing up. Your daily limit is now ${DAILY_LIMITS.user} files across every tool, from removing metadata to compressing and converting images.`,
        "Your files are processed only to give you the result. We don't keep them.",
      ],
      cta: { label: "Go to your dashboard", url: `${appUrl}${routes.dashboard}` },
      reason: `You received this email because you created a ${siteConfig.name} account.`,
    }),
  };
}
