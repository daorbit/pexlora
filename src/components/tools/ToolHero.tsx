import type { Conversion } from "@/config/conversions";
import type { FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import type { ToolOptions } from "@/lib/image/options";
import { PageIntroHero } from "@/components/tools/PageIntroHero";
import { ToolWorkspace } from "@/components/workspace/ToolWorkspace";

type ToolHeroProps = {
  headline: string;
  description: string;
  tool: WorkspaceToolSlug;
  accepts?: FileKind[];
  initialOptions?: Partial<ToolOptions>;
  conversion?: Conversion;
};

export function ToolHero({ tool, accepts, initialOptions, conversion, ...intro }: ToolHeroProps) {
  return (
    <PageIntroHero {...intro} wide>
      <ToolWorkspace tool={tool} accepts={accepts} initialOptions={initialOptions} conversion={conversion} />
    </PageIntroHero>
  );
}
