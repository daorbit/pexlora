import "server-only";
import { BLOG_CMS } from "@/config/blog";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get mongodbUri() {
    return required("MONGODB_URI");
  },
  get mongodbDbName() {
    return process.env.MONGODB_DB_NAME ?? "pexlora";
  },
  get sessionSecret() {
    return required("SESSION_SECRET");
  },
  get appUrl() {
    return (process.env.APP_URL ?? "http://localhost:5778").replace(/\/$/, "");
  },
  get smtp() {
    return {
      host: required("SMTP_HOST"),
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      user: required("SMTP_USER"),
      pass: required("SMTP_PASS"),
      from: process.env.SMTP_FROM ?? required("SMTP_USER"),
    };
  },
  get indexNowKey() {
    return process.env.INDEXNOW_KEY ?? null;
  },
  get cronSecret() {
    return process.env.CRON_SECRET ?? null;
  },
  get googleClientId() {
    return process.env.GCP_CLIENT_ID ?? null;
  },
  get google() {
    return {
      clientId: required("GCP_CLIENT_ID"),
      clientSecret: required("GCP_CLIENT_SECRET"),
      redirectUri: process.env.GCP_REDIRECT_URI || null,
    };
  },
  get cloudflareAi() {
    return {
      accountId: required("NO_REPLY_MAIL_CLOUDFLARE_ACCOUNT_ID"),
      apiToken: required("NO_REPLY_MAIL_CLOUDFLARE_API_TOKEN"),
    };
  },
  get razorpay() {
    return {
      keyId: required("RAZORPAY_KEY_ID"),
      keySecret: required("RAZORPAY_KEY_SECRET"),
    };
  },
  get razorpayWebhookSecret() {
    return required("RAZORPAY_WEBHOOK_SECRET");
  },
  get cms() {
    return {
      apiUrl: (process.env.CMS_API_URL ?? BLOG_CMS.apiUrl).replace(/\/$/, ""),
      workspaceId: process.env.CMS_WORKSPACE_ID ?? BLOG_CMS.workspaceId,
    };
  },
  get paymentTestAmountPaise() {
    if (process.env.VERCEL_ENV === "production") return null;
    const rupees = Number(process.env.PAYMENT_TEST_PRICE_INR);
    return Number.isFinite(rupees) && rupees >= 1 ? Math.round(rupees * 100) : null;
  },
  isProduction: process.env.NODE_ENV === "production",
};
