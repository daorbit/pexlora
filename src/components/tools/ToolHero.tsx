import type { FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import type { ToolOptions } from "@/lib/image/options";
import type { IconComponent } from "@/components/icons/types";
import { Container } from "@/components/ui/Container";
import { HubItemIcon } from "@/components/tools/HubItemIcon";
import { ToolWorkspace } from "@/components/workspace/ToolWorkspace";

type ToolHeroProps = {
  icon: IconComponent;
  iconSrc?: string;
  headline: string;
  description: string;
  tool: WorkspaceToolSlug;
  accepts?: FileKind[];
  initialOptions?: Partial<ToolOptions>;
};

export function ToolHero({ icon: Icon, iconSrc, headline, description, tool, accepts, initialOptions }: ToolHeroProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow" className="flex flex-col items-center gap-10">
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
        <div className="w-full motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
          <ToolWorkspace tool={tool} accepts={accepts} initialOptions={initialOptions} />
        </div>
      </Container>
    </section>
  );
}
