import type { FileKind } from "@/config/file-formats";

export const PLAN_IDS =["pro-30", "pro-365", "pro-lifetime"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export type Plan = {
  id: PlanId;
  amountPaise: number;
  currency: "INR";
  days: number | null;
  featured?: boolean;
};

export const PLANS: Record<PlanId, Plan> = {
  "pro-30": { id: "pro-30", amountPaise: 9_900, currency: "INR", days: 30 },
  "pro-365": { id: "pro-365", amountPaise: 49_900, currency: "INR", days: 365, featured: true },
  "pro-lifetime": { id: "pro-lifetime", amountPaise: 149_900, currency: "INR", days: null },
};

export const PRO_LIMITS = { files: 2_000, ai: 100 } as const;

export const PRO_FILES_PER_BATCH = 50;

export const PRO_PARALLEL_FILE_JOBS = 6;

export const PRO_LOCAL_FILE_SIZE_LIMITS_MB: Record<FileKind, number> = {
  image: 20,
  vector: 20,
  pdf: 500,
  office: 500,
  sheet: 200,
  audio: 1024,
  video: 2048,
};

export const PLAN_TIERS = ["pro"] as const;
export type PlanTier = (typeof PLAN_TIERS)[number];

export const PURCHASE_STATUSES = ["created", "paid", "failed", "refunded"] as const;
export type PurchaseStatus = (typeof PURCHASE_STATUSES)[number];

export const PAYMENT_APP_TAG = "pexlora";

export const REFUND_WINDOW_DAYS = 7;

export function isPlanId(value: unknown): value is PlanId {
  return PLAN_IDS.includes(value as PlanId);
}

export function formatPrice(paise: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paise / 100);
}

export function formatPerDay(paise: number, days: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(paise / 100 / days);
}
