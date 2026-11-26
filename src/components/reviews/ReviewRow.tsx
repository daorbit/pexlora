import { reviewCopy } from "@/content/reviews";
import { cn } from "@/lib/utils/cn";
import type { ReviewItem } from "@/services/review.service";
import { numeral, outlineNumeralClass } from "@/components/ui/outline-numeral-styles";
import { StarRating } from "@/components/ui/StarRating";

type ReviewRowProps = { review: ReviewItem; index: number; hidden?: boolean };

export function ReviewRow({ review, index, hidden }: ReviewRowProps) {
  return (
    <li
      hidden={hidden}
      className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 gap-y-4 border-b border-border-strong py-7 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-9 lg:grid-cols-[6rem_minmax(0,1fr)_12rem] lg:gap-x-10"
    >
      <span
        aria-hidden
        className={cn(
          "row-span-2 text-[36px] leading-[0.9] font-extrabold tracking-[-0.06em] sm:text-[52px] lg:row-span-1 lg:text-[64px]",
          outlineNumeralClass,
        )}
      >
        {numeral(index)}
      </span>
      <blockquote
        translate="no"
        className="notranslate text-lg leading-[1.45] font-medium tracking-[-0.018em] break-words sm:text-[22px] lg:text-[26px] lg:leading-[1.38] lg:tracking-[-0.024em]"
      >
        {review.comment}
      </blockquote>
      <div className="col-start-2 flex flex-col gap-1.5 lg:col-start-3 lg:row-start-1 lg:pt-1.5">
        <span translate="no" className="notranslate text-[15px] font-semibold">
          {review.name || reviewCopy.anonymous}
        </span>
        <span>
          <span className="sr-only">{reviewCopy.star(review.rating)}</span>
          <StarRating value={review.rating} />
        </span>
      </div>
    </li>
  );
}
