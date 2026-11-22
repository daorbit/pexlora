import { ratingProof } from "@/content/social-proof";
import { cn } from "@/lib/utils/cn";
import { StarRating } from "@/components/ui/StarRating";

type RatingSummaryProps = {
  reviews?: "always" | "sm" | "never";
  className?: string;
};

export function RatingSummary({ reviews = "always", className }: RatingSummaryProps) {
  return (
    <p className={cn("flex items-center gap-2 sm:gap-2.5", className)}>
      <StarRating value={ratingProof.value} />
      <span className="sr-only">{ratingProof.summary}</span>
      <span aria-hidden className="flex items-center gap-1.5">
        <span className="font-semibold text-foreground">{ratingProof.value}</span>
        {reviews !== "never" && (
          <span className={cn(reviews === "sm" && "hidden sm:inline")}>· {ratingProof.reviews}</span>
        )}
      </span>
    </p>
  );
}
