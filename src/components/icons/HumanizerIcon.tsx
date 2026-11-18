import { IconSvg, type IconProps } from "@/components/icons/IconSvg";

export function HumanizerIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1.4-4.6A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M9 13a3.6 3.6 0 0 0 6 0" />
      <path d="M9.5 9.2h.01" />
      <path d="M14.5 9.2h.01" />
    </IconSvg>
  );
}
