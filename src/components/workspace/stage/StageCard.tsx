import type { ReactNode } from "react";

type StageCardProps = {
  title: string;
  caption?: ReactNode;
  plain?: boolean;
  children: ReactNode;
};

export function StageCard({ title, caption, plain = false, children }: StageCardProps) {
  return (
    <section
      aria-label={title}
      className="flex flex-col gap-3 rounded-[20px] bg-surface p-3 shadow-card motion-safe:animate-fade-up sm:rounded-[22px] sm:p-4"
    >
      {!plain && <span className="px-1 text-[15px] font-semibold">{title}</span>}
      {plain ? (
        children
      ) : (
        <figure className="flex flex-col items-center gap-3 rounded-2xl bg-fill px-4 py-6 sm:py-8">
          {children}
          {caption && <figcaption className="text-center text-[13px] font-semibold text-secondary">{caption}</figcaption>}
        </figure>
      )}
    </section>
  );
}
