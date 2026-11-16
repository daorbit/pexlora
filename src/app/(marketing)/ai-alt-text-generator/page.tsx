import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("image-alt-text");

export default function AltTextGeneratorPage() {
  return <ToolPage slug="image-alt-text" />;
}
