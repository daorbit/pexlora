import { IconSvg, type IconProps } from "@/components/icons/IconSvg";

export function CompressImageIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13.5h6" />
      <path d="m10 9.5 2 2 2-2" />
      <path d="m10 19 2-2 2 2" />
    </IconSvg>
  );
}
