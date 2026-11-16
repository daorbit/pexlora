import type { Metadata } from "next";
import { Suspense } from "react";
import { adminCopy } from "@/content/admin";
import { AdminUserFallback, AdminUserView, type AdminUserSearchParams } from "@/components/admin/AdminUserView";

export const metadata: Metadata = { title: adminCopy.nav.label };

export default function AdminUserPage({ searchParams }: { searchParams: AdminUserSearchParams }) {
  return (
    <Suspense fallback={<AdminUserFallback />}>
      <AdminUserView searchParams={searchParams} />
    </Suspense>
  );
}
