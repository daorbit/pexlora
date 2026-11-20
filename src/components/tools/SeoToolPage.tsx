import { toolItem } from "@/config/tool-hub";
import { relatedSeoPages, seoPagePath, type SeoPage } from "@/content/seo-pages";
import { howToSteps } from "@/content/seo-pages/shared";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { workspaceToolFacts } from "@/lib/seo/tool-facts";
import { ToolFactsSection } from "@/components/seo/ToolFactsSection";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChecklistSection } from "@/components/tools/ChecklistSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function SeoToolPage({ page }: { page: SeoPage }) {
  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name: page.name,
          path: seoPagePath(page),
          description: page.description,
          faqs: page.faqs,
          features: page.list.items,
        })}
      />
      <ToolHero
        headline={page.headline}
        description={page.description}
        tool={page.tool}
        accepts={page.kinds}
      />
      <SeoStepsSection title={`How to use the ${page.name}`} steps={howToSteps[page.tool]} intro={page.intro} />
      <ChecklistSection eyebrow={page.list.eyebrow} title={page.list.title} items={page.list.items} />
      <ToolFactsSection name={page.name} description={page.description} path={seoPagePath(page)} rows={workspaceToolFacts(page.tool, page.kinds)} />
      <FaqSection items={page.faqs} />
      <RelatedToolsSection leading={toolItem(page.tool)} pages={relatedSeoPages(page)} />
      <AccountBand />
    </>
  );
}
