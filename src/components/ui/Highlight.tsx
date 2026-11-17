import type { ReactNode } from "react";

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[0.14em] bg-primary px-[0.1em] pb-[0.06em] text-primary-foreground [-webkit-box-decoration-break:clone] [box-decoration-break:clone] translated:bg-transparent translated:p-0 translated:text-inherit">
      {children}
    </span>
  );
}
