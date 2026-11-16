import { heroCopy } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { TrustChips } from "@/components/landing/TrustChips";
import { HeroUpload } from "@/components/home/HeroUpload";

export function HomeHero() {
  return (
    <section className="pt-10 pb-14 sm:pt-16 sm:pb-20">
      <Container className="flex flex-col items-center gap-8 sm:gap-10">
        <div className="flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="inline-flex items-center gap-2 rounded-xl border border-separator bg-surface py-1 pr-3.5 pl-1 text-[13px] font-semibold motion-safe:animate-fade-up">
            <span className="rounded-lg bg-ink px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] text-primary uppercase dark:text-ink-foreground">
              {heroCopy.badge}
            </span>
            {heroCopy.tagline}
          </p>
          <h1 className="text-[34px] leading-[1.06] font-bold tracking-[-0.035em] motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-[52px] lg:text-[60px]">
            {heroCopy.title} <Highlight>{heroCopy.highlight}</Highlight>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-secondary motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] sm:text-[18px]">
            {heroCopy.description}
          </p>
        </div>
        <div className="w-full max-w-[900px] motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
          <HeroUpload />
        </div>
        <TrustChips className="justify-center motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]" />
      </Container>
    </section>
  );
}
