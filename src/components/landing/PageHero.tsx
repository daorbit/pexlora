import type { ReactNode } from "react";
import { heroCopy } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { HomeTool } from "@/components/landing/HomeTool";
import { TrustChips } from "@/components/landing/TrustChips";

type PageHeroProps = {
  title: ReactNode;
  description: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="pt-8 pb-16 sm:pt-16 sm:pb-24">
      <Container className="flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-separator bg-surface py-1 pr-3.5 pl-1 text-[13px] font-semibold sm:gap-2.5 sm:py-1.5 sm:pr-4 sm:pl-1.5 sm:text-[13.5px]">
            <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] text-primary uppercase dark:text-ink-foreground">
              {heroCopy.badge}
            </span>
            {heroCopy.tagline}
          </p>
          <h1 className="max-w-5xl text-[33px] leading-[1.08] font-bold tracking-[-0.03em] sm:text-[52px] sm:leading-[1.05] sm:tracking-[-0.035em] lg:text-[60px]">
            {title}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-secondary sm:text-[18.5px]">{description}</p>
        </div>
        <HomeTool />
        <TrustChips className="justify-center" />
      </Container>
    </section>
  );
}
