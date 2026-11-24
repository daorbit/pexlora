import "server-only";
import { connectToDatabase } from "@/lib/db/mongoose";
import { env } from "@/lib/env";
import { SiteStat } from "@/models/SiteStat";

const FILES_KEY = "files";

export async function countProcessedFile() {
  if (!env.isLiveSite) return;
  try {
    await connectToDatabase();
    await SiteStat.updateOne({ key: FILES_KEY }, { $inc: { total: 1 } }, { upsert: true });
  } catch (error) {
    console.warn("File counter unavailable", error);
  }
}

export async function getProcessedFilesTotal() {
  await connectToDatabase();
  const stat = await SiteStat.findOne({ key: FILES_KEY }).select("total").lean();
  return stat?.total ?? 0;
}
