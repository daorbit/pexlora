import type { Metadata } from "next";
import { statusCopy } from "@/content/status";
import { NotFoundContent } from "@/components/feedback/NotFoundContent";
import { MarketingFrame } from "@/components/layout/MarketingFrame";

export const metadata: Metadata = { title: statusCopy.notFound.title, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <MarketingFrame oneTap={false}>
      <NotFoundContent />
    </MarketingFrame>
  );
}
