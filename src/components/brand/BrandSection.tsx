import type { ReactNode } from "react";

type BrandSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function BrandSection({ id, title, children }: BrandSectionProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="flex flex-col gap-4 sm:gap-5">
      <h2 id={`${id}-title`} className="text-[22px] font-semibold tracking-[-0.02em] sm:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
