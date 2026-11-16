import Link from "next/link";
import { Search } from "lucide-react";
import { routes } from "@/config/site";
import { adminCopy } from "@/content/admin";
import { Button } from "@/components/ui/Button";

export function UserSearchForm({ query }: { query: string }) {
  const copy = adminCopy.users;
  return (
    <form action={routes.dashboardAdmin} method="get" role="search" className="flex items-center gap-2">
      <label className="relative flex-1">
        <span className="sr-only">{copy.searchLabel}</span>
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-tertiary" aria-hidden />
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder={copy.searchPlaceholder}
          className="h-10 w-full rounded-xl border border-separator bg-surface pr-3.5 pl-10 text-sm outline-none transition-shadow placeholder:text-tertiary hover:border-border-strong focus:border-foreground focus:ring-4 focus:ring-foreground/10"
        />
      </label>
      <Button type="submit" variant="ink" size="md">
        {copy.search}
      </Button>
      {query && (
        <Link href={routes.dashboardAdmin} className="px-1 text-sm font-semibold text-secondary hover:text-foreground">
          {copy.clear}
        </Link>
      )}
    </form>
  );
}
