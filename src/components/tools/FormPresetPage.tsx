import { formPresetOptions, formPresetPath, type FormPreset } from "@/config/form-presets";
import { otherTools } from "@/config/tool-hub";
import { formPresetCopy, toolPageCopy } from "@/content/tool-pages";
import { seoPagesBySlug } from "@/content/seo-pages";
import { formPresetFaqs, formPresetGuides, formPresetSteps } from "@/content/variant-guides";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { FormPresetLinksSection } from "@/components/tools/FormPresetLinksSection";
import { HubGridSection } from "@/components/tools/HubGridSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function FormPresetPage({ preset }: { preset: FormPreset }) {
  const faqs = formPresetFaqs(preset);
  const description = formPresetCopy.description(preset);

  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name: formPresetCopy.title(preset),
          path: formPresetPath(preset.slug),
          description,
          faqs,
          category: "MultimediaApplication",
        })}
      />
      <ToolHero
        headline={formPresetCopy.headline(preset)}
        description={description}
        tool="form-photo"
        initialOptions={{ form: formPresetOptions(preset) }}
      />
      <SeoStepsSection title={formPresetCopy.stepsTitle(preset)} steps={formPresetSteps(preset)} />
      <FormPresetLinksSection current={preset.slug} />
      <FaqSection items={faqs} />
      <RelatedToolsSection pages={seoPagesBySlug(formPresetGuides)} />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools("form-photo")} />
      <AccountBand />
    </>
  );
}
