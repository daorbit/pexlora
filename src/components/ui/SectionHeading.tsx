import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, centered, className, children }: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-2 sm:gap-3.5", centered && "items-center text-center", className)}>
      {eyebrow && <Eyebrow className="text-[11px] sm:text-xs">{eyebrow}</Eyebrow>}
      <h2 className="text-[24px] leading-[1.12] font-semibold tracking-[-0.028em] text-balance sm:text-[40px] sm:leading-[1.08]">{title}</h2>
      {description && <p className="max-w-md text-[14px] leading-relaxed text-secondary sm:mt-1 sm:text-[17px]">{description}</p>}
      {children}
    </div>
  );
}
