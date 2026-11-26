import { routes } from "@/config/site";
import { reviewsPageCopy } from "@/content/reviews";
import { useCasesCopy } from "@/content/social-proof";
import { getPublishedReviews } from "@/lib/stats/social-proof";
import { cn } from "@/lib/utils/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { ReviewCard } from "@/components/reviews/ReviewCard";

const spanClass = (index: number) => {
  if (index === 0) return "lg:col-span-7 lg:row-span-2";
  if (index < 3) return "lg:col-span-5";
  return "lg:col-span-4";
};

export async function ReviewsBlock() {
  const reviews = await getPublishedReviews();
  if (!reviews.length) return null;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h3 className="text-[26px] leading-[1.05] font-bold tracking-[-0.035em] sm:text-[34px] lg:text-[48px] lg:tracking-[-0.04em]">
          {useCasesCopy.reviewsTitle} <Highlight>{useCasesCopy.reviewsMarker}</Highlight>
        </h3>
        <p className="text-[13px] text-secondary sm:text-[15px] lg:pb-1.5">{useCasesCopy.reviewsNote}</p>
      </div>
      <MobileCarousel
        label={useCasesCopy.reviewsLabel}
        until="lg"
        trackClassName="gap-3 lg:grid lg:grid-cols-12 lg:gap-5"
      >
        {reviews.map((review, index) => (
          <li key={review.id} className={cn("min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[55%] lg:basis-auto", spanClass(index))}>
            <ReviewCard review={review} featured={index === 0} />
          </li>
        ))}
      </MobileCarousel>
      <ButtonLink href={routes.reviews} variant="plain" arrow className="self-start">
        {reviewsPageCopy.seeAll}
      </ButtonLink>
    </div>
  );
}
