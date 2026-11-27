import "server-only";
import type { Types } from "mongoose";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { cursorFilter, iso, nextCursor, pageSize, planSummary } from "@/services/platform/present";

type PassRow = {
  _id: Types.ObjectId;
  email: string;
  name: string;
  plan?: { tier?: string | null; id?: string | null; expiresAt?: Date | null } | null;
  updatedAt?: Date;
  createdAt: Date;
};

export function subscriptionFor(row: PassRow) {
  const plan = planSummary(row.plan);
  if (!plan) return null;
  return {
    id: String(row._id),
    subjectType: "user" as const,
    subjectId: String(row._id),
    subjectLabel: row.name,
    ownerId: String(row._id),
    ownerEmail: row.email,
    planKey: plan.key,
    planName: plan.name,
    cycle: "once" as const,
    status: plan.status === "expired" ? ("expired" as const) : ("active" as const),
    currentPeriodEnd: plan.expiresAt,
    autoRenew: false,
    renewalStatus: null,
    createdAt: iso(row.updatedAt ?? row.createdAt) as string,
  };
}

function statusFilter(status: string | null): Record<string, unknown> {
  const now = new Date();
  if (status === "active") return { $or: [{ "plan.expiresAt": null }, { "plan.expiresAt": { $gt: now } }] };
  if (status === "expired") return { "plan.expiresAt": { $lte: now } };
  return {};
}

const SUPPORTED_STATUSES = ["active", "expired"];

export async function listPlatformSubscriptions(url: URL) {
  const status = url.searchParams.get("status");
  if (status && !SUPPORTED_STATUSES.includes(status)) return { items: [], nextCursor: null };
  await connectToDatabase();
  const limit = pageSize(url.searchParams.get("limit"));
  const filter = {
    "plan.tier": "pro" as const,
    ...cursorFilter(url.searchParams.get("cursor")),
    ...statusFilter(url.searchParams.get("status")),
  };
  const rows = await User.find(filter).sort({ _id: -1 }).limit(limit + 1).select("email name plan updatedAt createdAt").lean<PassRow[]>();
  return {
    items: rows.slice(0, limit).flatMap((row) => subscriptionFor(row) ?? []),
    nextCursor: nextCursor(rows, limit),
  };
}
