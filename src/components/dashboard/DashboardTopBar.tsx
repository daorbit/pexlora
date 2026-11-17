import { Suspense, type ReactNode } from "react";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ShellPageTitle } from "@/components/dashboard/ShellPageTitle";
import { ToolSearch } from "@/components/dashboard/ToolSearch";
import { TopBarPlanGem } from "@/components/dashboard/TopBarPlanGem";

export function DashboardTopBar({ mobileNav }: { mobileNav: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-30 flex items-center gap-2 bg-background/90 px-3 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 backdrop-blur-md sm:gap-3.5 sm:px-6 sm:pt-[22px] sm:pb-0 lg:static lg:bg-transparent lg:backdrop-blur-none">
        {mobileNav}
        <div className="lg:hidden">
          <Logo size="md" />
        </div>
        <div className="hidden min-w-0 flex-1 lg:block">
          <ShellPageTitle />
        </div>
        <span className="flex-1 lg:hidden" />
        <ToolSearch />
        <Suspense fallback={null}>
          <TopBarPlanGem />
        </Suspense>
        <ThemeToggle variant="tile" size="lg" className="max-sm:size-10" />
      </header>
      <div className="px-4 pt-3 sm:px-6 sm:pt-5 lg:hidden">
        <ShellPageTitle />
      </div>
    </>
  );
}
