"use server";

import { refresh, updateTag } from "next/cache";
import { SOCIAL_PROOF_TAG } from "@/config/social-proof";
import { adminCopy } from "@/content/admin";
import { adminReviewCopy } from "@/content/reviews";
import { getSuperAdmin } from "@/lib/auth/dal";
import type { AdminFormState } from "@/lib/validations/admin";
import { reviewIntentSchema, type ReviewIntent } from "@/lib/validations/reviews";
import { deleteHiddenReview, hideReview, publishReview } from "@/services/review.service";

const tasks: Record<ReviewIntent, (id: string) => Promise<boolean>> = {
  publish: publishReview,
  hide: hideReview,
  delete: deleteHiddenReview,
};

const failure = (message: string) => ({ status: "error" as const, message });

export async function moderateReview(id: string, _state: AdminFormState, formData: FormData): Promise<AdminFormState> {
  if (!(await getSuperAdmin())) return failure(adminCopy.errors.forbidden);

  const intent = reviewIntentSchema.safeParse(formData.get("intent"));
  if (!intent.success) return failure(adminCopy.errors.unavailable);

  try {
    if (!(await tasks[intent.data](id))) return failure(adminReviewCopy.notAllowed);
  } catch (error) {
    console.error("Review moderation failed", error);
    return failure(adminCopy.errors.unavailable);
  }

  updateTag(SOCIAL_PROOF_TAG);
  refresh();
  return { status: "success", message: adminReviewCopy.done[intent.data] };
}
