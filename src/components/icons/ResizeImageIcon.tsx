import { IconSvg, type IconProps } from "@/components/icons/IconSvg";

export function ResizeImageIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <path d="M3 10.5V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.6" />
      <path d="m13.5 10.5 4-4" />
      <path d="M13.5 6.5h4v4" />
    </IconSvg>
  );
}
