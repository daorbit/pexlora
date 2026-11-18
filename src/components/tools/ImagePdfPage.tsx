import { imagePdfPath, type ImagePdfVariant } from "@/config/image-pdf-variants";
import { otherTools } from "@/config/tool-hub";
import { seoPagesBySlug } from "@/content/seo-pages";
import { toolPageCopy } from "@/content/tool-pages";
import { imagePdfFaqs, imagePdfGuides, imagePdfSteps } from "@/content/variant-guides";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubGridSection } from "@/components/tools/HubGridSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function ImagePdfPage({ variant }: { variant: ImagePdfVariant }) {
  const faqs = imagePdfFaqs(variant);
  const description = toolPageCopy.imagePdfDescription(variant.from);

  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name: `${toolPageCopy.imagePdfName(variant.from)} Converter`,
          path: imagePdfPath(variant.slug),
          description,
          faqs,
          category: "UtilitiesApplication",
        })}
      />
      <ToolHero headline={toolPageCopy.imagePdfHeadline(variant.from)} description={description} tool="jpg-to-pdf" />
      <SeoStepsSection title={`How to convert ${variant.from} to PDF`} steps={imagePdfSteps(variant)} />
      <FaqSection items={faqs} />
      <RelatedToolsSection pages={seoPagesBySlug(imagePdfGuides)} />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools("jpg-to-pdf")} />
      <AccountBand />
    </>
  );
}
