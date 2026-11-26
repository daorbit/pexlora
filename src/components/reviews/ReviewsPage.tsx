import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { REVIEWS_PAGE_MAX } from "@/config/social-proof";
import { allToolsHref } from "@/config/tool-hub";
import { reviewsPageCopy } from "@/content/reviews";
import { getPublishedReviews, getRatingSummary } from "@/lib/stats/social-proof";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { textLinkClass } from "@/components/ui/text-link-styles";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { ReviewsStats } from "@/components/reviews/ReviewsStats";

export async function ReviewsPage() {
  const [reviews, rating] = await Promise.all([getPublishedReviews(REVIEWS_PAGE_MAX), getRatingSummary()]);

  return (
    <section className="py-12 sm:py-20">
      <Container className="flex max-w-6xl flex-col gap-10 sm:gap-14">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="font-mono text-[13px] text-secondary">{reviewsPageCopy.eyebrow}</p>
            <h1 className="text-[44px] leading-none font-extrabold tracking-[-0.05em] sm:text-[64px] lg:text-[84px] lg:leading-[0.98]">
              {reviewsPageCopy.title} <Highlight>{reviewsPageCopy.highlight}</Highlight>
            </h1>
          </div>
          {reviews.length > 0 && <ReviewsStats rating={rating} comments={reviews.length} />}
        </header>
        {reviews.length > 0 ? (
          <ReviewsList reviews={reviews} />
        ) : (
          <p className="max-w-xl border-t-2 border-foreground pt-6 text-[15px] text-secondary">{reviewsPageCopy.empty}</p>
        )}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {reviews.length > 0 && <p className="max-w-xl text-[15px] text-secondary">{reviewsPageCopy.note}</p>}
          <Link href={allToolsHref()} className={cn(textLinkClass, "text-[15px] sm:ml-auto")}>
            {reviewsPageCopy.rateLink}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
