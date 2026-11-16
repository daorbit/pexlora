import Image from "next/image";
import { authMedia } from "@/content/auth";
import { Logo } from "@/components/layout/Logo";
import { AuthMetadataChips } from "@/components/auth/AuthMetadataChips";

export function AuthMedia() {
  return (
    <section className="theme-dark relative isolate hidden min-h-[640px] overflow-hidden rounded-[28px] bg-brand-surface text-foreground lg:block">
      <Image
        src={authMedia.src}
        alt={authMedia.alt}
        fill
        priority
        sizes="45vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-x-8 top-7 flex items-center justify-between">
        <Logo size="lg" />
        <span className="text-xs text-white/70">{authMedia.caption}</span>
      </div>
      <div className="absolute inset-x-8 bottom-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[11ch] text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-white xl:text-[52px]">
          {authMedia.headline} <span className="text-primary">{authMedia.highlight}</span>
        </h2>
        <AuthMetadataChips />
      </div>
    </section>
  );
}
