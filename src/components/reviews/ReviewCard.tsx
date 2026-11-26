import { Quote } from "lucide-react";
import { reviewCopy } from "@/content/reviews";
import { cn } from "@/lib/utils/cn";
import type { ReviewItem } from "@/services/review.service";
import { StarRating } from "@/components/ui/StarRating";
import { UserAvatar } from "@/components/ui/UserAvatar";

type Variant = "default" | "featured" | "compact";

const cardClasses: Record<Variant, string> = {
  default: "gap-5 rounded-[22px] bg-surface p-5 shadow-card sm:p-7",
  featured: "theme-dark ink-panel gap-8 rounded-[22px] p-6 text-foreground sm:p-10",
  compact: "gap-4 rounded-2xl bg-surface p-4 shadow-card sm:p-5",
};

const quoteClasses: Record<Variant, string> = {
  default: "text-[15.5px] leading-[1.6] font-medium tracking-[-0.012em] sm:text-[17px]",
  featured: "text-[19px] leading-[1.42] font-medium tracking-[-0.022em] sm:text-2xl lg:text-[26px]",
  compact: "text-[15px] leading-relaxed",
};

type ReviewCardProps = { review: ReviewItem; compact?: boolean; featured?: boolean };

export function ReviewCard({ review, compact, featured }: ReviewCardProps) {
  const variant: Variant = featured ? "featured" : compact ? "compact" : "default";
  const name = review.name || reviewCopy.anonymous;
  const stars = (
    <>
      <span className="sr-only">{reviewCopy.star(review.rating)}</span>
      <StarRating value={review.rating} />
    </>
  );

  return (
    <figure className={cn("flex h-full flex-col justify-between text-left", cardClasses[variant])}>
      <div className="flex flex-col gap-4 sm:gap-6">
        {featured && <Quote aria-hidden className="size-9 fill-primary text-primary sm:size-11" strokeWidth={1} />}
        <blockquote translate="no" className={cn("notranslate break-words", quoteClasses[variant])}>
          {review.comment}
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <UserAvatar
          name={name}
          size="md"
          className={cn("border-0", featured ? "bg-primary text-primary-foreground sm:size-11" : "bg-accent-soft text-accent-text")}
        />
        {featured ? (
          <span className="flex min-w-0 flex-col gap-1">
            <span translate="no" className="notranslate truncate text-[15px] font-semibold">
              {name}
            </span>
            <span>{stars}</span>
          </span>
        ) : (
          <>
            <span translate="no" className="notranslate min-w-0 flex-1 truncate text-sm font-semibold">
              {name}
            </span>
            <span className="shrink-0">{stars}</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
