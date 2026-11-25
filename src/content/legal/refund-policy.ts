import { company } from "@/config/company";
import { DAILY_LIMITS } from "@/config/limits";
import { PLAN_IDS, PLANS, REFUND_WINDOW_DAYS, formatPrice } from "@/config/plans";
import { routes, siteConfig } from "@/config/site";
import { planCopy } from "@/content/pricing";
import type { LegalDocument } from "@/content/legal/types";

const { name } = siteConfig;

const duration = (days: number | null) => (days === null ? "No expiry" : `${days} days from payment`);

export const refundPolicy: LegalDocument = {
  slug: "refunds",
  path: routes.refunds,
  navLabel: "Refunds",
  title: "Refund, Cancellation & Delivery Policy",
  metaTitle: "Refund, Cancellation & Delivery Policy",
  description: `How ${name} Pro passes are delivered, how to cancel and how to get a refund within ${REFUND_WINDOW_DAYS} days.`,
  lead: `${name} Pro is a digital pass sold by ${company.legalName}. This page explains what you get, when you get it and how refunds work.`,
  highlights: [
    { title: "One payment", body: "Every pass is paid once. Nothing renews and we never charge you again." },
    { title: "Instant delivery", body: "Pro switches on in your account as soon as the payment goes through." },
    { title: `${REFUND_WINDOW_DAYS}-day refunds`, body: `Ask within ${REFUND_WINDOW_DAYS} days of paying for a full refund.` },
    { title: "Nothing to ship", body: "Pro is digital access to higher limits. There are no physical goods." },
  ],
  sections: [
    {
      id: "plans",
      heading: "What you buy",
      blocks: [
        {
          type: "table",
          columns: ["Pass", "Price", "Access"],
          rows: PLAN_IDS.map((id) => [planCopy[id].name, formatPrice(PLANS[id].amountPaise), duration(PLANS[id].days)]),
        },
        {
          type: "p",
          text: "Prices are in Indian rupees and are our regular prices. During a limited-time offer, the pricing page and Checkout show the lower price. Buying again while a pass is active adds the new days to the end of your current pass.",
        },
      ],
    },
    {
      id: "delivery",
      heading: "Delivery",
      blocks: [
        {
          type: "p",
          text: `Pro is delivered digitally to the ${name} account you are signed in to when you pay. It is usually active within seconds and always within 24 hours. You'll see it under Settings in your dashboard.`,
        },
        {
          type: "p",
          text: `If Pro isn't active 24 hours after a successful payment, email ${company.email} with your payment ID and we'll sort it out.`,
        },
      ],
    },
    {
      id: "cancellation",
      heading: "Cancellation",
      blocks: [
        {
          type: "p",
          text: `There is nothing to cancel: passes don't renew. When a pass ends, your account returns to the free limit of ${DAILY_LIMITS.user} files a day. Passes can't be paused or moved to another account.`,
        },
      ],
    },
    {
      id: "refunds",
      heading: "Refunds",
      blocks: [
        {
          type: "list",
          items: [
            `Ask for a refund within ${REFUND_WINDOW_DAYS} days of paying by emailing ${company.email} from your account's email address. Include the payment ID if you have it.`,
            "We refund the full amount to the original payment method. Razorpay usually returns the money within 5 to 7 working days.",
            "When the refund is processed, Pro is removed from your account.",
            `After ${REFUND_WINDOW_DAYS} days, refunds are only given for duplicate payments or if we couldn't deliver Pro.`,
          ],
        },
        {
          type: "callout",
          title: "Paid twice by mistake?",
          text: "We refund duplicate payments in full at any time.",
        },
      ],
    },
    {
      id: "payments",
      heading: "Payments",
      blocks: [
        {
          type: "p",
          text: `Payments are handled by Razorpay. Your card, UPI or bank details go to Razorpay and never reach ${name}'s servers.`,
        },
      ],
    },
  ],
};
