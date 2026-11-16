import type { FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import type { ToolOptions } from "@/lib/image/options";
import type { IconComponent } from "@/components/icons/types";
import { PageIntroHero } from "@/components/tools/PageIntroHero";
import { ToolWorkspace } from "@/components/workspace/ToolWorkspace";

type ToolHeroProps = {
  icon: IconComponent;
  iconSrc?: string;
  headline: string;
  description: string;
  tool: WorkspaceToolSlug;
  accepts?: FileKind[];
  initialOptions?: Partial<ToolOptions>;
  conversion?: string;
};

export function ToolHero({ tool, accepts, initialOptions, conversion, ...intro }: ToolHeroProps) {
  return (
    <PageIntroHero {...intro}>
      <ToolWorkspace tool={tool} accepts={accepts} initialOptions={initialOptions} conversion={conversion} />
    </PageIntroHero>
  );
}
