"use client";

import { useActionState } from "react";
import { moderateReview } from "@/actions/admin-reviews";
import { adminReviewCopy } from "@/content/reviews";
import type { ReviewIntent } from "@/lib/validations/reviews";
import type { ReviewItem } from "@/services/review.service";
import { Button } from "@/components/ui/Button";
import { FormStatus } from "@/components/dashboard/account/FormStatus";

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
      <div className="flex gap-2">
        {intentsFor(review).map((intent) => (
          <Button
            key={intent}
            type="submit"
            name="intent"
            value={intent}
            variant={intent === "publish" ? "primary" : "secondary"}
            size="sm"
            disabled={pending}
          >
            {adminReviewCopy[intent]}
          </Button>
        ))}
      </div>
    </form>
  );
}
