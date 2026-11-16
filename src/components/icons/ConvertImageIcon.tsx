import { IconSvg, type IconProps } from "@/components/icons/IconSvg";

export function ConvertImageIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
      <path d="M14.5 5H17a3 3 0 0 1 3 3v2" />
      <path d="m18 8.2 2 2 2-2" />
      <path d="M9.5 19H7a3 3 0 0 1-3-3v-2" />
      <path d="m2 15.8 2-2 2 2" />
    </IconSvg>
  );
}
