import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { featureBands } from "@/content/landing";
import { FeatureBand } from "@/components/landing/FeatureBand";
import { AiLabelVisual, LocationVisual, SizeVisual } from "@/components/landing/FeatureBandVisuals";

function toolLink(slug: WorkspaceToolSlug) {
  const tool = getWorkspaceTool(slug);
  return { label: tool.shortName, href: tool.href };
}

export function FeaturesSection() {
  const { location, ai, convert } = featureBands;

  return (
    <>
      <FeatureBand
        id="features"
        tone="ink"
        eyebrow={location.eyebrow}
        eyebrowClassName="text-danger"
        visual={<LocationVisual />}
        title={location.title}
        description={location.description}
        link={toolLink("view-metadata")}
      />
      <FeatureBand
        tone="pearl"
        eyebrow={ai.eyebrow}
        eyebrowClassName="text-warning"
        visual={<AiLabelVisual />}
        title={ai.title}
        description={ai.description}
        link={toolLink("remove-metadata")}
      />
      <FeatureBand
        tone="ink"
        eyebrow={convert.eyebrow}
        eyebrowClassName="text-secondary"
        visual={<SizeVisual />}
        title={convert.title}
        description={convert.description}
        link={toolLink("convert-format")}
      />
    </>
  );
}
