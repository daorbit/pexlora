import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type StarRatingProps = {
  value: number;
  max?: number;
  className?: string;
};

export function StarRating({ value, max = 5, className }: StarRatingProps) {
  return (
    <span aria-hidden className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-3.5 sm:size-4",
            index < Math.round(value) ? "fill-rating text-rating" : "fill-fill-strong text-fill-strong",
          )}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
