import { Suspense, type ReactNode } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { SidebarUsage, SidebarUsageFallback } from "@/components/dashboard/SidebarUsage";
import { SidebarUser, SidebarUserFallback } from "@/components/dashboard/SidebarUser";
export function DashboardShell({ children }: { children: ReactNode }) {
  const usage = (
    <Suspense fallback={<SidebarUsageFallback />}>
      <SidebarUsage />
    </Suspense>
  );
  const account = (
    <Suspense fallback={<SidebarUserFallback />}>
      <SidebarUser />
    </Suspense>
  );

  return (
    <div className="flex min-h-dvh flex-1 bg-canvas lg:h-dvh lg:max-h-dvh lg:gap-3 lg:overflow-hidden lg:p-3">
      <div className="sidebar-slot relative z-40 hidden w-64 shrink-0 transition-[width] duration-300 slot-collapsed:w-19 lg:block">
        <AppSidebar usage={usage} account={account} />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background lg:overflow-hidden lg:rounded-[24px]">
        <div className="flex min-h-0 flex-1 flex-col lg:overflow-y-auto lg:my-2 lg:mr-1 lg:overscroll-contain">
          <DashboardTopBar
            mobileNav={
              <MobileNav>
                <AppSidebar usage={usage} account={account} collapsible={false} className="w-full" />
              </MobileNav>
            }
          />
          <main className="w-full flex-1 px-4 pt-6 pb-10 sm:px-8 sm:pt-[26px]">{children}</main>
        </div>
      </div>
    </div>
  );
}
