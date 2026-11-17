import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("crop-image");

export default function CropImagePage() {
  return <ToolPage slug="crop-image" />;
}
