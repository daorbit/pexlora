import { Fragment, type ReactNode } from "react";

export type ProofItem = { id: string; content: ReactNode };

type ProofRowProps = {
  label: string;
  items: ProofItem[];
};

export function ProofRow({ label, items }: ProofRowProps) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center gap-3.5 sm:gap-6">
      {items.map((item, index) => (
        <Fragment key={item.id}>
          {index > 0 && <span aria-hidden className="h-7 w-px shrink-0 bg-border-strong" />}
          {item.content}
        </Fragment>
      ))}
    </div>
  );
}
