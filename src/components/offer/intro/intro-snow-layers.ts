export type SnowLayer = { className: string; dots: string[]; flakes: string[] };

export const swayTimes = ["[--sway-time:2.7s]", "[--sway-time:3.6s]", "[--sway-time:4.4s]", "[--sway-time:3.1s]"];

export const introSnowLayers: SnowLayer[] = [
  {
    className: "opacity-45 [--snow-sway:6px]",
    dots: ["size-1 blur-[0.5px]", "size-0.75 blur-[0.5px]", "size-1.25 blur-[0.5px]"],
    flakes: [
      "left-[2%] [--snow-time:15s] [--snow-delay:-3.2s]",
      "left-[8.5%] [--snow-time:17s] [--snow-delay:-11.4s] max-sm:hidden",
      "left-[13%] [--snow-time:14s] [--snow-delay:-7.9s]",
      "left-[21%] [--snow-time:16.5s] [--snow-delay:-1.3s] max-sm:hidden",
      "left-[26.5%] [--snow-time:13.5s] [--snow-delay:-9.6s]",
      "left-[33%] [--snow-time:18s] [--snow-delay:-14.2s] max-sm:hidden",
      "left-[38%] [--snow-time:15.5s] [--snow-delay:-5.1s]",
      "left-[46%] [--snow-time:14.5s] [--snow-delay:-12.7s] max-sm:hidden",
      "left-[51.5%] [--snow-time:16s] [--snow-delay:-2.4s]",
      "left-[57%] [--snow-time:17.5s] [--snow-delay:-8.8s] max-sm:hidden",
      "left-[64%] [--snow-time:13s] [--snow-delay:-6.3s]",
      "left-[69.5%] [--snow-time:15s] [--snow-delay:-13.1s] max-sm:hidden",
      "left-[76%] [--snow-time:16.5s] [--snow-delay:-0.7s]",
      "left-[82%] [--snow-time:14s] [--snow-delay:-10.5s] max-sm:hidden",
      "left-[88.5%] [--snow-time:17s] [--snow-delay:-4.6s]",
      "left-[95%] [--snow-time:15.5s] [--snow-delay:-12s]",
    ],
  },
  {
    className: "opacity-75 [--snow-sway:12px]",
    dots: ["size-1.25", "size-1", "size-1.5"],
    flakes: [
      "left-[4.5%] [--snow-time:10.5s] [--snow-delay:-6.1s]",
      "left-[11%] [--snow-time:9s] [--snow-delay:-1.8s] [--snow-drift:-14px]",
      "left-[18%] [--snow-time:11.5s] [--snow-delay:-9.3s] max-sm:hidden",
      "left-[24%] [--snow-time:10s] [--snow-delay:-4.2s]",
      "left-[31.5%] [--snow-time:12s] [--snow-delay:-7.7s] [--snow-drift:-6px] max-sm:hidden",
      "left-[36%] [--snow-time:9.5s] [--snow-delay:-0.9s]",
      "left-[43%] [--snow-time:11s] [--snow-delay:-5.4s] max-sm:hidden",
      "left-[49%] [--snow-time:10.5s] [--snow-delay:-8.6s] [--snow-drift:-16px]",
      "left-[55%] [--snow-time:9s] [--snow-delay:-3.1s] max-sm:hidden",
      "left-[61.5%] [--snow-time:12s] [--snow-delay:-10.4s]",
      "left-[67%] [--snow-time:10s] [--snow-delay:-2.2s] [--snow-drift:-8px] max-sm:hidden",
      "left-[74%] [--snow-time:11.5s] [--snow-delay:-6.9s]",
      "left-[80.5%] [--snow-time:9.5s] [--snow-delay:-4.8s] max-sm:hidden",
      "left-[91%] [--snow-time:10.5s] [--snow-delay:-8.1s] [--snow-drift:-12px]",
    ],
  },
  {
    className: "opacity-95 [--snow-sway:20px] [--snow-drift:24px]",
    dots: ["size-2", "size-2.5", "size-1.75"],
    flakes: [
      "left-[6%] [--snow-time:7s] [--snow-delay:-2.6s]",
      "left-[15%] [--snow-time:8s] [--snow-delay:-5.9s] max-sm:hidden",
      "left-[28%] [--snow-time:6.5s] [--snow-delay:-0.4s]",
      "left-[40%] [--snow-time:7.5s] [--snow-delay:-4.1s] max-sm:hidden",
      "left-[47.5%] [--snow-time:8.5s] [--snow-delay:-7.2s]",
      "left-[59%] [--snow-time:6.5s] [--snow-delay:-3.3s] max-sm:hidden",
      "left-[71%] [--snow-time:7.5s] [--snow-delay:-6.4s]",
      "left-[78%] [--snow-time:8s] [--snow-delay:-1.5s] max-sm:hidden",
      "left-[86%] [--snow-time:7s] [--snow-delay:-5.1s]",
      "left-[97%] [--snow-time:6.5s] [--snow-delay:-2.9s] [--snow-drift:-20px]",
    ],
  },
];
