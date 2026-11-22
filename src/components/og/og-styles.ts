import type { CSSProperties } from "react";
import { brandColors } from "@/config/brand";

const ink = "#10120d";
const muted = "#5f6359";

export const ogStyles = {
  frame: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "72px 80px",
    backgroundColor: brandColors.pearl,
    backgroundImage: "radial-gradient(circle, #d9d6cb 1.6px, transparent 1.6px)",
    backgroundSize: "30px 30px",
    fontFamily: "Liberation Sans",
    color: ink,
  },
  body: { display: "flex", flexDirection: "column", gap: 28 },
  icon: { width: 132, height: 132 },
  name: { fontSize: 76, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05, maxWidth: 1000 },
  description: { fontSize: 31, lineHeight: 1.4, color: muted, maxWidth: 940 },
  footer: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand: { display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700, letterSpacing: -1 },
  mark: { width: 52, height: 52 },
  badge: {
    display: "flex",
    padding: "14px 26px",
    borderRadius: 16,
    backgroundColor: brandColors.lime,
    fontSize: 27,
    fontWeight: 700,
  },
} satisfies Record<string, CSSProperties>;
