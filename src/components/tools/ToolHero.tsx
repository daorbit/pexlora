import type { FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import type { IconComponent } from "@/components/icons/types";
import { Container } from "@/components/ui/Container";
import { ToolWorkspace } from "@/components/workspace/ToolWorkspace";

type ToolHeroProps = {
  icon: IconComponent;
  headline: string;
  description: string;
  tool: WorkspaceToolSlug;
  accepts?: FileKind[];
};

export function ToolHero({ icon: Icon, headline, description, tool, accepts }: ToolHeroProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow" className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-[18px] bg-ink text-primary dark:bg-primary dark:text-primary-foreground">
            <Icon className="size-6" strokeWidth={2} aria-hidden />
          </span>
          <h1 className="text-[34px] leading-[1.06] font-bold tracking-[-0.035em] sm:text-[48px]">{headline}</h1>
          <p className="max-w-xl text-[17px] leading-relaxed text-secondary">{description}</p>
        </div>
        <ToolWorkspace initialTool={tool} showTabs={false} accepts={accepts} />
      </Container>
    </section>
  );
}
