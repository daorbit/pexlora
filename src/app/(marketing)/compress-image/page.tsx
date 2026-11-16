import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("compress-image");

export default function CompressImagePage() {
  return <ToolPage slug="compress-image" />;
}
