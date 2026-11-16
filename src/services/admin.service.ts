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
import { escapeRegex } from "@/lib/utils/escape-regex";
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
};

type UserRow = Pick<UserDocument, "_id" | "name" | "email" | "avatarUrl" | "googleId" | "role" | "limits" | "createdAt"> & {
  passwordHash?: string | null;
};

const ROW_FIELDS = "name email avatarUrl googleId role limits createdAt +passwordHash";

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

export async function getAdminStats() {
  await connectToDatabase();
  const [totalUsers, newThisWeek, superAdmins, usage] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ createdAt: { $gte: new Date(Date.now() - WEEK_MS) } }),
    User.countDocuments({ $or: [{ role: "super_admin" }, { email: { $in: OWNER_EMAILS } }] }),
    getUsageTotalsToday(),
  ]);
  return { totalUsers, newThisWeek, superAdmins, filesToday: usage.files, aiToday: usage.ai };
}

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
