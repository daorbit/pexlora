import { getImagePdfVariant } from "@/config/image-pdf-variants";
import { imagePdfMetadata } from "@/lib/seo/tool-metadata";
import { ImagePdfPage } from "@/components/tools/ImagePdfPage";

const variant = getImagePdfVariant("webp-to-pdf");

export const metadata = imagePdfMetadata(variant);

export default function WebpToPdfPage() {
  return <ImagePdfPage variant={variant} />;
}
