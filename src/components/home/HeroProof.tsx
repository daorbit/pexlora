import { Zap } from "lucide-react";
import { heroProof } from "@/content/landing";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { StarRating } from "@/components/ui/StarRating";

export function HeroProof() {
  return (
    <div
      role="group"
      aria-label={heroProof.label}
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] text-secondary sm:gap-x-4 sm:text-[14.5px]"
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <AvatarStack srcs={heroProof.avatars} />
        <StarRating value={heroProof.rating} />
        <p className="flex items-center gap-1.5">
          <span className="sr-only">{heroProof.ratingSummary}</span>
          <span aria-hidden className="font-semibold text-foreground">
            {heroProof.rating}
          </span>
          <span aria-hidden className="hidden sm:inline">
            · {heroProof.reviews}
          </span>
        </p>
      </div>
      <span aria-hidden className="h-5 w-px bg-separator" />
      <p className="flex items-center gap-1.5">
        <Zap className="size-4 fill-current text-accent-text" strokeWidth={2} aria-hidden />
        <span className="font-semibold text-foreground">{heroProof.filesCount}</span>
        {heroProof.filesLabel}
      </p>
    </div>
  );
}
