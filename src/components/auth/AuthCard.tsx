import type { ReactNode } from "react";
import { AuthHeading } from "@/components/auth/AuthHeading";
import { AuthLegalNote } from "@/components/auth/AuthLegalNote";

type AuthCardProps = {
  title?: string;
  description?: string;
  footer?: ReactNode;
  freeNote?: boolean;
  children: ReactNode;
};

export function AuthCard({ title, description, footer, freeNote, children }: AuthCardProps) {
  return (
    <div className="flex w-full max-w-95 flex-col gap-5 sm:gap-5.5">
      {title && description && <AuthHeading title={title} description={description} />}
      {children}
      {footer}
      <AuthLegalNote freeNote={freeNote} />
    </div>
  );
}
