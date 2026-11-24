import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { FILES_TOTAL_MIN, RATINGS_MIN, REVIEWS_MIN, REVIEWS_SHOWN, SOCIAL_PROOF_TAG } from "@/config/social-proof";
import { getRatingTotals, listPublishedReviews, type RatingTotals, type ReviewItem } from "@/services/review.service";
import { getProcessedFilesTotal } from "@/services/site-stats.service";

export async function getRatingSummary(): Promise<RatingTotals | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(SOCIAL_PROOF_TAG);
  try {
    const totals = await getRatingTotals();
    return totals.count >= RATINGS_MIN ? { ...totals, average: Math.round(totals.average * 10) / 10 } : null;
  } catch {
    return null;
  }
}

export async function getFilesTotal(): Promise<number | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(SOCIAL_PROOF_TAG);
  try {
    const total = await getProcessedFilesTotal();
    return total >= FILES_TOTAL_MIN ? total : null;
  } catch {
    return null;
  }
}

export async function getPublishedReviews(): Promise<ReviewItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(SOCIAL_PROOF_TAG);
  try {
    const reviews = await listPublishedReviews(REVIEWS_SHOWN);
    return reviews.length >= REVIEWS_MIN ? reviews : [];
  } catch {
    return [];
  }
}
