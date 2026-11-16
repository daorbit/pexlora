import "server-only";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Usage } from "@/models/Usage";

export const usageKeys = {
  user: (userId: string) => `user:${userId}`,
  ip: (ipHash: string) => `ip:${ipHash}`,
};

const AI_PREFIX = "ai:";

export const aiUsageKey = (key: string) => `${AI_PREFIX}${key}`;

function today() {
  return new Date().toISOString().slice(0, 10);
}

export async function getUsageTodayByKey(keys: string[]) {
  await connectToDatabase();
  const rows = await Usage.find({ day: today(), key: { $in: keys } }).select("key count").lean();
  return new Map(rows.map((row) => [row.key, row.count]));
}

export async function getUsageTotalsToday() {
  await connectToDatabase();
  const [totals] = await Usage.aggregate<{ files: number; ai: number }>([
    { $match: { day: today() } },
    {
      $group: {
        _id: null,
        files: { $sum: { $cond: [{ $eq: [{ $indexOfCP: ["$key", AI_PREFIX] }, 0] }, 0, "$count"] } },
        ai: { $sum: { $cond: [{ $eq: [{ $indexOfCP: ["$key", AI_PREFIX] }, 0] }, "$count", 0] } },
      },
    },
  ]);
  return { files: totals?.files ?? 0, ai: totals?.ai ?? 0 };
}

export async function clearUsageToday(keys: string[]) {
  await connectToDatabase();
  await Usage.deleteMany({ day: today(), key: { $in: keys } });
}

export async function clearAllUsage(keys: string[]) {
  await connectToDatabase();
  await Usage.deleteMany({ key: { $in: keys } });
}

export async function incrementUsage(key: string, amount = 1) {
  await connectToDatabase();
  const usage = await Usage.findOneAndUpdate(
    { key, day: today() },
    { $inc: { count: amount } },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
  ).lean();
  return usage?.count ?? amount;
}

export async function getUsageToday(key: string) {
  await connectToDatabase();
  const usage = await Usage.findOne({ key, day: today() }).lean();
  return usage?.count ?? 0;
}
