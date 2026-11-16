import { IconSvg, type IconProps } from "@/components/icons/IconSvg";
import { PhotoFrame } from "@/components/icons/PhotoFrame";

export function AltTextIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <PhotoFrame />
      <path d="M15 16.5h6" />
      <path d="M15 20h4" />
    </IconSvg>
  );
}
