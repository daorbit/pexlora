import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("shape-image");

export default function RoundImagePage() {
  return <ToolPage slug="shape-image" />;
}
