import { useCasesCopy } from "@/content/social-proof";
import { getPublishedReviews } from "@/lib/stats/social-proof";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ProofCarousel } from "@/components/social-proof/ProofCarousel";

export async function ReviewsBlock() {
  const reviews = await getPublishedReviews();
  if (!reviews.length) return null;

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <h3 className="text-xl font-semibold tracking-[-0.028em] sm:text-2xl">{useCasesCopy.reviewsTitle}</h3>
      <ProofCarousel label={useCasesCopy.reviewsLabel}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ProofCarousel>
    </div>
  );
}
