import { formatExtensions, formatsCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { Band } from "@/components/ui/Band";
import { Marquee } from "@/components/ui/Marquee";
import { BandText } from "@/components/landing/BandText";
import { BandTitle } from "@/components/landing/BandTitle";

export function FormatsSection() {
  return (
    <Band
      id="formats"
      tone="ink"
      className="lg:py-30"
      containerClassName="grid grid-cols-1 items-end gap-3 sm:gap-6 lg:grid-cols-2 lg:gap-12"
      after={
        <Marquee className="mt-8 sm:mt-14" trackClassName="gap-6 pr-6 sm:gap-10 sm:pr-10 lg:gap-14 lg:pr-14">
          {formatExtensions.map((extension, index) => (
            <span
              key={extension}
              className={cn(
                "text-[40px] font-extrabold tracking-[-0.05em] whitespace-nowrap sm:text-[72px] lg:text-[120px] lg:tracking-[-0.06em]",
                index % 2 === 1 && "text-outline",
              )}
            >
              {extension}
            </span>
          ))}
        </Marquee>
      }
    >
      <BandTitle>{formatsCopy.title}</BandTitle>
      <BandText>{formatsCopy.description}</BandText>
    </Band>
  );
}
