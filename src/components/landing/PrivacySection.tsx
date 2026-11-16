import { privacyCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { Band } from "@/components/ui/Band";
import { BandText } from "@/components/landing/BandText";
import { BandTitle } from "@/components/landing/BandTitle";

export function PrivacySection() {
  return (
    <Band
      id="privacy"
      tone="pearl"
      containerClassName="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-4 sm:gap-x-8 lg:grid-cols-2 lg:gap-x-18 lg:gap-y-6"
    >
      <p
        className="text-[88px] leading-[0.78] font-extrabold tracking-[-0.08em] sm:text-[160px] lg:row-span-3 lg:text-[340px]"
        aria-hidden
      >
        {privacyCopy.stat}
      </p>
      <BandTitle className="text-[28px] leading-[1.02] tracking-[-0.04em] sm:text-[44px] lg:self-end lg:text-[60px] lg:leading-none lg:tracking-[-0.045em]">
        <span className="sr-only">{privacyCopy.stat} </span>
        {privacyCopy.title}
      </BandTitle>
      <BandText className="col-span-2 lg:col-span-1 lg:col-start-2">{privacyCopy.description}</BandText>
      <ul className="col-span-2 flex flex-wrap gap-2 lg:col-span-1 lg:col-start-2 lg:self-start">
        {privacyCopy.badges.map((badge, index) => (
          <li
            key={badge}
            className={cn(
              "rounded-[10px] px-3 py-1.75 text-[13px] font-semibold sm:px-3.5 sm:py-2.25 sm:text-sm",
              index === 0 ? "bg-foreground text-primary" : "bg-surface",
            )}
          >
            {badge}
          </li>
        ))}
      </ul>
    </Band>
  );
}
