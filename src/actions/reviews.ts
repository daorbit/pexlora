"use server";

import { reviewCopy } from "@/content/reviews";
import { getSuperAdmin } from "@/lib/auth/dal";
import { actionRateLimit } from "@/lib/security/action-limit";
import { ratingSchema, reviewCommentSchema, type RatingInput, type ReviewCommentInput } from "@/lib/validations/reviews";
import { saveRating, saveReviewComment } from "@/services/review.service";

export type ReviewResult = { ok: true; saved: boolean } | { ok: false; message: string };

const failed: ReviewResult = { ok: false, message: reviewCopy.failed };

async function submit(save: () => Promise<boolean>): Promise<ReviewResult> {
  const limited = await actionRateLimit("review");
  if (limited) return { ok: false, message: limited };

  try {
    if (await getSuperAdmin()) return { ok: true, saved: false };
    return (await save()) ? { ok: true, saved: true } : failed;
  } catch (error) {
    console.error("Review failed", error instanceof Error ? error.message : error);
    return failed;
  }
}

export async function submitRating(input: RatingInput): Promise<ReviewResult> {
  const parsed = ratingSchema.safeParse(input);
  if (!parsed.success) return failed;
  return submit(async () => {
    await saveRating(parsed.data);
    return true;
  });
}

export async function submitReviewComment(input: ReviewCommentInput): Promise<ReviewResult> {
  const parsed = reviewCommentSchema.safeParse(input);
  if (!parsed.success) return failed;
  return submit(() => saveReviewComment(parsed.data));
}
