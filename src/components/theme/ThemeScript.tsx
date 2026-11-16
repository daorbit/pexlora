import Script from "next/script";
import { themeInitScript } from "@/lib/theme";

export function ThemeScript() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {themeInitScript}
    </Script>
  );
}
