import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { brandAssets } from "@/config/brand";
import { routes } from "@/config/site";
import { authLegal, type AuthMode } from "@/content/auth";
import { AuthModeSwitch } from "@/components/auth/AuthModeSwitch";

type AuthCardProps = {
  mode: AuthMode;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthCard({ mode, title, description, children }: AuthCardProps) {
  return (
    <div className="flex w-full max-w-[380px] flex-col gap-[22px]">
      <Link
        href={routes.home}
        aria-label="Pexlora home"
        title="Go to home"
        className="inline-flex size-11 items-center justify-center rounded-xl border border-separator bg-surface"
      >
        <Image src={brandAssets.mark} alt="" width={26} height={26} className="size-[26px]" />
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em]">{title}</h1>
        <p className="text-[15px] leading-relaxed text-secondary">{description}</p>
      </div>
      <AuthModeSwitch active={mode} />
      {children}
      <p className="text-center text-xs leading-relaxed text-secondary">{authLegal}</p>
    </div>
  );
}
