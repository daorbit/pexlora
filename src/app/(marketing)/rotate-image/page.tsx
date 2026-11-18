import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("rotate-image");

export default function RotateImagePage() {
  return <ToolPage slug="rotate-image" />;
}
