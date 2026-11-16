import { routes, siteConfig } from "@/config/site";
import { escapeHtml, firstName, renderEmail, type EmailContent } from "@/lib/mail/templates/layout";

export function accountExistsEmail({ name, appUrl }: { name: string; appUrl: string }): EmailContent {
  return {
    subject: `You already have a ${siteConfig.name} account`,
    ...renderEmail({
      appUrl,
      preheader: "Someone tried to create a new account with this email address.",
      heading: "You already have an account",
      paragraphs: [
        `Hi ${escapeHtml(firstName(name))},`,
        `Someone just tried to create a new ${siteConfig.name} account with this email address. Since you already have one, no new account was created.`,
        `If that was you, sign in instead. If you've forgotten your password, you can <a href="${escapeHtml(appUrl)}${routes.forgotPassword}" style="color:#10120d;">reset it here</a>.`,
      ],
      cta: { label: "Sign in", url: `${appUrl}${routes.signIn}` },
      reason: "You received this email because a sign-up was attempted with your address. If it wasn't you, no action is needed.",
    }),
  };
}
