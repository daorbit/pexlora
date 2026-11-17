"use client";

import { publicSearchItems } from "@/config/search";
import { ToolSearch } from "@/components/dashboard/ToolSearch";

export function SiteSearch() {
  return <ToolSearch variant="header" items={publicSearchItems} />;
}
