import { FileImage, MapPin, ShieldOff } from "lucide-react";
import { toolAnchor } from "@/config/site";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { Section } from "@/components/ui/Section";
import { FeatureTile } from "@/components/landing/FeatureTile";
import { AiTagsVisual, FormatsVisual, LocationVisual } from "@/components/landing/FeatureVisuals";

function toolLink(slug: WorkspaceToolSlug) {
  return { label: getWorkspaceTool(slug).shortName, href: toolAnchor(slug) };
}

export function FeaturesSection() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title="Keep the picture. Lose the baggage."
      description="Remove AI labels, hide where a photo was taken and convert to modern formats, all from one place."
    >
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <FeatureTile
          tone="lime"
          icon={ShieldOff}
          label="Remove AI Metadata"
          title="No more “Made with AI” labels."
          body="Strip C2PA credentials, XMP digital source type, prompts and generator names."
          primary={toolLink("remove-metadata")}
          secondary={{ label: "What gets removed", href: "/#learn" }}
          visual={<AiTagsVisual />}
        />
        <FeatureTile
          tone="ink"
          icon={MapPin}
          label="Protect Your Location"
          title="Your photos know where you were."
          body="See GPS, device and time data before you share, then strip it in one click."
          primary={toolLink("view-metadata")}
          secondary={{ label: "Why it matters", href: "/#why" }}
          visual={<LocationVisual />}
        />
        <FeatureTile
          tone="orange"
          icon={FileImage}
          label="Convert Images"
          title="Modern formats, smaller files."
          body="Turn JPG and PNG into WebP or AVIF with full quality control. Every file comes out clean."
          primary={toolLink("convert-format")}
          secondary={{ label: "Supported formats", href: "/#formats" }}
          visual={<FormatsVisual />}
          className="lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.375rem)]"
        />
      </div>
    </Section>
  );
}
