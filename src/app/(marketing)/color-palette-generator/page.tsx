import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("image-palette");

export default function ColorPalettePage() {
  return <ToolPage slug="image-palette" />;
}
