import { ShieldCheck } from "lucide-react";
import { proofIcons } from "@/config/social-proof";
import { proofCopy } from "@/content/social-proof";
import { toolsByPath } from "@/lib/file-handling/tool-paths";
import { getFilesTotal } from "@/lib/stats/social-proof";
import { formatCount } from "@/lib/utils/format-count";
import { IconStack } from "@/components/ui/IconStack";
import { CountProof } from "@/components/social-proof/CountProof";
import { SiteProof } from "@/components/social-proof/SiteProof";

const deviceTools = toolsByPath().device.length;

export async function HeroProof() {
  const files = await getFilesTotal();
  const items = [
    ...(files === null ? [] : [{ id: "files", content: <CountProof value={formatCount(files)} label={proofCopy.filesLabel} /> }]),
    { id: "tools", content: <CountProof {...proofCopy.tools} visual={<IconStack srcs={proofIcons} />} /> },
    { id: "device", content: <CountProof value={proofCopy.device.value(deviceTools)} label={proofCopy.device.label} icon={ShieldCheck} /> },
  ];

  return <SiteProof items={items} />;
}
