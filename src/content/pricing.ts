import { AI_NAME } from "@/config/brand";
import { AI_DAILY_LIMITS, DAILY_LIMITS, FILE_SIZE_LIMITS_MB, MAX_FILES_PER_BATCH } from "@/config/limits";
import {
  PLANS,
  PRO_FILES_PER_BATCH,
  PRO_LIMITS,
  PRO_LOCAL_FILE_SIZE_LIMITS_MB,
  REFUND_WINDOW_DAYS,
  formatPerDay,
  type Plan,
  type PlanId,
} from "@/config/plans";
import { formatMegabytes } from "@/lib/utils/format-bytes";

const number = (value: number) => value.toLocaleString("en-IN");

const freeSize = (kind: keyof typeof FILE_SIZE_LIMITS_MB) => formatMegabytes(FILE_SIZE_LIMITS_MB[kind]);
const proSize = (kind: keyof typeof PRO_LOCAL_FILE_SIZE_LIMITS_MB) => formatMegabytes(PRO_LOCAL_FILE_SIZE_LIMITS_MB[kind]);

const monthsPerYear = 12;
const yearSaving = Math.round(
  (1 - PLANS["pro-365"].amountPaise / (PLANS["pro-30"].amountPaise * monthsPerYear)) * 100,
);

export const planCopy: Record<PlanId, { name: string; period: string; note: string; cta: string }> = {
  "pro-30": { name: "30-Day Pass", period: "once", note: "For one urgent job", cta: "Get 30 Days" },
  "pro-365": { name: "1-Year Pass", period: "once", note: `Save ${yearSaving}% against monthly`, cta: "Get 1 Year" },
  "pro-lifetime": { name: "Lifetime", period: "once", note: "Keep Pro for good", cta: "Get Lifetime" },
};

