import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("resize-image");

export default function ResizeImagePage() {
  return <ToolPage slug="resize-image" />;
}
