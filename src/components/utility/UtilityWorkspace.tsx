import dynamic from "next/dynamic";
import type { UtilityToolSlug } from "@/config/utility-tools";

const LinkCleanerWorkspace = dynamic(() => import("@/components/utility/LinkCleanerWorkspace").then((module) => module.LinkCleanerWorkspace));
const PiiRedactorWorkspace = dynamic(() => import("@/components/utility/PiiRedactorWorkspace").then((module) => module.PiiRedactorWorkspace));
const ZipCreator = dynamic(() => import("@/components/utility/zip/ZipCreator").then((module) => module.ZipCreator));
const ZipExtractor = dynamic(() => import("@/components/utility/zip/ZipExtractor").then((module) => module.ZipExtractor));

export function UtilityWorkspace({ slug }: { slug: UtilityToolSlug }) {
  switch (slug) {
    case "link-cleaner":
      return <LinkCleanerWorkspace />;
    case "remove-personal-info":
      return <PiiRedactorWorkspace />;
    case "zip-files":
      return <ZipCreator />;
    case "unzip-files":
      return <ZipExtractor />;
  }
}
