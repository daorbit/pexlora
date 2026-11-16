export function ProgressBar() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-fill">
      <span className="block h-full w-2/5 rounded-full bg-primary motion-safe:animate-progress" />
    </span>
  );
}
