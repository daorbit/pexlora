import { IconSvg, type IconProps } from "@/components/icons/IconSvg";
import { PhotoFrame } from "@/components/icons/PhotoFrame";

export function EditMetadataIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <PhotoFrame />
      <path d="M21.4 14.6a1.55 1.55 0 0 0-2.2 0L14.5 19.3V21.5h2.2l4.7-4.7a1.55 1.55 0 0 0 0-2.2z" />
    </IconSvg>
  );
}
