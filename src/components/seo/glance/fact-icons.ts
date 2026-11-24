import {
  Building2,
  CircleAlert,
  Clock,
  Eraser,
  Files,
  HardDrive,
  Layers,
  LayoutGrid,
  ShieldCheck,
  Type,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { FactIcon } from "@/content/facts";

export const factIcons: Record<FactIcon, LucideIcon> = {
  price: Wallet,
  tools: LayoutGrid,
  formats: Files,
  metadata: Eraser,
  privacy: ShieldCheck,
  size: HardDrive,
  batch: Layers,
  saved: Clock,
  text: Type,
  limits: CircleAlert,
  maker: Building2,
};
