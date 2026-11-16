import { heroCopy } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { HeroShortcuts } from "@/components/home/HeroShortcuts";
import { HeroUpload } from "@/components/home/HeroUpload";

export function HomeHero() {
  return (
    <section className="pt-2 pb-6 sm:pt-6 sm:pb-12">
      <Container>
      <div className="theme-invert flex flex-col items-center gap-4 rounded-[24px] bg-background px-3 pt-7 pb-4 text-center text-foreground ring-1 ring-separator sm:gap-6 sm:rounded-[32px] sm:px-8 sm:pt-14 sm:pb-10">
        <h1 className="flex flex-col items-center gap-4 sm:gap-6">
          <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-secondary uppercase motion-safe:animate-fade-up sm:text-xs">
            {heroCopy.eyebrow}
            <span className="h-px w-9 bg-primary" aria-hidden />
            {heroCopy.eyebrowNote}
          </span>
          <span className="block max-w-4xl text-[32px] leading-[1.04] font-extrabold tracking-tighter motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-[54px] lg:text-[64px]">
            {heroCopy.title}
            <br />
            {heroCopy.titleLead}{" "}
            <span className="text-primary page-dark:rounded-2xl page-dark:bg-primary page-dark:px-3 page-dark:text-primary-foreground">
              {heroCopy.highlight}
            </span>
          </span>
        </h1>
        <p className="max-w-xl px-1 text-[14px] leading-relaxed text-secondary motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] sm:text-[17px]">
          {heroCopy.description}
        </p>
        <div className="w-full max-w-180 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
          <HeroUpload />
        </div>
        <div className="w-full motion-safe:animate-fade-up motion-safe:[animation-delay:320ms] sm:w-auto">
          <HeroShortcuts />
        </div>
      </div>
      </Container>
    </section>
  );
}
