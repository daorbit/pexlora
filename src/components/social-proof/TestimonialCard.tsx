import type { Testimonial } from "@/content/social-proof";
import { cn } from "@/lib/utils/cn";
import { PersonAvatar } from "@/components/ui/PersonAvatar";
import { StarRating } from "@/components/ui/StarRating";

type TestimonialCardProps = {
  testimonial: Testimonial;
  compact?: boolean;
  className?: string;
};

export function TestimonialCard({ testimonial, compact, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between bg-surface text-left",
        compact
          ? "gap-4 rounded-2xl p-4 shadow-card sm:p-5"
          : "gap-5 rounded-3xl border border-separator p-5 sm:gap-6 sm:p-6",
        className,
      )}
    >
      <div className={cn("flex flex-col", compact ? "gap-2.5" : "gap-3")}>
        <StarRating value={5} />
        <blockquote
          className={cn(
            "leading-relaxed text-foreground",
            compact ? "text-[14px] sm:text-[14.5px]" : "text-[15px] sm:text-base",
          )}
        >
          {testimonial.quote}
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <PersonAvatar src={testimonial.avatar} size={compact ? "sm" : "md"} />
        <span className="flex min-w-0 flex-col">
          <span translate="no" className="notranslate text-sm font-semibold text-foreground">
            {testimonial.name}
          </span>
          <span className="text-[12.5px] text-secondary sm:text-[13px]">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
