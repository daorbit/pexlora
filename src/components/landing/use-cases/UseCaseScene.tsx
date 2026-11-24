import type { ReactNode } from "react";
import type { UseCaseSceneId } from "@/content/social-proof";
import { AltTextScene, FormScene, MergeScene } from "@/components/landing/use-cases/PaperScenes";
import { CompressScene, TravelScene, ViewerScene } from "@/components/landing/use-cases/PhotoScenes";

const scenes: Record<UseCaseSceneId, () => ReactNode> = {
  travel: TravelScene,
  form: FormScene,
  viewer: ViewerScene,
  merge: MergeScene,
  compress: CompressScene,
  altText: AltTextScene,
};

export function UseCaseScene({ id }: { id: UseCaseSceneId }) {
  const Scene = scenes[id];
  return <Scene />;
}
