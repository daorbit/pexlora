import { imagePdfPath, type ImagePdfVariant } from "@/config/image-pdf-variants";
import { seoPagesBySlug } from "@/content/seo-pages";
import { toolPageCopy } from "@/content/tool-pages";
import { imagePdfFaqs, imagePdfGuides, imagePdfSteps } from "@/content/variant-guides";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { workspaceToolFacts } from "@/lib/seo/tool-facts";
import { ToolFactsSection } from "@/components/seo/ToolFactsSection";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ImagePdfLinksSection } from "@/components/tools/ImagePdfLinksSection";
import { MoreToolsSection } from "@/components/tools/MoreToolsSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolPostsSection } from "@/components/tools/ToolPostsSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function ImagePdfPage({ variant }: { variant: ImagePdfVariant }) {
  const faqs = imagePdfFaqs(variant);
  const description = toolPageCopy.imagePdfDescription(variant.from);
  const name = `${toolPageCopy.imagePdfName(variant.from)} Converter`;
  const path = imagePdfPath(variant.slug);

  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name,
          path,
          description,
          faqs,
          category: "UtilitiesApplication",
        })}
      />
      <ToolHero headline={toolPageCopy.imagePdfHeadline(variant.from)} description={description} tool="jpg-to-pdf" />
      <SeoStepsSection title={`How to convert ${variant.from} to PDF`} steps={imagePdfSteps(variant)} />
      <ImagePdfLinksSection current={path} />
      <ToolFactsSection name={name} description={description} path={path} rows={workspaceToolFacts("jpg-to-pdf")} />
      <FaqSection items={faqs} />
      <ToolPostsSection tool="jpg-to-pdf" />
      <RelatedToolsSection pages={seoPagesBySlug(imagePdfGuides)} />
      <MoreToolsSection current="jpg-to-pdf" />
      <AccountBand />
    </>
  );
}
