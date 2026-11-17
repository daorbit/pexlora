import { Mail } from "lucide-react";
import { authCopy } from "@/content/auth";

export function EmailChip({ email, onChange }: { email: string; onChange: () => void }) {
  return (
    <div className="flex h-12 items-center gap-3 rounded-xl border border-separator bg-fill pr-1.5 pl-3.5">
      <Mail className="size-4 shrink-0 text-secondary" aria-hidden />
      <span translate="no" className="notranslate min-w-0 flex-1 truncate text-[15px] font-medium">
        {email}
      </span>
      <input type="email" name="email" value={email} autoComplete="username" readOnly tabIndex={-1} aria-hidden className="sr-only" />
      <button
        type="button"
        onClick={onChange}
        className="h-9 shrink-0 rounded-lg px-3 text-[13px] font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-3 hover:bg-surface focus-visible:outline-2 focus-visible:outline-ring"
      >
        {authCopy.entry.change}
      </button>
    </div>
  );
}
