import Image from "next/image";
import { authMedia } from "@/content/auth";
import { Logo } from "@/components/layout/Logo";
import { AuthMetadataCard } from "@/components/auth/AuthMetadataCard";

export function AuthMedia() {
  return (
    <section className="theme-dark relative isolate hidden min-h-[640px] flex-col justify-between overflow-hidden rounded-3xl bg-brand-surface p-8 text-foreground lg:flex xl:p-10">
      <Image
        src={authMedia.src}
        alt={authMedia.alt}
        fill
        priority
        sizes="45vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-black/35" />
      <Logo size="lg" />
      <div className="flex flex-col gap-6">
        <h2 className="max-w-[14ch] text-[36px] leading-[1.05] font-semibold tracking-[-0.035em] text-white motion-safe:animate-fade-up xl:text-[46px]">
          {authMedia.headline} <span className="text-primary">{authMedia.highlight}</span>
        </h2>
        <AuthMetadataCard />
      </div>
    </section>
  );
}
