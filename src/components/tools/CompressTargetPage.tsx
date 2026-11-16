import type { CompressTarget } from "@/config/compress-targets";
import { otherTools } from "@/config/tool-hub";
import { getWorkspaceTool, toolIconSrc } from "@/config/tools";
import { toolPageCopy } from "@/content/tool-pages";
import { DEFAULT_TOOL_OPTIONS } from "@/lib/image/options";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CompressTargetLinksSection } from "@/components/tools/CompressTargetLinksSection";
import { HubGridSection } from "@/components/tools/HubGridSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function CompressTargetPage({ target }: { target: CompressTarget }) {
  return (
    <>
      <ToolHero
        icon={getWorkspaceTool("compress-image").icon}
        iconSrc={toolIconSrc("compress-image")}
        headline={toolPageCopy.compressTargetHeadline(target.label)}
        description={toolPageCopy.compressTargetDescription(target.label)}
        tool="compress-image"
        initialOptions={{ compress: { ...DEFAULT_TOOL_OPTIONS.compress, mode: "target", targetKb: target.kb } }}
      />
      <CompressTargetLinksSection current={target.slug} />
      <FeaturesSection />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools("compress-image")} />
      <FaqSection />
      <AccountBand />
    </>
  );
}
