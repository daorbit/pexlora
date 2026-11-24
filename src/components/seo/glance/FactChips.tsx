export function FactChips({ chips, removed }: { chips: string[]; removed?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5 sm:gap-2">
      {chips.map((chip) => (
        <li
          key={chip}
          className="relative rounded-lg bg-fill px-2.5 py-1 font-mono text-[12px] font-medium whitespace-nowrap sm:px-3 sm:py-1.5 sm:text-[13px]"
        >
          {removed ? (
            <span className="relative">
              <span className="motion-safe:animate-strike-ghost">{chip}</span>
              <span
                aria-hidden
                className="absolute inset-x-[-4px] top-1/2 -mt-px h-0.5 rounded-full bg-primary motion-safe:animate-strike-sweep"
              />
            </span>
          ) : (
            chip
          )}
        </li>
      ))}
    </ul>
  );
}
