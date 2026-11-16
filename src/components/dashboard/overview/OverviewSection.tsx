import type { ReactNode } from "react";

type OverviewSectionProps = { title: string; description?: string; children: ReactNode };

export function OverviewSection({ title, description, children }: OverviewSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-[19px] font-semibold tracking-[-0.02em]">{title}</h2>
        {description && <p className="text-sm text-secondary">{description}</p>}
      </div>
      {children}
    </section>
  );
}
