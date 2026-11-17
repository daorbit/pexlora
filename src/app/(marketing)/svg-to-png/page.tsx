import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("svg-to-image");

export default function SvgToImagePage() {
  return <ToolPage slug="svg-to-image" />;
}
