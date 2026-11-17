import { routes } from "@/config/site";
import { statusCopy } from "@/content/status";
import { ButtonLink } from "@/components/ui/Button";
import { NotFoundMark } from "@/components/feedback/NotFoundMark";
import { PopularTools } from "@/components/feedback/PopularTools";
import { StatusScreen } from "@/components/feedback/StatusScreen";

export function NotFoundContent() {
  const copy = statusCopy.notFound;

  return (
    <StatusScreen
      visual={<NotFoundMark />}
      title={copy.title}
      body={copy.body}
      actions={
        <ButtonLink href={routes.home} variant="ink" size="lg" arrow>
          {copy.home}
        </ButtonLink>
      }
      footer={<PopularTools />}
    />
  );
}
