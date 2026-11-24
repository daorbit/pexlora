import { useCases, useCasesCopy } from "@/content/social-proof";
import { getRatingSummary } from "@/lib/stats/social-proof";
import { Band } from "@/components/ui/Band";
import { Highlight } from "@/components/ui/Highlight";
import { AudienceStrip } from "@/components/landing/AudienceStrip";
import { BandTitle } from "@/components/landing/BandTitle";
import { ReviewsBlock } from "@/components/reviews/ReviewsBlock";
import { ProofCarousel } from "@/components/social-proof/ProofCarousel";
import { RatingSummary } from "@/components/social-proof/RatingSummary";
import { UseCaseCard } from "@/components/social-proof/UseCaseCard";

export async function UseCasesSection() {
  const rating = await getRatingSummary();

  return (
    <Band id="made-for" tone="pearl" containerClassName="flex flex-col gap-6 sm:gap-10 lg:gap-14">
      <div className="grid grid-cols-1 items-end gap-3 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <BandTitle size="md">
          {useCasesCopy.title} <Highlight>{useCasesCopy.titleMarker}</Highlight>
        </BandTitle>
        {rating && <RatingSummary rating={rating} className="text-[13px] text-secondary sm:text-sm" />}
      </div>
      <ProofCarousel label={useCasesCopy.carouselLabel}>
        {useCases.map((useCase) => (
          <UseCaseCard key={useCase.id} useCase={useCase} />
        ))}
      </ProofCarousel>
      <ReviewsBlock />
      <AudienceStrip />
    </Band>
  );
}
