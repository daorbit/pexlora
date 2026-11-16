import "server-only";
import { isValidObjectId } from "mongoose";
import { after } from "next/server";
import { PLANS, PAYMENT_APP_TAG, formatPrice, type PlanId } from "@/config/plans";
import { planCopy } from "@/content/pricing";
import { connectToDatabase } from "@/lib/db/mongoose";
import { env } from "@/lib/env";
import { createRazorpayOrder } from "@/lib/payments/razorpay";
import { formatDate } from "@/lib/utils/format-date";
import { sendPaymentReceiptEmail } from "@/services/mail.service";
import { Purchase } from "@/models/Purchase";
import { User } from "@/models/User";

const DAY_MS = 24 * 60 * 60 * 1000;

export type GrantResult = { ok: true; expiresAt: Date | null } | { ok: false };

export async function createPurchaseOrder(userId: string, planId: PlanId) {
  const plan = PLANS[planId];
  const order = await createRazorpayOrder({
    amount: env.paymentTestAmountPaise ?? plan.amountPaise,
    currency: plan.currency,
    receipt: `${PAYMENT_APP_TAG}-${Date.now().toString(36)}`,
    notes: { app: PAYMENT_APP_TAG, userId, plan: plan.id },
  });

  await connectToDatabase();
  await Purchase.create({
    userId,
    plan: plan.id,
    amount: order.amount,
    currency: order.currency,
    razorpayOrderId: order.id,
  });

  return order;
}

async function recomputePlan(userId: string) {
  const purchases = await Purchase.find({ userId, status: "paid" }).sort({ paidAt: 1 }).select("plan paidAt").lean();

  let lifetime = false;
  let expiresAt = 0;
  let latest: PlanId | null = null;
  for (const purchase of purchases) {
    const { days } = PLANS[purchase.plan];
    if (days === null) lifetime = true;
    else expiresAt = Math.max(expiresAt, new Date(purchase.paidAt ?? Date.now()).getTime()) + days * DAY_MS;
    latest = purchase.plan;
  }

  if (lifetime) {
    await User.updateOne({ _id: userId }, { $set: { plan: { tier: "pro", id: "pro-lifetime", expiresAt: null } } });
    return null;
  }
  if (!latest) {
    await User.updateOne({ _id: userId }, { $unset: { plan: 1 } });
    return null;
  }
  const end = new Date(expiresAt);
  await User.updateOne({ _id: userId }, { $set: { plan: { tier: "pro", id: latest, expiresAt: end } } });
  return end;
}

async function sendReceipt(userId: string, plan: PlanId, amount: number, paymentId: string, expiresAt: Date | null) {
  const user = await User.findById(userId).select("name email").lean();
  if (!user) return;
  await sendPaymentReceiptEmail(user, {
    planName: planCopy[plan].name,
    amount: formatPrice(amount),
    paymentId,
    activeUntil: expiresAt ? formatDate(expiresAt, "long") : null,
  });
}

export async function grantPurchase(orderId: string, paymentId: string, userId?: string): Promise<GrantResult> {
  await connectToDatabase();
  const owner = userId && isValidObjectId(userId) ? { userId } : {};

  const purchase = await Purchase.findOneAndUpdate(
    { razorpayOrderId: orderId, status: "created", ...owner },
    { $set: { status: "paid", razorpayPaymentId: paymentId, paidAt: new Date() } },
    { returnDocument: "after" },
  ).lean();

  if (purchase) {
    const expiresAt = await recomputePlan(purchase.userId.toString());
    after(() => sendReceipt(purchase.userId.toString(), purchase.plan, purchase.amount, paymentId, expiresAt));
    return { ok: true, expiresAt };
  }

  const existing = await Purchase.findOne({ razorpayOrderId: orderId, status: "paid", ...owner }).select("userId").lean();
  if (!existing) return { ok: false };
  const user = await User.findById(existing.userId).select("plan").lean();
  return { ok: true, expiresAt: user?.plan?.expiresAt ?? null };
}

export async function markPurchaseFailed(orderId: string) {
  await connectToDatabase();
  await Purchase.updateOne({ razorpayOrderId: orderId, status: "created" }, { $set: { status: "failed" } });
}

export async function revokePurchase(paymentId: string) {
  await connectToDatabase();
  const purchase = await Purchase.findOneAndUpdate(
    { razorpayPaymentId: paymentId, status: "paid" },
    { $set: { status: "refunded", refundedAt: new Date() } },
    { returnDocument: "after" },
  ).lean();
  if (purchase) await recomputePlan(purchase.userId.toString());
}

export async function isKnownPurchase(orderId: string, amount: number) {
  await connectToDatabase();
  return Boolean(await Purchase.exists({ razorpayOrderId: orderId, amount }));
}

export type BillingEntry = {
  id: string;
  plan: PlanId;
  amount: number;
  status: "paid" | "refunded";
  paidAt: string;
};

export async function listBillingHistory(userId: string): Promise<BillingEntry[]> {
  if (!isValidObjectId(userId)) return [];
  await connectToDatabase();
  const purchases = await Purchase.find({ userId, status: { $in: ["paid", "refunded"] } })
    .sort({ paidAt: -1 })
    .limit(50)
    .lean();
  return purchases.map((purchase) => ({
    id: purchase._id.toString(),
    plan: purchase.plan,
    amount: purchase.amount,
    status: purchase.status as "paid" | "refunded",
    paidAt: new Date(purchase.paidAt ?? purchase.createdAt).toISOString(),
  }));
}
