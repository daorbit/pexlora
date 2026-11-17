export function NotFoundMark() {
  return (
    <p
      aria-hidden
      className="flex items-center gap-1 text-[96px] leading-none font-bold tracking-[-0.06em] select-none motion-safe:animate-pop sm:text-[150px]"
    >
      <span>4</span>
      <span className="rounded-2xl bg-primary px-[0.08em] text-primary-foreground sm:rounded-3xl">0</span>
      <span>4</span>
    </p>
  );
}
