import type { Metadata } from "next";
import { RecentFiles } from "@/components/dashboard/RecentFiles";

export const metadata: Metadata = { title: "History" };

export default function HistoryPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <RecentFiles />
    </div>
  );
}
