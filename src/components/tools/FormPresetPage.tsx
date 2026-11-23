import { formPresetOptions, formPresetPath, type FormPreset } from "@/config/form-presets";
import { formPresetGuides as presetGuides } from "@/content/form-preset-guides";
import { formPresetCopy } from "@/content/tool-pages";
import { seoPagesBySlug } from "@/content/seo-pages";
import { formPresetFaqs, formPresetGuides, formPresetSteps } from "@/content/variant-guides";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { formPresetRows } from "@/lib/seo/form-preset-facts";
import { workspaceToolFacts } from "@/lib/seo/tool-facts";
import { FactsSection } from "@/components/seo/FactsSection";
import { ToolFactsSection } from "@/components/seo/ToolFactsSection";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { GuideSection } from "@/components/tools/GuideSection";
import { FormPresetLinksSection } from "@/components/tools/FormPresetLinksSection";
import { MoreToolsSection } from "@/components/tools/MoreToolsSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolPostsSection } from "@/components/tools/ToolPostsSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function FormPresetPage({ preset }: { preset: FormPreset }) {
  const faqs = formPresetFaqs(preset);
  const description = formPresetCopy.description(preset);
  const name = formPresetCopy.title(preset);
  const path = formPresetPath(preset.slug);
  const guide = presetGuides[preset.slug];

  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name,
          path,
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
      <FactsSection
        id="size"
        eyebrow={formPresetCopy.facts.eyebrow}
        title={formPresetCopy.facts.title(preset)}
        summary={formPresetCopy.facts.summary}
        caption={formPresetCopy.facts.title(preset)}
        rows={formPresetRows(preset)}
      />
      {guide && <GuideSection {...guide} />}
      <FormPresetLinksSection current={preset.slug} />
      <ToolFactsSection name={name} description={description} path={path} rows={workspaceToolFacts("form-photo")} />
      <FaqSection items={faqs} />
      <ToolPostsSection tool="form-photo" />
      <RelatedToolsSection pages={seoPagesBySlug(formPresetGuides)} />
      <MoreToolsSection current="form-photo" />
      <AccountBand />
    </>
  );
}
