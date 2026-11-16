import { getSuperAdmin } from "@/lib/auth/dal";
import { SidebarAdminLink } from "@/components/admin/SidebarAdminLink";

export async function SidebarAdmin() {
  const admin = await getSuperAdmin();
  return admin ? <SidebarAdminLink /> : null;
}
