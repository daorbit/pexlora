import { routes } from "@/config/site";
import { formatKilobytes } from "@/lib/utils/format-bytes";

export type CompressTarget = { slug: string; kb: number; label: string };

const toTarget = (kb: number): CompressTarget => ({
  slug: formatKilobytes(kb).replace(" ", "").toLowerCase(),
  kb,
  label: formatKilobytes(kb),
});

export const COMPRESS_TARGET_PRESETS_KB = [20, 50, 100, 200, 500, 1024] as const;

export const DEFAULT_COMPRESS_TARGET_KB = 100;

export const COMPRESS_TARGET_PAGES_KB = [10, 15, 20, 30, 40, 50, 100, 150, 200, 300, 500, 1024, 2048] as const;

export const compressTargets: CompressTarget[] = COMPRESS_TARGET_PAGES_KB.map(toTarget);

export const featuredCompressTargets: CompressTarget[] = COMPRESS_TARGET_PRESETS_KB.map(toTarget);

export const defaultCompressTarget = toTarget(DEFAULT_COMPRESS_TARGET_KB);

export function getCompressTarget(slug: string) {
  return compressTargets.find((target) => target.slug === slug);
}

export const compressTargetIconSrc = "/icons/tools/compress-to-size.svg";

export const compressTargetPath =(slug: string) => `${routes.compressTo}/${slug}`;
