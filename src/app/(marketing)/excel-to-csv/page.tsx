import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("excel-to-csv");

export default function ExcelToCsvPage() {
  return <ToolPage slug="excel-to-csv" />;
}
