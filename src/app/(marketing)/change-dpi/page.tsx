import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("change-dpi");

export default function ChangeDpiPage() {
  return <ToolPage slug="change-dpi" />;
}
