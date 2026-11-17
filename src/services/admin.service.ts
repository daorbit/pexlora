import "server-only";
import { isValidObjectId } from "mongoose";
import { ADMIN_USERS_PAGE_SIZE, OWNER_EMAILS, type UserRole } from "@/config/roles";
import { connectToDatabase } from "@/lib/db/mongoose";
import {
  customLimits,
  effectiveLimits,
  effectiveRole,
  isOwner,
  type CustomLimits,
  type UserLimits,
} from "@/lib/auth/roles";
import { activePlan, type ActivePlan } from "@/lib/auth/plan";
import { escapeRegex } from "@/lib/utils/escape-regex";
import type { PlanId, PurchaseStatus } from "@/config/plans";
import { Purchase } from "@/models/Purchase";
import { User, type UserDocument } from "@/models/User";
import {
  aiUsageKey,
  clearAllUsage,
  clearUsageToday,
  getUsageTodayByKey,
  getUsageTotalsToday,
  usageKeys,
} from "@/services/usage.service";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  owner: boolean;
  hasGoogle: boolean;
  hasPassword: boolean;
  joined: string;
  usage: UserLimits;
  limits: UserLimits;
  custom: CustomLimits;
  plan: ActivePlan | null;
  lapsedPlan: boolean;
};

export type AdminPurchase = {
  id: string;
  plan: PlanId;
  amount: number;
  currency: string;
  status: PurchaseStatus;
  orderId: string;
  paymentId: string | null;
  createdAt: string;
  paidAt: string | null;
  refundedAt: string | null;
};

type UserRow = Pick<UserDocument, "_id" | "name" | "email" | "avatarUrl" | "googleId" | "role" | "limits" | "plan" | "createdAt"> & {
  passwordHash?: string | null;
};

const ROW_FIELDS = "name email avatarUrl googleId role limits plan createdAt +passwordHash";

const usageKeysFor = (id: string) => [usageKeys.user(id), aiUsageKey(usageKeys.user(id))];

function toAdminUser(user: UserRow, usage: Map<string, number>): AdminUser {
  const id = user._id.toString();
  const [filesKey, aiKey] = usageKeysFor(id);
  return {
    id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl ?? undefined,
    role: effectiveRole(user),
    owner: isOwner(user.email),
    hasGoogle: Boolean(user.googleId),
    hasPassword: Boolean(user.passwordHash),
    joined: new Date(user.createdAt).toISOString(),
    usage: { files: usage.get(filesKey) ?? 0, ai: usage.get(aiKey) ?? 0 },
    limits: effectiveLimits(user),
    custom: customLimits(user),
    plan: activePlan(user),
    lapsedPlan: user.plan?.tier === "pro" && !activePlan(user),
  };
}

async function withUsage(users: UserRow[]) {
  const usage = await getUsageTodayByKey(users.flatMap((user) => usageKeysFor(user._id.toString())));
  return users.map((user) => toAdminUser(user, usage));
}

function searchFilter(query: string): Record<string, unknown> {
  const term = query.trim();
  if (!term) return {};
  const pattern = new RegExp(escapeRegex(term), "i");
  return { $or: [{ name: pattern }, { email: pattern }] };
}

export async function listAdminUsers({ query = "", page = 1 }: { query?: string; page?: number }) {
  await connectToDatabase();
  const filter = searchFilter(query);
  const total = await User.countDocuments(filter);
  const pageCount = Math.max(1, Math.ceil(total / ADMIN_USERS_PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pageCount);

  const users = await User.find(filter)
    .select(ROW_FIELDS)
    .sort({ createdAt: -1 })
    .skip((current - 1) * ADMIN_USERS_PAGE_SIZE)
    .limit(ADMIN_USERS_PAGE_SIZE)
    .lean<UserRow[]>();

  return { users: await withUsage(users), total, page: current, pageCount };
}

export async function getAdminUser(id: string) {
  if (!isValidObjectId(id)) return null;
  await connectToDatabase();
  const user = await User.findById(id).select(ROW_FIELDS).lean<UserRow>();
  if (!user) return null;
  const [adminUser] = await withUsage([user]);
  return adminUser ?? null;
}

export async function listAdminPurchases(userId: string): Promise<AdminPurchase[]> {
  if (!isValidObjectId(userId)) return [];
  await connectToDatabase();
  const purchases = await Purchase.find({ userId }).sort({ createdAt: -1 }).limit(100).lean();
  return purchases.map((purchase) => ({
    id: purchase._id.toString(),
    plan: purchase.plan,
    amount: purchase.amount,
    currency: purchase.currency,
    status: purchase.status,
    orderId: purchase.razorpayOrderId,
    paymentId: purchase.razorpayPaymentId ?? null,
    createdAt: new Date(purchase.createdAt).toISOString(),
    paidAt: purchase.paidAt ? new Date(purchase.paidAt).toISOString() : null,
    refundedAt: purchase.refundedAt ? new Date(purchase.refundedAt).toISOString() : null,
  }));
}

async function getRevenueTotals() {
  const [totals] = await Purchase.aggregate<{ revenue: number; paid: number; refunded: number }>([
    { $match: { status: { $in: ["paid", "refunded"] } } },
    {
      $group: {
        _id: null,
        revenue: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0] } },
        paid: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, 1, 0] } },
        refunded: { $sum: { $cond: [{ $eq: ["$status", "refunded"] }, 1, 0] } },
      },
    },
  ]);
  return totals ?? { revenue: 0, paid: 0, refunded: 0 };
}

export async function getAdminStats() {
  await connectToDatabase();
  const now = new Date();
  const [totalUsers, newThisWeek, superAdmins, proMembers, revenue, usage] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ createdAt: { $gte: new Date(now.getTime() - WEEK_MS) } }),
    User.countDocuments({ $or: [{ role: "super_admin" }, { email: { $in: OWNER_EMAILS } }] }),
    User.countDocuments({ "plan.tier": "pro", $or: [{ "plan.expiresAt": null }, { "plan.expiresAt": { $gt: now } }] }),
    getRevenueTotals(),
    getUsageTotalsToday(),
  ]);
  return {
    totalUsers,
    newThisWeek,
    superAdmins,
    proMembers,
    revenue: revenue.revenue,
    paidPurchases: revenue.paid,
    refundedPurchases: revenue.refunded,
    filesToday: usage.files,
    aiToday: usage.ai,
  };
}

export type AdminStatsData = Awaited<ReturnType<typeof getAdminStats>>;

export async function setUserRole(id: string, role: UserRole) {
  await connectToDatabase();
  await User.updateOne({ _id: id }, { $set: { role } });
}

export async function setUserLimits(id: string, limits: CustomLimits) {
  await connectToDatabase();
  await User.updateOne({ _id: id }, { $set: { "limits.files": limits.files, "limits.ai": limits.ai } });
}

export async function resetUserUsageToday(id: string) {
  await clearUsageToday(usageKeysFor(id));
}

export async function deleteUserAccount(id: string) {
  await connectToDatabase();
  await Promise.all([User.deleteOne({ _id: id }), clearAllUsage(usageKeysFor(id))]);
}
