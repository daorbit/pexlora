import { IconSvg, type IconProps } from "@/components/icons/IconSvg";
import { PhotoFrame } from "@/components/icons/PhotoFrame";

export function RemoveMetadataIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <PhotoFrame />
      <circle cx="18" cy="18" r="3.75" />
      <path d="m15.4 20.6 5.2-5.2" />
    </IconSvg>
  );
}
