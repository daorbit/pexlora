import "server-only";
import { AI_DAILY_NEURON_BUDGET } from "@/config/limits";
import { connectToDatabase } from "@/lib/db/mongoose";
import { RateLimit } from "@/models/RateLimit";

const DAY_MS = 24 * 60 * 60 * 1000;

function today() {
  const day = Math.floor(Date.now() / DAY_MS);
  return { key: `ai-neurons:${day}`, expiresAt: new Date((day + 1) * DAY_MS) };
}

export async function hasAiBudget() {
  try {
    await connectToDatabase();
    const entry = await RateLimit.findOne({ key: today().key }).lean();
    return (entry?.count ?? 0) < AI_DAILY_NEURON_BUDGET;
  } catch (error) {
    console.warn("AI budget unavailable, allowing request", error);
    return true;
  }
}

async function addNeurons(update: Record<string, unknown>) {
  const { key, expiresAt } = today();
  try {
    await connectToDatabase();
    await RateLimit.updateOne({ key }, { ...update, $setOnInsert: { expiresAt } }, { upsert: true });
  } catch (error) {
    console.warn("AI budget not recorded", error);
  }
}

export function recordAiNeurons(neurons: number) {
  return addNeurons({ $inc: { count: neurons } });
}

export function markAiBudgetSpent() {
  return addNeurons({ $max: { count: AI_DAILY_NEURON_BUDGET } });
}
