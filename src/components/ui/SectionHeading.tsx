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
    <div className={cn("flex max-w-2xl flex-col gap-3.5", centered && "items-center text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-[30px] leading-[1.08] font-semibold tracking-[-0.028em] sm:text-[40px]">{title}</h2>
      {description && <p className="mt-1 max-w-md text-base leading-relaxed text-secondary sm:text-[17px]">{description}</p>}
      {children}
    </div>
  );
}
