const widths = ["w-0", "w-1/12", "w-2/12", "w-3/12", "w-4/12", "w-5/12", "w-6/12", "w-7/12", "w-8/12", "w-9/12", "w-10/12", "w-11/12", "w-full"];

export const barWidth = (percent: number) => widths[Math.round((Math.max(0, Math.min(100, percent)) / 100) * 12)];
