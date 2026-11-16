import { IconSvg, type IconProps } from "@/components/icons/IconSvg";

export function AiDetectorIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <path d="M11.5 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l5 5v2.5" />
      <path d="M8 9h4" />
      <path d="M8 13h3" />
      <circle cx="17" cy="16.5" r="3.25" />
      <path d="m21.5 21-2.2-2.2" />
    </IconSvg>
  );
}
