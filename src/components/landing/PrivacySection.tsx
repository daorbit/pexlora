import { privacyCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { Band } from "@/components/ui/Band";
import { BandTitle } from "@/components/landing/BandTitle";

export function PrivacySection() {
  return (
    <Band
      id="privacy"
      tone="pearl"
      containerClassName="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-18"
    >
      <p
        className="text-[160px] leading-[0.78] font-extrabold tracking-[-0.08em] lg:text-[340px]"
        aria-hidden
      >
        {privacyCopy.stat}
      </p>
      <div className="flex flex-col gap-6">
        <BandTitle className="text-[40px] leading-none tracking-[-0.045em] lg:text-[60px]">
          <span className="sr-only">{privacyCopy.stat} </span>
          {privacyCopy.title}
        </BandTitle>
        <p className="text-[17px] leading-[1.55] text-secondary lg:text-[19px]">{privacyCopy.description}</p>
        <ul className="flex flex-wrap gap-2">
          {privacyCopy.badges.map((badge, index) => (
            <li
              key={badge}
              className={cn(
                "rounded-[10px] px-3.5 py-2.25 text-sm font-semibold",
                index === 0 ? "bg-foreground text-primary" : "bg-surface",
              )}
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}
