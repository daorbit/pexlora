import Image from "next/image";
import { offerCopy } from "@/content/offers";
import { OfferSavingChip } from "@/components/offer/OfferSavingChip";

const wagonClass = "h-full w-auto max-w-none shrink-0";

function TrainCar({ src, width }: { src: string; width: number }) {
  return <Image src={src} alt="" width={width} height={200} unoptimized loading="eager" className={wagonClass} />;
}

function SignWagon() {
  return (
    <div className="relative h-full shrink-0">
      <TrainCar src="/christmas/wagon-sign.svg" width={300} />
      <div className="theme-dark absolute inset-x-[7%] bottom-[30%] flex flex-col items-center gap-1 rounded-xl border-2 border-festive-gold bg-festive-pine px-2 py-2 text-center whitespace-nowrap text-foreground sm:gap-1.5 sm:py-3">
        <span className="text-[13px] leading-tight font-bold tracking-[-0.02em] sm:text-[20px] lg:text-[24px]">
          {offerCopy.greeting}
        </span>
        <span className="flex items-center gap-1.5 text-[10.5px] font-semibold sm:text-[13px]">
          <OfferSavingChip />
          {offerCopy.scopeShort}
        </span>
      </div>
    </div>
  );
}

export function ChristmasTrain() {
  return (
    <div className="flex h-30 w-max animate-train-run items-end sm:h-40 lg:h-50">
      <TrainCar src="/christmas/wagon-gifts.svg" width={200} />
      <TrainCar src="/christmas/wagon-photos.svg" width={200} />
      <SignWagon />
      <TrainCar src="/christmas/engine.svg" width={292} />
    </div>
  );
}
