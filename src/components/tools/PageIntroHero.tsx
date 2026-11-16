import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import type { IconComponent } from "@/components/icons/types";
import { Container } from "@/components/ui/Container";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type PageIntroHeroProps = {
  icon: IconComponent;
  iconSrc?: string;
  headline: string;
  description: string;
  wide?: boolean;
  children: ReactNode;
};

export function PageIntroHero({ icon: Icon, iconSrc, headline, description, wide, children }: PageIntroHeroProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container size={wide ? "wide" : "narrow"} className={cn("flex flex-col items-center gap-10", wide && "max-w-7xl")}>
        <div className="flex flex-col items-center gap-4 text-center">
          {iconSrc ? (
            <HubItemIcon src={iconSrc} size="xl" className="motion-safe:animate-pop" />
          ) : (
            <span className="inline-flex size-14 items-center justify-center rounded-[18px] bg-ink text-primary motion-safe:animate-pop dark:bg-primary dark:text-primary-foreground">
              <Icon className="size-6" strokeWidth={2} />
            </span>
          )}
          <h1 className="text-[34px] leading-[1.06] font-bold tracking-[-0.035em] motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-[48px]">
            {headline}
          </h1>
          <p className="max-w-xl text-[17px] leading-relaxed text-secondary motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            {description}
          </p>
        </div>
        <div className="w-full motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">{children}</div>
      </Container>
    </section>
  );
}
