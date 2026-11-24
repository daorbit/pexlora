import { proofCopy } from "@/content/social-proof";
import { cn } from "@/lib/utils/cn";
import type { RatingTotals } from "@/services/review.service";
import { StarRating } from "@/components/ui/StarRating";

type RatingSummaryProps = {
  rating: RatingTotals;
  className?: string;
};

export function RatingSummary({ rating, className }: RatingSummaryProps) {
  return (
    <p className={cn("flex items-center gap-2 text-left sm:gap-2.5", className)}>
      <span aria-hidden className="text-2xl font-bold tracking-[-0.03em] text-foreground">
        {rating.average.toFixed(1)}
      </span>
      <span className="sr-only">{proofCopy.rating.summary(rating.average, rating.count)}</span>
      <span aria-hidden className="flex flex-col gap-0.5 leading-tight">
        <StarRating value={rating.average} />
        <span className="text-[11.5px] text-secondary sm:text-[12.5px]">{proofCopy.rating.count(rating.count)}</span>
      </span>
    </p>
  );
}
