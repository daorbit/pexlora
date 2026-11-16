import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { brandAssets } from "@/config/brand";
import { routes } from "@/config/site";
import { shellCopy } from "@/content/dashboard";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ShellPageTitle } from "@/components/dashboard/ShellPageTitle";
import { ToolSearch } from "@/components/dashboard/ToolSearch";

export function DashboardTopBar({ mobileNav }: { mobileNav: ReactNode }) {
  return (
    <header className="flex flex-wrap items-center gap-x-3.5 gap-y-5 px-4 pt-4 sm:px-8 sm:pt-[22px]">
      {mobileNav}
      <Link href={routes.home} aria-label={shellCopy.home} className="lg:hidden">
        <Image src={brandAssets.mark} alt="" width={28} height={28} className="size-7" />
      </Link>
      <div className="order-last w-full min-w-0 lg:order-none lg:w-auto lg:flex-1">
        <ShellPageTitle />
      </div>
      <span className="flex-1 lg:hidden" />
      <ToolSearch />
      <ThemeToggle variant="tile" size="lg" />
    </header>
  );
}
