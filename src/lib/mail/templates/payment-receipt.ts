import { company } from "@/config/company";
import { REFUND_WINDOW_DAYS } from "@/config/plans";
import { routes, siteConfig } from "@/config/site";
import { escapeHtml, firstName, renderEmail, type EmailContent } from "@/lib/mail/templates/layout";

type ReceiptInput = {
  name: string;
  appUrl: string;
  planName: string;
  amount: string;
  paymentId: string;
  activeUntil: string | null;
};

export function paymentReceiptEmail({ name, appUrl, planName, amount, paymentId, activeUntil }: ReceiptInput): EmailContent {
  const access = activeUntil ? `Pro is active on your account until ${activeUntil}.` : "Pro is active on your account for life.";

  return {
    subject: `Your ${siteConfig.name} Pro receipt: ${amount}`,
    ...renderEmail({
      appUrl,
      preheader: access,
      heading: "Payment received",
      paragraphs: [
        `Hi ${escapeHtml(firstName(name))},`,
        `Thanks for buying the ${escapeHtml(planName)} for ${amount}. ${access} It's a one-time payment and will not renew.`,
        `Payment ID: ${escapeHtml(paymentId)}`,
        `You can ask for a full refund within ${REFUND_WINDOW_DAYS} days by replying to <a href="mailto:${company.email}" style="color:#10120d;">${company.email}</a>.`,
      ],
      cta: { label: "Open settings", url: `${appUrl}${routes.dashboardSettings}` },
      reason: `You received this email because you bought ${siteConfig.name} Pro.`,
    }),
  };
}
