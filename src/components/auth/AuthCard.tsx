import type { ReactNode } from "react";
import type { AuthMode } from "@/content/auth";
import { AuthLegalNote } from "@/components/auth/AuthLegalNote";
import { AuthPerks } from "@/components/auth/AuthPerks";
import { AuthModeSwitch } from "@/components/auth/AuthModeSwitch";

type AuthCardProps = {
  title: string;
  description: string;
  tabs?: AuthMode;
  footer?: ReactNode;
  children: ReactNode;
};

export function AuthCard({ title, description, tabs, footer, children }: AuthCardProps) {
  return (
    <div className="flex w-full flex-col gap-3.5 lg:max-w-110 lg:gap-5.5">
      <div className="flex flex-col gap-1 lg:gap-2">
        <h1 className="text-[26px] leading-[1.05] font-extrabold tracking-[-0.04em] lg:text-[40px] lg:leading-[1.02] lg:tracking-[-0.045em]">
          {title}
        </h1>
        <p className="text-[13.5px] leading-normal text-secondary lg:text-[15.5px]">{description}</p>
      </div>
      {tabs && <AuthModeSwitch active={tabs} />}
      {children}
      {footer}
      {tabs && <AuthPerks />}
      <AuthLegalNote />
    </div>
  );
}
