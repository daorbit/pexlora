export const docColors = [
  { chip: "bg-ink text-ink-foreground", fill: "fill-ink" },
  { chip: "bg-primary text-primary-foreground", fill: "fill-primary" },
  { chip: "bg-border-strong text-foreground", fill: "fill-border-strong" },
  { chip: "bg-accent-text text-surface", fill: "fill-accent-text" },
  { chip: "bg-tertiary text-surface", fill: "fill-tertiary" },
  { chip: "bg-accent-soft text-accent-text", fill: "fill-accent-soft" },
];

export const docColor = (index: number) => docColors[index % docColors.length];
