const breakpoints = {
  sm: { short: "sm:hidden", full: "max-sm:sr-only" },
  xl: { short: "xl:hidden", full: "max-xl:sr-only" },
};

type ResponsiveLabelProps = { short: string; full: string; from?: keyof typeof breakpoints };

export function ResponsiveLabel({ short, full, from = "sm" }: ResponsiveLabelProps) {
  if (short === full) return <>{full}</>;

  return (
    <>
      <span className={breakpoints[from].short} aria-hidden>
        {short}
      </span>
      <span className={breakpoints[from].full}>{full}</span>
    </>
  );
}
