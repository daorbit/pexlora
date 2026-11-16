import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { buttonClasses } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

type FeatureRowProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  visual: ReactNode;
  reverse?: boolean;
};

export function FeatureRow({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  visual,
  reverse,
}: FeatureRowProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div className={cn("flex flex-col items-start gap-4", reverse && "lg:order-2")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[36px]">
          {title}
        </h3>
        <p className="max-w-md text-[17px] leading-relaxed text-secondary">{description}</p>
        <a href={href} className={buttonClasses({ variant: "secondary", className: "mt-2" })}>
          {linkLabel}
        </a>
      </div>
      <div className={cn("min-w-0", reverse && "lg:order-1")}>{visual}</div>
    </div>
  );
}
