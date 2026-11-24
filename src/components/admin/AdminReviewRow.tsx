import type { ReviewStatus } from "@/config/reviews";
import { adminReviewCopy, reviewCopy } from "@/content/reviews";
import { formatDate } from "@/lib/utils/format-date";
import type { ReviewItem } from "@/services/review.service";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewActions } from "@/components/admin/ReviewActions";

const tones: Record<ReviewStatus, "warning" | "success" | "neutral"> = {
  pending: "warning",
  published: "success",
  hidden: "neutral",
};

export function AdminReviewRow({ review }: { review: ReviewItem }) {
  return (
    <li className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5">
      <div className="flex min-w-0 flex-col gap-2">
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-secondary">
          <span className="sr-only">{reviewCopy.star(review.rating)}</span>
          <StarRating value={review.rating} />
          {review.comment && <Badge tone={tones[review.status]}>{adminReviewCopy.status[review.status]}</Badge>}
          <span className="font-mono text-xs">{review.tool}</span>
          <span>{formatDate(review.createdAt)}</span>
        </span>
        <p className={review.comment ? "text-[15px] break-words" : "text-sm text-tertiary"}>
          {review.comment || adminReviewCopy.noComment}
        </p>
        {review.comment && (
          <p className="text-[13px] text-secondary">
            {review.name || reviewCopy.anonymous}
            {!review.consent && ` · ${adminReviewCopy.noConsent}`}
          </p>
        )}
      </div>
      <ReviewActions review={review} />
    </li>
  );
}
