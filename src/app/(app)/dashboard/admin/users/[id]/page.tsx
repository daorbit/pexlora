import type { Metadata } from "next";
import { Suspense } from "react";
import { adminCopy } from "@/content/admin";
import { AdminUserFallback, AdminUserView } from "@/components/admin/AdminUserView";

export const metadata: Metadata = { title: adminCopy.nav.label };

export default function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<AdminUserFallback />}>
      <AdminUserView params={params} />
    </Suspense>
  );
}
