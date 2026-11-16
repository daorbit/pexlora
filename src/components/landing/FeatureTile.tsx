import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { buttonClasses } from "@/components/ui/Button";

type Tone = "lime" | "ink" | "orange";

const tones: Record<Tone, string> = {
  lime: "tone-lime",
  ink: "tone-ink",
  orange: "tone-orange",
};

type FeatureTileProps = {
  tone: Tone;
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  visual: ReactNode;
  className?: string;
};

export function FeatureTile({ tone, icon: Icon, label, title, body, primary, secondary, visual, className }: FeatureTileProps) {
  return (
    <article
      className={cn(
        "tile-tint flex h-full min-h-[30rem] flex-col items-center overflow-hidden rounded-3xl px-5 pt-10 text-center sm:min-h-[38rem] sm:pt-14",
        tones[tone],
        className,
      )}
    >
      <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-secondary">
        <Icon className="size-[18px] text-(--tone)" aria-hidden />
        {label}
      </p>
      <h3 className="mt-3 max-w-xl text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[40px]">{title}</h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-secondary sm:text-[17px]">{body}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <a href={primary.href} className={buttonClasses({ size: "md" })}>
          {primary.label}
        </a>
        <a href={secondary.href} className={buttonClasses({ variant: "secondary", size: "md" })}>
          {secondary.label}
        </a>
      </div>
      <div className="flex w-full flex-1 items-center justify-center py-10 sm:py-12">{visual}</div>
    </article>
  );
}