export const pricingCopy = {
  metaTitle: "Pricing: Pro Passes, Paid Once",
  description: `Pexlora is free to use. Pro raises your limits to ${number(PRO_LIMITS.files)} files and ${PRO_LIMITS.ai} ${AI_NAME} requests a day with a one-time payment. No subscription, no auto-renewal.`,
  eyebrow: "Pricing",
  title: "Pay once.",
  highlight: "No subscription.",
  lead: "Every tool stays free. Pro raises your daily limits for as long as your pass lasts, and it never renews on its own.",
  featured: "Best Value",
  perksTitle: "Everything in Free, plus",
  perks: [
    `${number(PRO_LIMITS.files)} files a day`,
    `${PRO_FILES_PER_BATCH} files per batch`,
    `Photos up to ${proSize("image")}, PDFs up to ${proSize("pdf")}`,
    "Faster batch processing",
    `${PRO_LIMITS.ai} ${AI_NAME} requests a day`,
  ],
  perDay: (plan: Plan) => (plan.days === null ? "Never expires" : `${formatPerDay(plan.amountPaise, plan.days)} a day`),
  guaranteesLabel: "What every pass includes",
  guarantees: [
    { id: "once", title: "Pay once", body: "No mandate, no auto-renewal. It just ends." },
    { id: "instant", title: "Instant access", body: "Pro switches on the moment you pay." },
    { id: "refund", title: `${REFUND_WINDOW_DAYS}-day refund`, body: "Not right for you? Get the full amount back." },
    { id: "secure", title: "Razorpay checkout", body: "UPI, cards, net banking and wallets." },
  ],
  extend: "Buying again while Pro is active adds the days to your current pass.",
  testMode: (amount: string) => `Test price is on: Checkout charges ${amount} for every plan. This notice never shows on the live site.`,
  signInToBuy: "Sign In to Buy",
  activeUntil: (date: string) => `Pro is active until ${date}.`,
  activeLifetime: "You have Pro for life.",
  compareEyebrow: "Compare",
  compareTitle: "Free and Pro side by side",
  compareDescription: "Every tool works on every plan. Pro raises the limits and makes big batches faster.",
  compareColumns: [
    { label: "Signed out", short: "Guest" },
    { label: "Free account", short: "Free" },
    { label: "Pro", short: "Pro" },
  ],
  compareGroups: [
    {
      title: "Daily limits",
      rows: [
        { label: "Files per day", values: [number(DAILY_LIMITS.anonymous), number(DAILY_LIMITS.user), number(PRO_LIMITS.files)] },
        { label: "Files per batch", values: [`${MAX_FILES_PER_BATCH}`, `${MAX_FILES_PER_BATCH}`, `${PRO_FILES_PER_BATCH}`] },
        { label: "Faster batch processing", values: [false, false, true] },
      ],
    },
    {
      title: "File size, in-browser tools",
      rows: [
        { label: "Photos", values: [freeSize("image"), freeSize("image"), proSize("image")] },
        { label: "PDF and Office", values: [freeSize("pdf"), freeSize("pdf"), proSize("pdf")] },
        { label: "Audio", values: [freeSize("audio"), freeSize("audio"), proSize("audio")] },
      ],
    },
    {
      title: AI_NAME,
      rows: [
        { label: "Requests per day", values: [`${AI_DAILY_LIMITS.anonymous}`, `${AI_DAILY_LIMITS.user}`, `${PRO_LIMITS.ai}`] },
      ],
    },
    {
      title: "Always included",
      rows: [
        { label: "Every tool", values: [true, true, true] },
        { label: "No ads", values: [true, true, true] },
        { label: "Results kept on this device for 24 hours", values: [true, true, true] },
      ],
    },
  ] satisfies { title: string; rows: { label: string; values: (string | boolean)[] }[] }[],
  freeTitle: "Not ready to pay?",
  freeBody: `Every tool stays free. Create an account for ${number(DAILY_LIMITS.user)} files a day, no card needed.`,
  freeCta: "Browse Free Tools",
  faqDescription: "Payments, refunds and what happens when a pass ends.",
  faqs: [
    {
      question: "Is this a subscription?",
      answer: "No. You pay once and the pass simply ends when its time is up. We never charge your card or UPI again.",
    },
    {
      question: "What happens when my pass ends?",
      answer: `Your account goes back to the free limits of ${DAILY_LIMITS.user} files a day. Nothing is deleted.`,
    },
    {
      question: "Can I get a refund?",
      answer: `Yes. If Pro isn't right for you, ask within ${REFUND_WINDOW_DAYS} days of paying and we refund the full amount.`,
    },
    {
      question: "How do I pay?",
      answer: "Through Razorpay with UPI, cards, net banking or wallets. Your payment details go to Razorpay, never to us.",
    },
    {
      question: "When does Pro start?",
      answer: "Right after the payment goes through. Your new limits apply straight away.",
    },
  ],
};

export const checkoutCopy = {
  description: (plan: string) => `Pexlora Pro, ${plan}`,
  success: (until: string | null) => (until ? `Payment received. Pro is active until ${until}.` : "Payment received. You have Pro for life."),
  failed: "Payment didn't go through. You haven't been charged.",
  pending: "Payment received. Pro will switch on in a moment.",
  unavailable: "Payments aren't available right now. Please try again later.",
  loadFailed: "Couldn't open the payment window. Check your connection and try again.",
  processing: "Opening Checkout",
};

export const memberCopy = {
  badge: "Pro",
  member: "Pro member",
  until: (date: string) => `Until ${date}`,
  lifetime: "Lifetime",
  label: (planName: string) => `Pro member, ${planName}`,
};

export const upsellCopy = {
  account: "Create Free Account",
  pro: "Get Pro",
};

export const billingCopy = {
  title: "Plan & billing",
  currentPlan: "Current plan",
  free: "Free",
  pro: "Pro",
  until: (date: string) => `Until ${date}`,
  lifetime: "Lifetime",
  upgrade: "Get Pro",
  extend: "Extend",
  dailyLimit: "Daily limit",
  resets: "Resets every day at midnight UTC.",
  files: (count: number) => `${number(count)} files`,
  history: "Billing history",
  historyEmpty: "No payments yet.",
  refunded: "Refunded",
  paid: "Paid",
};
