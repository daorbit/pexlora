import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("excel-to-pdf");

export default function ExcelToPdfPage() {
  return <ToolPage slug="excel-to-pdf" />;
}
