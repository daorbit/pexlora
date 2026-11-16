import { formatExtensions, formatsCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { Band } from "@/components/ui/Band";
import { Marquee } from "@/components/ui/Marquee";
import { BandTitle } from "@/components/landing/BandTitle";

export function FormatsSection() {
  return (
    <Band
      id="formats"
      tone="ink"
      className="lg:py-30"
      containerClassName="grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-12"
      after={
        <Marquee className="mt-14" trackClassName="gap-10 pr-10 lg:gap-14 lg:pr-14">
          {formatExtensions.map((extension, index) => (
            <span
              key={extension}
              className={cn(
                "text-[64px] font-extrabold tracking-[-0.06em] whitespace-nowrap lg:text-[120px]",
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
      <p className="text-[17px] leading-[1.55] text-secondary lg:text-[19px]">{formatsCopy.description}</p>
    </Band>
  );
}
