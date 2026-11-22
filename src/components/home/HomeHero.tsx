import { heroCopy } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { HeroProof } from "@/components/home/HeroProof";
import { HeroShortcuts } from "@/components/home/HeroShortcuts";
import { HeroTrust } from "@/components/home/HeroTrust";
import { HeroUpload } from "@/components/home/HeroUpload";
import { PlanPerksLoader } from "@/components/plan/PlanPerksLoader";

export function HomeHero() {
  return (
    <section className="relative -mt-14">
      <div aria-hidden className="dot-grid absolute inset-x-0 top-0 h-130 sm:h-160" />
      <Container className="relative flex flex-col items-center gap-4 pt-18 pb-4 text-center sm:gap-7 sm:pt-28 sm:pb-16 lg:pt-30">
        <h1 className="flex flex-col items-center gap-3 sm:gap-5">
          <span className="inline-flex items-center gap-3 text-[10.5px] font-bold tracking-[0.16em] text-secondary uppercase motion-safe:animate-fade-up sm:text-xs sm:tracking-[0.2em]">
            {heroCopy.eyebrow}
            <span className="hidden h-px w-9 bg-primary sm:block" aria-hidden />
            <span className="hidden sm:inline">{heroCopy.eyebrowNote}</span>
          </span>
          <span className="block max-w-4xl text-[clamp(28px,8.6vw,36px)] leading-[1.08] font-bold tracking-[-0.04em] motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] translated:leading-[1.35] translated:tracking-normal sm:text-[46px] sm:leading-[1.08] sm:tracking-[-0.045em] sm:translated:leading-[1.3] sm:translated:tracking-normal lg:text-[58px]">
            {heroCopy.title}
            <br />
            {heroCopy.titleLead}{" "}
            <Highlight>{heroCopy.highlight}</Highlight>
          </span>
        </h1>
        <p className="max-w-xl px-2 text-[13.5px] leading-normal text-secondary motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] sm:px-0 sm:text-[15.5px] sm:leading-relaxed">
          {heroCopy.description}
        </p>
        <div className="motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]">
          <HeroProof />
        </div>
        <div className="flex w-full max-w-5xl flex-col gap-4 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms] sm:mt-2">
          <PlanPerksLoader />
          <HeroUpload />
          <div className="hidden sm:block">
            <HeroTrust />
          </div>
        </div>
        <div className="w-full pt-2 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms] sm:max-w-2xl sm:pt-3">
          <HeroShortcuts />
        </div>
      </Container>
    </section>
  );
}
