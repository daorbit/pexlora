import { toolMetadata } from "@/lib/seo/tool-metadata";
import { ToolPage } from "@/components/tools/ToolPage";

export const metadata = toolMetadata("image-watermark");

export default function WatermarkImagePage() {
  return <ToolPage slug="image-watermark" />;
}
