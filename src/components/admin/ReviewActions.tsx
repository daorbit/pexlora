"use client";

import { useActionState } from "react";
import { moderateReview } from "@/actions/admin-reviews";
import type { ReviewIntent } from "@/lib/validations/reviews";
import type { ReviewItem } from "@/services/review.service";
import { FormStatus } from "@/components/dashboard/account/FormStatus";
import { ReviewIntentButtons } from "@/components/admin/ReviewIntentButtons";

function intentsFor({ status, comment, consent }: ReviewItem): ReviewIntent[] {
  if (status === "hidden") return comment && consent ? ["publish", "delete"] : ["delete"];
  if (status === "published" || !comment || !consent) return ["hide"];
  return ["publish", "hide"];
}

export function ReviewActions({ review }: { review: ReviewItem }) {
  const [state, formAction, pending] = useActionState(moderateReview.bind(null, review.id), undefined);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <FormStatus state={state} />
      <ReviewIntentButtons intents={intentsFor(review)} pending={pending} />
    </form>
  );
}
