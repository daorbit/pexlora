import { HERO_AVATAR_COUNT, PROOF_AVATARS } from "@/config/social-proof";
import { testimonials, testimonialsCopy } from "@/content/social-proof";
import { Band } from "@/components/ui/Band";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { Highlight } from "@/components/ui/Highlight";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { AudienceStrip } from "@/components/landing/AudienceStrip";
import { BandTitle } from "@/components/landing/BandTitle";
import { RatingSummary } from "@/components/social-proof/RatingSummary";
import { TestimonialCard } from "@/components/social-proof/TestimonialCard";

export function TestimonialsSection() {
  return (
    <Band id="reviews" tone="pearl" containerClassName="flex flex-col gap-6 sm:gap-10 lg:gap-14">
      <div className="grid grid-cols-1 items-end gap-3 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <BandTitle size="md">
          {testimonialsCopy.title} <Highlight>{testimonialsCopy.titleMarker}</Highlight>
        </BandTitle>
        <div className="flex items-center gap-3 text-[13px] text-secondary sm:text-sm">
          <AvatarStack srcs={PROOF_AVATARS.slice(0, HERO_AVATAR_COUNT)} />
          <RatingSummary />
        </div>
      </div>
      <MobileCarousel
        label={testimonialsCopy.carouselLabel}
        until="md"
        trackClassName="gap-3 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <li key={testimonial.name} className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[55%] md:basis-auto">
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </MobileCarousel>
      <AudienceStrip />
    </Band>
  );
}
