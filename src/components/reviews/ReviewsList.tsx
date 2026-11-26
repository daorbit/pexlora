"use client";

import { useState } from "react";
import { REVIEWS_PAGE_STEP } from "@/config/social-proof";
import { reviewsPageCopy } from "@/content/reviews";
import type { ReviewItem } from "@/services/review.service";
import { Button } from "@/components/ui/Button";
import { ReviewRow } from "@/components/reviews/ReviewRow";

export function ReviewsList({ reviews }: { reviews: ReviewItem[] }) {
  const [visible, setVisible] = useState(REVIEWS_PAGE_STEP);
  const remaining = reviews.length - visible;

  return (
    <div className="flex flex-col items-center gap-8">
      <ol aria-label={reviewsPageCopy.listLabel} className="w-full border-t-2 border-foreground">
        {reviews.map((review, index) => (
          <ReviewRow key={review.id} review={review} index={index} hidden={index >= visible} />
        ))}
      </ol>
      {remaining > 0 && (
        <Button variant="secondary" onClick={() => setVisible((count) => count + REVIEWS_PAGE_STEP)}>
          {reviewsPageCopy.showMore(Math.min(remaining, REVIEWS_PAGE_STEP))}
        </Button>
      )}
    </div>
  );
}
