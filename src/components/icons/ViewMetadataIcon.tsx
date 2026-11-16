import { IconSvg, type IconProps } from "@/components/icons/IconSvg";
import { PhotoFrame } from "@/components/icons/PhotoFrame";

export function ViewMetadataIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <PhotoFrame />
      <circle cx="17" cy="17" r="3.25" />
      <path d="m21.5 21.5-2.2-2.2" />
    </IconSvg>
  );
}
