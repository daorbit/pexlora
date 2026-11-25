"use client";

import dynamic from "next/dynamic";
import { useChristmasIntro } from "@/hooks/useChristmasIntro";

const ChristmasIntro = dynamic(() => import("./ChristmasIntro").then((module) => module.ChristmasIntro), { ssr: false });

export function ChristmasIntroHost() {
  const playing = useChristmasIntro();
  return playing ? <ChristmasIntro /> : null;
}
