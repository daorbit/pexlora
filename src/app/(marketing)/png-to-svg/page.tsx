import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("image-to-svg");

export default function ImageToSvgPage() {
  return <ToolPage slug="image-to-svg" />;
}
