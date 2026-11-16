import type { Metadata } from "next";
import { Suspense } from "react";
import { adminCopy } from "@/content/admin";
import { AdminUsersFallback, AdminUsersView, type AdminSearchParams } from "@/components/admin/AdminUsersView";

export const metadata: Metadata = { title: adminCopy.nav.label };

export default function AdminPage({ searchParams }: { searchParams: AdminSearchParams }) {
  return (
    <Suspense fallback={<AdminUsersFallback />}>
      <AdminUsersView searchParams={searchParams} />
    </Suspense>
  );
}
