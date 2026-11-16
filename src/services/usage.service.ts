import "server-only";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Usage } from "@/models/Usage";

export const usageKeys = {
  user: (userId: string) => `user:${userId}`,
  ip: (ipHash: string) => `ip:${ipHash}`,
};

function today() {
  return new Date().toISOString().slice(0, 10);
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
