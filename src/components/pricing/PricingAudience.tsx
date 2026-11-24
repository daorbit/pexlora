import { pricingProof } from "@/content/social-proof";
import { getPublishedReviews } from "@/lib/stats/social-proof";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ProofCarousel } from "@/components/social-proof/ProofCarousel";
import { UseCaseCard } from "@/components/social-proof/UseCaseCard";

const REVIEWS_ON_PRICING = 3;

export async function PricingAudience() {
  const reviews = (await getPublishedReviews()).slice(0, REVIEWS_ON_PRICING);
  const title = reviews.length ? pricingProof.reviewsTitle : pricingProof.title;

  return (
    <section aria-labelledby="pro-audience" className="flex flex-col gap-4 pt-4 sm:gap-5 sm:pt-8">
      <h2 id="pro-audience" className="text-center text-[17px] font-semibold tracking-[-0.02em] sm:text-left sm:text-xl">
        {title}
      </h2>
      <ProofCarousel label={title}>
        {reviews.length
          ? reviews.map((review) => <ReviewCard key={review.id} review={review} compact />)
          : pricingProof.useCases.map((useCase) => <UseCaseCard key={useCase.id} useCase={useCase} compact />)}
      </ProofCarousel>
    </section>
  );
}
