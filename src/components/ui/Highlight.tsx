import type { ReactNode } from "react";

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-[0.18em] bg-primary px-[0.1em] pt-[0.02em] pb-[0.1em] leading-none text-primary-foreground translated:inline translated:bg-transparent translated:p-0 translated:leading-[inherit] translated:text-inherit">
      {children}
    </span>
  );
}
