export function ResponsiveLabel({ short, full }: { short: string; full: string }) {
  if (short === full) return <>{full}</>;

  return (
    <>
      <span className="sm:hidden" aria-hidden>
        {short}
      </span>
      <span className="max-sm:sr-only">{full}</span>
    </>
  );
}
