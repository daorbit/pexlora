import { Suspense, type ReactNode } from "react";
import { BLOG_FOOTER_HIDDEN_PREFIXES } from "@/config/blog";
import { OneTapGate } from "@/components/auth/OneTapGate";
import { BlogFooterPosts } from "@/components/blog/BlogFooterPosts";
import { HideOnPaths } from "@/components/layout/HideOnPaths";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OfferRibbon } from "@/components/offer/OfferRibbon";

export function MarketingFrame({ children, oneTap = true }: { children: ReactNode; oneTap?: boolean }) {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <OfferRibbon />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <HideOnPaths prefixes={BLOG_FOOTER_HIDDEN_PREFIXES}>
        <BlogFooterPosts />
      </HideOnPaths>
      <SiteFooter />
      {oneTap && (
        <Suspense fallback={null}>
          <OneTapGate />
        </Suspense>
      )}
    </div>
  );
}
