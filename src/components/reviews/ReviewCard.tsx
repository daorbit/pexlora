import { workspaceTools } from "@/config/tools";
import { reviewCopy } from "@/content/reviews";
import type { ReviewItem } from "@/services/review.service";
import { StarRating } from "@/components/ui/StarRating";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { ProofCard } from "@/components/social-proof/ProofCard";

const toolName = (slug: string) => workspaceTools.find((tool) => tool.slug === slug)?.shortName;

export function ReviewCard({ review, compact }: { review: ReviewItem; compact?: boolean }) {
  const name = review.name || reviewCopy.anonymous;

  return (
    <ProofCard compact={compact} className="justify-between">
      <div className="flex flex-col gap-3">
        <span className="sr-only">{reviewCopy.star(review.rating)}</span>
        <StarRating value={review.rating} />
        <blockquote translate="no" className="notranslate text-[15px] leading-relaxed break-words">
          {review.comment}
        </blockquote>
      </div>
      <div className="flex items-center gap-3">
        <UserAvatar name={name} size="md" />
        <span className="flex min-w-0 flex-col">
          <span translate="no" className="notranslate truncate text-sm font-semibold">
            {name}
          </span>
          <span className="text-[13px] text-secondary">{toolName(review.tool)}</span>
        </span>
      </div>
    </ProofCard>
  );
}
