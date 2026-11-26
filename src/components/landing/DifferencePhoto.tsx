import Image from "next/image";
import { differenceCopy, type DifferenceCard } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { sliderBadgeClass } from "@/components/ui/before-after-styles";

const photoSizes = "(min-width: 1024px) 40vw, 100vw";

export function DifferencePhoto({ card, className }: { card: DifferenceCard; className?: string }) {
  return (
    <BeforeAfterSlider
      label={differenceCopy.sliderLabel(card.title)}
      className={cn("aspect-square w-full rounded-[22px] bg-fill sm:aspect-[4/3] lg:aspect-auto lg:h-[29rem]", className)}
      before={
        <>
          <Image src={card.src} alt="" fill sizes={photoSizes} className="object-cover" />
          <span aria-hidden className="absolute inset-0 bg-black/25" />
        </>
      }
      after={<Image src={card.src} alt={card.alt} fill sizes={photoSizes} className="object-cover" />}
    >
      <span className={cn(sliderBadgeClass, "left-3")}>{differenceCopy.before}</span>
      <span className={cn(sliderBadgeClass, "right-3 bg-primary text-primary-foreground backdrop-blur-none")}>
        {differenceCopy.after}
      </span>
    </BeforeAfterSlider>
  );
}
