import { common, type AssetConfig } from "@/content/trade-validator";
import type { FundamentalAnalysis } from "@/lib/fundamental";
import { formatDate } from "@/lib/fundamental";
import { Source, SectionHeader } from "./section-header";
import { TradingViewTechnicalAnalysis } from "./tradingview-widget";

/* Phone: sticky menu bar is 60px + 1px line, so anchors land below it. */
const anchor = "scroll-mt-[61px] tablet:scroll-mt-0";

export function FundamentalSection({
  asset,
  article,
}: {
  asset: AssetConfig;
  article: FundamentalAnalysis | null;
}) {
  return (
    <section
      id="analisis-fundamental"
      aria-labelledby="h-fundamental"
      className={anchor}
    >
      <div className="max-tablet:[&>div]:gap-4">
        <SectionHeader title="Analisis Fundamental" headingId="h-fundamental">
          {asset.fundamentalIntro}
        </SectionHeader>
      </div>
      {article ? (
        <article className="mt-5 pb-2.5 tablet:mt-4">
          <h3 className="t-article">{article.title}</h3>
          <p className="mt-[5px] flex flex-wrap gap-x-1 font-text text-[16px] leading-[24px] text-ink-500 tablet:mt-2.5">
            <span>{common.publishedLabel}</span>
            <span>
              <time dateTime={`${article.date}T${article.time}+07:00`}>
                {formatDate(article.date)}
              </time>
              ,
            </span>
            <span>{article.time}</span>
            <span>{common.timezone}</span>
          </p>
          <div className="prose-tv t-body mt-5 tablet:mt-1">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      ) : null}
    </section>
  );
}

export function SentimentSection({ asset }: { asset: AssetConfig }) {
  return (
    <section
      id="market-sentiment"
      aria-labelledby="h-sentiment"
      className={`${anchor} flex h-[448px] flex-col gap-4 pt-5 pb-2.5 tablet:h-auto`}
    >
      <SectionHeader title="Sentiment Score" headingId="h-sentiment">
        {asset.sentimentIntro}
      </SectionHeader>
      <iframe
        src={common.sentimentSrc}
        title={`Sentiment Score ${asset.name}`}
        loading="lazy"
        className="min-h-0 w-full flex-1 border-0 tablet:h-[238px] tablet:flex-none desktop:h-[379px]"
      />
      <p className="t-note">
        Diperbarui setiap hari (Senin-Jumat) pada rentang waktu 19.30 - 21.30
        WIB, bersumber dari <Source>Trading Central.</Source>
      </p>
    </section>
  );
}

export function TechnicalSection({ asset }: { asset: AssetConfig }) {
  return (
    <section
      id="analisis-teknikal"
      aria-labelledby="h-teknikal"
      className={`${anchor} flex flex-col gap-4 pt-5 pb-2.5`}
    >
      <SectionHeader title="Analisis Teknikal" headingId="h-teknikal">
        {asset.technicalIntro}
      </SectionHeader>
      <div className="h-[1153px] tablet:h-[850px]">
        <TradingViewTechnicalAnalysis symbol={asset.tradingViewSymbol} />
      </div>
      <div className="prose-tv t-body">
        <p>
          Angka pada momentum meter menunjukkan jumlah indikator yang mendukung
          sinyal Sell/Neutral/Buy.
        </p>
        <p>
          Contoh: Sell 3, Neutral 0, Buy 8. Artinya, indikator paling banyak
          mengarah ke Buy, sehingga sinyal cenderung ke Buy.
          <br />
          <br />
          Diperbarui secara real-time, bersumber dari <Source>TradingView</Source>.
        </p>
      </div>
    </section>
  );
}

export function MovingAveragesSection({ asset }: { asset: AssetConfig }) {
  return (
    <section
      id="moving-averages"
      aria-labelledby="h-ma"
      className={`${anchor} flex flex-col gap-[14px] pt-5 pb-[30px] tablet:gap-4`}
    >
      <SectionHeader title="Moving Averages" headingId="h-ma">
        {asset.movingAveragesIntro}
      </SectionHeader>
      <iframe
        src={common.movingAveragesSrc}
        title={`Moving Averages ${asset.name}`}
        loading="lazy"
        className="h-[1261px] w-full rounded-lg border-0 tablet:h-[1114px] tablet:rounded-none"
      />
      <p className="font-text text-[16px] leading-[24px] text-ink-500">
        Diperbarui secara real-time, bersumber dari <Source>TradingView.</Source>
      </p>
    </section>
  );
}
