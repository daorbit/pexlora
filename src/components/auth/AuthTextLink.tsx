import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { textLinkClass } from "@/components/ui/text-link-styles";

type AuthTextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function AuthTextLink({ href, children, className }: AuthTextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(textLinkClass, className)}
    >
      {children}
    </Link>
  );
}
