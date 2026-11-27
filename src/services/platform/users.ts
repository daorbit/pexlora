import "server-only";
import { isValidObjectId, Types } from "mongoose";
import { connectToDatabase } from "@/lib/db/mongoose";
import { effectiveRole } from "@/lib/auth/roles";
import { escapeRegex } from "@/lib/utils/escape-regex";
import { User } from "@/models/User";
import { getAdminUser } from "@/services/admin.service";
import { listPlatformPayments } from "@/services/platform/payments";
import { cursorFilter, iso, nextCursor, pageSize, planSummary } from "@/services/platform/present";
import { subscriptionFor } from "@/services/platform/subscriptions";

type UserRow = {
  _id: Types.ObjectId;
  email: string;
  name: string;
  role?: string | null;
  plan?: { tier?: string | null; id?: string | null; expiresAt?: Date | null } | null;
  lastActiveAt?: Date | null;
  createdAt: Date;
};

const FIELDS = "email name role plan lastActiveAt createdAt";

function present(row: UserRow) {
  return {
    id: String(row._id),
    email: row.email,
    name: row.name,
    emailVerified: true,
    status: "active" as const,
    role: effectiveRole({ email: row.email, role: row.role }),
    createdAt: iso(row.createdAt) as string,
    lastActiveAt: iso(row.lastActiveAt),
    plan: planSummary(row.plan),
  };
}

export async function listPlatformUsers(url: URL) {
  await connectToDatabase();
  const limit = pageSize(url.searchParams.get("limit"));
  const filter: Record<string, unknown> = { ...cursorFilter(url.searchParams.get("cursor")) };
  const term = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
  if (term) {
    const pattern = new RegExp(escapeRegex(term), "i");
    filter.$or = [{ email: pattern }, { name: pattern }, ...(isValidObjectId(term) ? [{ _id: new Types.ObjectId(term) }] : [])];
  }
  const rows = await User.find(filter).sort({ _id: -1 }).limit(limit + 1).select(FIELDS).lean<UserRow[]>();
  return { items: rows.slice(0, limit).map(present), nextCursor: nextCursor(rows, limit) };
}

export async function platformUserDetail(id: string) {
  if (!isValidObjectId(id)) return null;
  await connectToDatabase();
  const [row, admin, payments] = await Promise.all([
    User.findById(id).select(FIELDS).lean<UserRow>(),
    getAdminUser(id),
    listPlatformPayments({ status: null, cursor: null, limit: "50", userId: id }),
  ]);
  if (!row || !admin) return null;

  const subscription = subscriptionFor(row);
  return {
    user: present(row),
    workspaces: [],
    subscriptions: subscription ? [subscription] : [],
    payments: payments.items,
    facts: [
      { label: "Sign-in methods", value: [admin.hasPassword && "Password", admin.hasGoogle && "Google"].filter(Boolean).join(", ") || "None" },
      { label: "Files today", value: `${admin.usage.files} of ${admin.limits.files}` },
      { label: "AI requests today", value: `${admin.usage.ai} of ${admin.limits.ai}` },
      { label: "Custom limits", value: admin.custom.files !== null || admin.custom.ai !== null ? `Files ${admin.custom.files ?? "default"}, AI ${admin.custom.ai ?? "default"}` : "None" },
    ],
  };
}
