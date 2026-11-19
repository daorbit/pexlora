import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { textLinkClass } from "@/components/ui/text-link-styles";

type PostListHeaderProps = {
  id: string;
  title: ReactNode;
  linkLabel: string;
  children?: ReactNode;
};

export function PostListHeader({ id, title, linkLabel, children }: PostListHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        {children}
        <h2 id={id} className="text-[22px] font-semibold tracking-[-0.028em] sm:text-[30px]">
          {title}
        </h2>
      </div>
      <Link href={routes.blog} className={cn(textLinkClass, "shrink-0")}>
        {linkLabel}
        <ArrowRight className="size-3.5" strokeWidth={2.4} aria-hidden />
      </Link>
    </div>
  );
}
