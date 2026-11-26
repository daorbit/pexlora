import type { ReviewStatus } from "@/config/reviews";
import { adminReviewCopy, reviewCopy } from "@/content/reviews";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format-date";
import type { ReviewItem } from "@/services/review.service";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewActions } from "@/components/admin/ReviewActions";

const tones: Record<ReviewStatus, "warning" | "success" | "neutral"> = {
  pending: "warning",
  published: "success",
  hidden: "neutral",
};

type AdminReviewRowProps = { review: ReviewItem; selected: boolean; onSelect: (selected: boolean) => void };

export function AdminReviewRow({ review, selected, onSelect }: AdminReviewRowProps) {
  const name = review.name || reviewCopy.anonymous;

  return (
    <li
      className={cn(
        "flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5",
        selected && "bg-accent-soft/50",
      )}
    >
      <div className="flex min-w-0 gap-3">
        <Checkbox
          label={adminReviewCopy.selectReview(name)}
          hideLabel
          checked={selected}
          onChange={onSelect}
          className="h-5 shrink-0"
        />
        <div className="flex min-w-0 flex-col gap-2">
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-secondary">
            <span className="sr-only">{reviewCopy.star(review.rating)}</span>
            <StarRating value={review.rating} />
            {review.comment && <Badge tone={tones[review.status]}>{adminReviewCopy.status[review.status]}</Badge>}
            <span className="font-mono text-xs">{review.tool}</span>
            <span>{formatDate(review.createdAt)}</span>
          </span>
          <p className={review.comment ? "text-[15px] wrap-break-word" : "text-sm text-tertiary"}>
            {review.comment || adminReviewCopy.noComment}
          </p>
          {review.comment && (
            <p className="text-[13px] text-secondary">
              {name}
              {!review.consent && ` · ${adminReviewCopy.noConsent}`}
            </p>
          )}
        </div>
      </div>
      <ReviewActions review={review} />
    </li>
  );
}
