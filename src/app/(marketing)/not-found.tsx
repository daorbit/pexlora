import type { Metadata } from "next";
import { statusCopy } from "@/content/status";
import { NotFoundContent } from "@/components/feedback/NotFoundContent";

export const metadata: Metadata = { title: statusCopy.notFound.title, robots: { index: false, follow: true } };

export default function MarketingNotFound() {
  return <NotFoundContent />;
}
