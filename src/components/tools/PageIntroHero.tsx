import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageIntroHeroProps = {
  headline: string;
  description: string;
  wide?: boolean;
  meta?: ReactNode;
  children: ReactNode;
};

export function PageIntroHero({ headline, description, wide, meta, children }: PageIntroHeroProps) {
  return (
    <section className="pt-4 pb-8 sm:py-14">
      <Container size={wide ? "wide" : "narrow"} className="flex flex-col items-center gap-5 sm:gap-10">
        <div className="flex flex-col items-center gap-2 text-center sm:gap-4">
          <h1 className="max-w-3xl text-[24px] leading-[1.1] font-bold tracking-[-0.03em] text-balance motion-safe:animate-fade-up sm:text-[44px] sm:leading-[1.06] sm:tracking-[-0.035em]">
            {headline}
          </h1>
          <p className="max-w-xl text-[13.5px] leading-snug text-secondary motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-[15.5px] sm:leading-relaxed">
            {description}
          </p>
          {meta && <div className="mt-1 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">{meta}</div>}
        </div>
        <div className="w-full motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">{children}</div>
      </Container>
    </section>
  );
}
