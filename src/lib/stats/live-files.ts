import "server-only";
import { cacheLife } from "next/cache";
import { LIVE_STATS_MIN_FILES } from "@/config/social-proof";
import { getUsageTotalsToday } from "@/services/usage.service";

export async function getLiveFilesToday() {
  "use cache";
  cacheLife("minutes");
  try {
    const { files } = await getUsageTotalsToday();
    return files >= LIVE_STATS_MIN_FILES ? files : null;
  } catch {
    return null;
  }
}
