import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import logo from "@/assets/images/logo-mifx.png";
import { assets, common } from "@/content/trade-validator";
import { track, tracking } from "@/content/tracking-ids";
import { getFundamentalAnalysis } from "@/lib/fundamental";
import { BarMenu, SidebarMenu } from "@/components/trade-validator/menu";
import { Divider } from "@/components/trade-validator/section-header";
import {
  FundamentalSection,
  MovingAveragesSection,
  SentimentSection,
  TechnicalSection,
} from "@/components/trade-validator/sections";
import { Disclaimer, TradeCta } from "@/components/trade-validator/cta";

export function generateStaticParams() {
  return Object.keys(assets).map((asset) => ({ asset }));
}

export async function generateMetadata({
  params,
}: PageProps<"/trade-validator/[asset]">): Promise<Metadata> {
  const asset = assets[(await params).asset];
  if (!asset) return {};
  const url = `/trade-validator/${asset.slug}/`;
  return {
    title: "Trade Validator",
    description: asset.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: "Trade Validator",
      description: asset.description,
      images: [{ url: "/og-image.jpg", width: 2400, height: 1256 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Trade Validator",
      description: asset.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function TradeValidatorPage({
  params,
}: PageProps<"/trade-validator/[asset]">) {
  const asset = assets[(await params).asset];
  if (!asset) notFound();
  const article = await getFundamentalAnalysis(asset.slug);

  return (
    <div className="flex flex-col tablet:grid tablet:grid-cols-[226px_66%] tablet:grid-rows-[auto_1fr] desktop:grid-cols-[314px_800px]">
      {/* Sidebar (tablet/desktop) */}
      <aside className="hidden tablet:sticky tablet:top-0 tablet:row-span-2 tablet:flex tablet:flex-col tablet:gap-[50px] tablet:self-start tablet:px-2.5 tablet:pt-[30px] tablet:pb-px desktop:px-[60px]">
        <a
          href={common.homeHref}
          {...track(tracking.logo)}
          className="self-start"
        >
          <Image src={logo} alt="" width={97} height={20} priority />
        </a>
        <SidebarMenu />
      </aside>

      {/* Hero */}
      <header className="tablet:col-start-2 tablet:pt-8">
        <div className="flex flex-col gap-1 p-5 tablet:p-0">
          <h1 className="t-title">Trade Validator {asset.name}</h1>
          <p className="t-small text-ink-700 desktop:font-text desktop:text-[16px] desktop:leading-[24px] desktop:font-normal">
            {asset.description}
          </p>
        </div>
        <div className="tablet:mt-7">
          <Divider />
        </div>
      </header>

      <BarMenu />

      <main className="flex flex-col gap-7 px-5 pt-8 pb-[92px] tablet:col-start-2 tablet:px-0 tablet:pt-7 tablet:pb-8">
        <FundamentalSection asset={asset} article={article} />
        <Divider />
        <SentimentSection asset={asset} />
        <Divider />
        <TechnicalSection asset={asset} />
        <Divider thick />
        <MovingAveragesSection asset={asset} />
        <TradeCta asset={asset} />
        <Disclaimer />
      </main>
    </div>
  );
}
