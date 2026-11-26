import { reviewsPageCopy } from "@/content/reviews";
import { formatCount } from "@/lib/utils/format-count";
import type { RatingTotals } from "@/services/review.service";

type ReviewsStatsProps = { rating: RatingTotals | null; comments: number };

export function ReviewsStats({ rating, comments }: ReviewsStatsProps) {
  const { stats, outOf } = reviewsPageCopy;
  const items = rating
    ? [
        { label: stats.average, value: rating.average.toFixed(1), suffix: outOf },
        { label: stats.ratings, value: formatCount(rating.count) },
      ]
    : [{ label: stats.comments, value: formatCount(comments) }];

  return (
    <dl className="grid grid-cols-2 gap-6 lg:min-w-80 lg:pb-2">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1.5">
          <dt className="text-[13px] text-secondary">{item.label}</dt>
          <dd className="text-[32px] leading-none font-bold tracking-[-0.04em] sm:text-[40px]">
            {item.value}
            {item.suffix && <span className="text-base font-medium tracking-normal text-secondary">{item.suffix}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
