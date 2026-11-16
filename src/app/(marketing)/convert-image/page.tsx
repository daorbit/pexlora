import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("convert-format");

export default function ConvertImagePage() {
  return <ToolPage slug="convert-format" />;
}
