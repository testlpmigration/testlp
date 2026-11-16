import { common, type AssetConfig } from "@/content/trade-validator";
import { track, tracking } from "@/content/tracking-ids";

/** "Trading Sekarang" — opens the asset chart in the MIFX app (mxid:// deep link) */
export function TradeCta({ asset }: { asset: AssetConfig }) {
  return (
    <a
      href={asset.tradeHref}
      {...track(tracking.cta(asset.slug, asset.name))}
      className="flex w-full items-center justify-center rounded-xl bg-green-500 px-8 py-4 text-[16px] leading-[24px] font-bold tracking-[-0.16px] text-white transition-colors duration-400 ease-spring hover:bg-green-600 active:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 desktop:text-[18px] desktop:leading-[27px] desktop:tracking-[-0.18px]"
    >
      {common.ctaLabel}
    </a>
  );
}

export function Disclaimer() {
  return (
    <aside className="t-small flex flex-col gap-0.5">
      <p className="text-ink-900">{common.disclaimerTitle}</p>
      <p className="text-ink-500">{common.disclaimer}</p>
    </aside>
  );
}
