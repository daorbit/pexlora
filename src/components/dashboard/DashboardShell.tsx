import { Suspense, type ReactNode } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { MobileTabBar } from "@/components/dashboard/MobileTabBar";
import { ShellScrollArea } from "@/components/dashboard/ShellScrollArea";
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
    <div className="flex min-h-dvh flex-1 bg-canvas [--bottom-bar:calc(3rem+env(safe-area-inset-bottom))] lg:h-dvh lg:[--bottom-bar:0px] lg:[--panel-top:2.5rem] lg:max-h-dvh lg:gap-3 lg:overflow-hidden lg:p-3">
      <div className="sidebar-slot relative z-40 hidden w-78 shrink-0 transition-[width] duration-300 slot-collapsed:w-19 lg:block">
        <AppSidebar usage={usage} account={account} />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background lg:overflow-hidden lg:rounded-[24px]">
        <ShellScrollArea className="relative flex min-h-0 flex-1 flex-col lg:my-2 lg:mr-1 lg:overflow-y-auto lg:overscroll-contain">
          <DashboardTopBar />
          <main className="w-full flex-1 px-4 pt-4 pb-[calc(var(--bottom-bar)+2rem)] sm:px-6 sm:pt-[26px] lg:pb-10">{children}</main>
        </ShellScrollArea>
      </div>
      <MobileTabBar menu={<AppSidebar usage={usage} account={account} collapsible={false} className="w-full" />} />
    </div>
  );
}
