import { pricingProof } from "@/content/social-proof";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { RatingSummary } from "@/components/social-proof/RatingSummary";
import { TestimonialCard } from "@/components/social-proof/TestimonialCard";

export function PricingTestimonials() {
  return (
    <section aria-labelledby="pro-reviews" className="flex flex-col gap-4 pt-4 sm:gap-5 sm:pt-8">
      <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-between sm:text-left">
        <h2 id="pro-reviews" className="text-[17px] font-semibold tracking-[-0.02em] sm:text-xl">
          {pricingProof.title}
        </h2>
        <RatingSummary className="text-[13px] text-secondary sm:text-sm" />
      </div>
      <MobileCarousel
        label={pricingProof.carouselLabel}
        until="md"
        trackClassName="gap-2.5 md:grid md:grid-cols-3 md:gap-3"
      >
        {pricingProof.testimonials.map((testimonial) => (
          <li key={testimonial.name} className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[60%] md:basis-auto">
            <TestimonialCard testimonial={testimonial} compact />
          </li>
        ))}
      </MobileCarousel>
    </section>
  );
}
