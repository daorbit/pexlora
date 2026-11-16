import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageIntroHeroProps = {
  headline: string;
  description: string;
  wide?: boolean;
  children: ReactNode;
};

export function PageIntroHero({ headline, description, wide, children }: PageIntroHeroProps) {
  return (
    <section className="py-10 sm:py-14">
      <Container size={wide ? "wide" : "narrow"} className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="max-w-3xl text-[34px] leading-[1.06] font-bold tracking-[-0.035em] text-balance motion-safe:animate-fade-up sm:text-[52px]">
            {headline}
          </h1>
          <p className="max-w-xl text-[17px] leading-relaxed text-secondary motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
            {description}
          </p>
        </div>
        <div className="w-full motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">{children}</div>
      </Container>
    </section>
  );
}
