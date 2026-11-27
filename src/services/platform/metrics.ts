import "server-only";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Purchase } from "@/models/Purchase";
import { User } from "@/models/User";
import { idRange } from "@/services/platform/present";
import { getUsageTotalsToday } from "@/services/usage.service";

const CACHE_MS = 5 * 60 * 1000;

type Summary = Awaited<ReturnType<typeof compute>>;

const cache = new Map<string, { at: number; value: Promise<Summary> }>();

async function compute(from: Date, to: Date) {
  await connectToDatabase();
  const now = new Date();
  const live = { "plan.tier": "pro", $or: [{ "plan.expiresAt": null }, { "plan.expiresAt": { $gt: now } }] };
  const [total, created, active, paying, revenue, usage] = await Promise.all([
    User.estimatedDocumentCount(),
    User.countDocuments({ _id: idRange(from, to) }),
    User.countDocuments({ lastActiveAt: { $gte: from, $lt: to } }),
    User.countDocuments(live),
    Purchase.aggregate<{ _id: string; amount: number }>([
      { $match: { _id: idRange(from, to), status: "paid" } },
      { $group: { _id: "$currency", amount: { $sum: "$amount" } } },
    ]),
    getUsageTotalsToday(),
  ]);
  return {
    from: from.toISOString(),
    to: to.toISOString(),
    users: { total, new: created, active },
    paying,
    revenue: revenue.map((row) => ({ currency: row._id, amountMinor: row.amount })),
    extra: [
      { key: "filesToday", label: "Files processed today", value: usage.files },
      { key: "aiToday", label: "AI requests today", value: usage.ai },
    ],
  };
}

export function platformMetrics(from: Date, to: Date) {
  const key = `${Math.floor(from.getTime() / 60_000)}:${Math.floor(to.getTime() / 60_000)}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.value;
  if (cache.size > 50) cache.clear();
  const value = compute(from, to);
  cache.set(key, { at: Date.now(), value });
  value.catch(() => cache.delete(key));
  return value;
}

export async function databaseHealth() {
  const started = Date.now();
  try {
    await connectToDatabase();
    await mongoose.connection.db?.admin().ping();
    return { name: "database", ok: true, latencyMs: Date.now() - started };
  } catch (error) {
    return { name: "database", ok: false, latencyMs: Date.now() - started, detail: (error as Error).message };
  }
}
