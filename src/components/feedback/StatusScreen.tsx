import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type StatusScreenProps = {
  visual: ReactNode;
  eyebrow?: string;
  title: string;
  body: string;
  actions: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function StatusScreen({ visual, eyebrow, title, body, actions, footer, className }: StatusScreenProps) {
  return (
    <section className={cn("mx-auto flex w-full max-w-xl flex-col items-center gap-6 px-4 py-14 text-center sm:py-24", className)}>
      {visual}
      <div className="flex flex-col gap-3 motion-safe:animate-fade-up">
        {eyebrow && <p className="font-mono text-[11.5px] tracking-[0.08em] text-tertiary uppercase">{eyebrow}</p>}
        <h1 className="text-[30px] leading-[1.1] font-bold tracking-[-0.035em] sm:text-[44px]">{title}</h1>
        <p className="mx-auto max-w-md text-[15px] leading-relaxed text-secondary">{body}</p>
      </div>
      <div className="flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row">{actions}</div>
      {footer}
    </section>
  );
}
