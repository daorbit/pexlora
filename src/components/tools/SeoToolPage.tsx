import { toolItem } from "@/config/tool-hub";
import { relatedSeoPages, seoPageIconSrc, seoPagePath, type SeoPage } from "@/content/seo-pages";
import { howToSteps } from "@/content/seo-pages/shared";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChecklistSection } from "@/components/tools/ChecklistSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoIntroSection } from "@/components/tools/SeoIntroSection";
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
        icon={page.icon}
        iconSrc={seoPageIconSrc(page)}
        headline={page.headline}
        description={page.description}
        tool={page.tool}
        accepts={page.kinds}
      />
      <SeoIntroSection heading={page.intro.heading} paragraphs={page.intro.paragraphs} />
      <SeoStepsSection title={`How to use the ${page.name}`} steps={howToSteps[page.tool]} />
      <ChecklistSection eyebrow={page.list.eyebrow} title={page.list.title} items={page.list.items} />
      <FaqSection items={page.faqs} />
      <RelatedToolsSection leading={toolItem(page.tool)} pages={relatedSeoPages(page).slice(0, 3)} />
      <AccountBand />
    </>
  );
}
