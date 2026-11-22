import { siteConfig } from "@/config/site";
import { ogCopy } from "@/content/og";
import { ogStyles } from "@/components/og/og-styles";

type OgToolImageProps = {
  name: string;
  description: string;
  iconData: string;
  markData: string;
};

export function OgToolImage({ name, description, iconData, markData }: OgToolImageProps) {
  return (
    <div style={ogStyles.frame}>
      <div style={ogStyles.body}>
        <img src={iconData} alt="" width={132} height={132} style={ogStyles.icon} />
        <div style={ogStyles.name}>{name}</div>
        <div style={ogStyles.description}>{description}</div>
      </div>
      <div style={ogStyles.footer}>
        <div style={ogStyles.brand}>
          <img src={markData} alt="" width={52} height={52} style={ogStyles.mark} />
          {siteConfig.name}
        </div>
        <div style={ogStyles.badge}>{ogCopy.badge}</div>
      </div>
    </div>
  );
}
