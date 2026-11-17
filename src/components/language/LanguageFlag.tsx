import Image from "next/image";
import { FLAG_CDN } from "@/config/languages";

export function LanguageFlag({ code }: { code: string }) {
  return (
    <Image
      src={`${FLAG_CDN}/${code}.svg`}
      alt=""
      width={20}
      height={15}
      unoptimized
      loading="lazy"
      className="h-[15px] w-5 shrink-0 rounded-[3px] object-cover ring-1 ring-separator"
    />
  );
}
