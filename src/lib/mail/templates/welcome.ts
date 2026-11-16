import { DAILY_LIMITS } from "@/config/limits";
import { routes, siteConfig } from "@/config/site";
import { escapeHtml, renderEmail, type EmailContent } from "@/lib/mail/templates/layout";

export function welcomeEmail({ name, appUrl }: { name: string; appUrl: string }): EmailContent {
  const firstName = escapeHtml(name.split(" ")[0] ?? name);

  return {
    subject: `Welcome to ${siteConfig.name}`,
    ...renderEmail({
      appUrl,
      preheader: `Your account is ready, with ${DAILY_LIMITS.user} files a day.`,
      heading: `Welcome, ${firstName}.`,
      paragraphs: [
        `Your ${escapeHtml(siteConfig.name)} account is ready. You can now process up to <strong>${DAILY_LIMITS.user} files a day</strong> across every tool.`,
        "Remove AI metadata, convert between JPG, PNG, WebP and AVIF, or inspect what an image is carrying before you share it.",
      ],
      cta: { label: "Open your dashboard", url: `${appUrl}${routes.dashboard}` },
      footnote: "You're receiving this because you just created an account. If that wasn't you, you can ignore this email.",
    }),
  };
}
