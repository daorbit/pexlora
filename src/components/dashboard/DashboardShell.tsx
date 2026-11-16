import { Suspense, type ReactNode } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { SidebarUser, SidebarUserFallback } from "@/components/dashboard/SidebarUser";

function SidebarFooter() {
  return (
    <Suspense fallback={<SidebarUserFallback />}>
      <SidebarUser />
    </Suspense>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-separator bg-background lg:block">
        <SidebarNav footer={<SidebarFooter />} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          mobileNav={
            <MobileNav>
              <SidebarNav footer={<SidebarFooter />} />
            </MobileNav>
          }
        />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
