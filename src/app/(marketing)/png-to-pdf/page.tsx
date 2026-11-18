import { getImagePdfVariant } from "@/config/image-pdf-variants";
import { imagePdfMetadata } from "@/lib/seo/tool-metadata";
import { ImagePdfPage } from "@/components/tools/ImagePdfPage";

const variant = getImagePdfVariant("png-to-pdf");

export const metadata = imagePdfMetadata(variant);

export default function PngToPdfPage() {
  return <ImagePdfPage variant={variant} />;
}
