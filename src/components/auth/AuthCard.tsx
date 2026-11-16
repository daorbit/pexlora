import type { ReactNode } from "react";
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
