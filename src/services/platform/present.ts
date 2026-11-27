import "server-only";
import { isValidObjectId, Types } from "mongoose";
import { isPlanId, type PlanId } from "@/config/plans";
import { planCopy } from "@/content/pricing";
import { activePlan } from "@/lib/auth/plan";

export const DEFAULT_PAGE = 25;
export const MAX_PAGE = 50;

type PlanField = { tier?: string | null; id?: string | null; expiresAt?: Date | string | null } | null | undefined;

export type PlanSummary = { key: string; name: string; status: "active" | "expired" | "lifetime"; expiresAt: string | null };

export function iso(value: Date | string | null | undefined) {
  return value ? new Date(value).toISOString() : null;
}

export function planName(id: string | null | undefined) {
  return id && isPlanId(id) ? planCopy[id as PlanId].name : "Pro";
}

export function planSummary(plan: PlanField): PlanSummary | null {
  if (plan?.tier !== "pro") return null;
  const active = activePlan({ plan });
  const key = plan.id ?? "pro";
  if (active && !active.expiresAt) return { key, name: planName(key), status: "lifetime", expiresAt: null };
  return { key, name: planName(key), status: active ? "active" : "expired", expiresAt: iso(plan.expiresAt) };
}

export function pageSize(value: string | null) {
  const size = Number(value);
  return Number.isInteger(size) && size > 0 ? Math.min(size, MAX_PAGE) : DEFAULT_PAGE;
}

export function cursorFilter(cursor: string | null): Record<string, unknown> {
  return cursor && isValidObjectId(cursor) ? { _id: { $lt: new Types.ObjectId(cursor) } } : {};
}

export function nextCursor<T extends { _id: unknown }>(rows: T[], limit: number) {
  return rows.length > limit ? String(rows[limit - 1]?._id ?? "") || null : null;
}

export function idRange(from: Date, to: Date) {
  return {
    $gte: Types.ObjectId.createFromTime(Math.floor(from.getTime() / 1000)),
    $lt: Types.ObjectId.createFromTime(Math.floor(to.getTime() / 1000)),
  };
}

const DAY_MS = 86_400_000;
const MAX_RANGE_DAYS = 400;

export function readRange(url: URL) {
  const now = Date.now();
  const toRaw = Date.parse(url.searchParams.get("to") ?? "");
  const to = new Date(Number.isNaN(toRaw) ? now : Math.min(toRaw, now));
  const fromRaw = Date.parse(url.searchParams.get("from") ?? "");
  const fallback = to.getTime() - 30 * DAY_MS;
  const from = new Date(Math.max(Math.min(Number.isNaN(fromRaw) ? fallback : fromRaw, to.getTime()), to.getTime() - MAX_RANGE_DAYS * DAY_MS));
  return { from, to };
}
