"use server";

import { refresh, updateTag } from "next/cache";
import { SOCIAL_PROOF_TAG } from "@/config/social-proof";
import { adminCopy } from "@/content/admin";
import { adminReviewCopy } from "@/content/reviews";
import { getSuperAdmin } from "@/lib/auth/dal";
import type { AdminFormState } from "@/lib/validations/admin";
import { reviewIdsSchema, reviewIntentSchema } from "@/lib/validations/reviews";
import { moderateReviews } from "@/services/review.service";

const failure = (message: string) => ({ status: "error" as const, message });

async function moderate(rawIds: unknown[], formData: FormData): Promise<AdminFormState> {
  if (!(await getSuperAdmin())) return failure(adminCopy.errors.forbidden);

  const intent = reviewIntentSchema.safeParse(formData.get("intent"));
  const ids = reviewIdsSchema.safeParse(rawIds.map(String));
  if (!intent.success || !ids.success) return failure(adminCopy.errors.unavailable);

  let changed: number;
  try {
    changed = await moderateReviews(ids.data, intent.data);
  } catch (error) {
    console.error("Review moderation failed", error);
    return failure(adminCopy.errors.unavailable);
  }
  if (!changed) return failure(adminReviewCopy.notAllowed);

  updateTag(SOCIAL_PROOF_TAG);
  refresh();
  const skipped = ids.data.length - changed;
  const message = ids.data.length === 1 ? adminReviewCopy.done[intent.data] : adminReviewCopy.bulkDone(intent.data, changed, skipped);
  return { status: "success", message };
}

export async function moderateReview(id: string, _state: AdminFormState, formData: FormData) {
  return moderate([id], formData);
}

export async function moderateSelectedReviews(_state: AdminFormState, formData: FormData) {
  return moderate(formData.getAll("id"), formData);
}
