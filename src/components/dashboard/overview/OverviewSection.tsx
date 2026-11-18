import type { ReactNode } from "react";

type OverviewSectionProps = { title: string; description?: string; children: ReactNode };

export function OverviewSection({ title, description, children }: OverviewSectionProps) {
  return (
    <section className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-[17px] font-semibold tracking-[-0.02em] sm:text-[19px]">{title}</h2>
        {description && <p className="text-[13px] text-secondary sm:text-sm">{description}</p>}
      </div>
      {children}
    </section>
  );
}
