import Image from "next/image";
import { Check } from "lucide-react";
import { differenceCopy, type DifferenceCard as DifferenceCardData } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { sliderBadgeClass } from "@/components/ui/before-after-styles";
import { DifferenceTag, photoChipClass } from "@/components/landing/DifferenceTag";

const photoSizes = "(min-width: 1024px) 20vw, (min-width: 640px) 42vw, 80vw";

function CardPhoto({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} fill sizes={photoSizes} className="object-cover" />;
}

export function DifferenceCard({ card }: { card: DifferenceCardData }) {
  return (
    <BeforeAfterSlider
      label={differenceCopy.sliderLabel(card.title)}
      dragFrom="handle"
      initialSplit={60}
      className="theme-dark aspect-[4/5] rounded-3xl bg-fill text-foreground"
      before={
        <>
          <CardPhoto src={card.src} alt="" />
          <ul className="absolute top-12 left-3 flex w-[calc(60%-1.25rem)] flex-col items-start gap-1.5">
            {card.tags.map((tag) => (
              <DifferenceTag key={tag.value} {...tag} />
            ))}
          </ul>
        </>
      }
      after={
        <>
          <CardPhoto src={card.src} alt={card.alt} />
          <span className={cn(photoChipClass, "absolute top-12 right-3")}>
            <Check className="size-3.5 text-success" strokeWidth={3} aria-hidden />
            {differenceCopy.clean}
          </span>
        </>
      }
    >
      <span className={cn(sliderBadgeClass, "left-3")}>{differenceCopy.before}</span>
      <span className={cn(sliderBadgeClass, "right-3")}>{differenceCopy.after}</span>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-black/45 px-4 py-3 backdrop-blur-md">
        <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-white">{card.title}</h3>
        <p className="truncate text-[13px] text-white/75 lg:text-[12px]">{card.subtitle}</p>
      </div>
    </BeforeAfterSlider>
  );
}
