import { Suspense, type ReactNode } from "react";
import { OneTapGate } from "@/components/auth/OneTapGate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function MarketingFrame({ children, oneTap = true }: { children: ReactNode; oneTap?: boolean }) {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      {oneTap && (
        <Suspense fallback={null}>
          <OneTapGate />
        </Suspense>
      )}
    </div>
  );
}
