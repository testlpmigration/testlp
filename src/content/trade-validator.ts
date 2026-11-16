/**
 * Copy, links and embed config for /trade-validator/[asset].
 * Framer only published one asset (Gold); add another entry here to get
 * /trade-validator/<slug>/ — plus src/content/fundamental/<slug>.json.
 */

export type SectionId =
  | "analisis-fundamental"
  | "market-sentiment"
  | "analisis-teknikal"
  | "moving-averages";

export const menu: { id: SectionId; label: string }[] = [
  { id: "analisis-fundamental", label: "Analisis Fundamental" },
  { id: "market-sentiment", label: "Sentiment Score" },
  { id: "analisis-teknikal", label: "Analisis Teknikal" },
  { id: "moving-averages", label: "Moving Averages" },
];

export type AssetConfig = {
  slug: string;
  name: string;
  /** TradingView symbol for the technical-analysis widget */
  tradingViewSymbol: string;
  /** Deep link into the MIFX app chart (quick trade) */
  tradeHref: string;
  description: string;
  fundamentalIntro: string;
  sentimentIntro: string;
  technicalIntro: string;
  movingAveragesIntro: string;
};

export const assets: Record<string, AssetConfig> = {
  gold: {
    slug: "gold",
    name: "Gold",
    tradingViewSymbol: "OANDA:XAUUSD",
    tradeHref:
      "mxid://chart?source=quicktrade&symbol=XAUUSD.,XAUUSD.p,XAUUSD.m,XAUUSD.i,XAUUSDv,XAUUSD_,XAUUSDs,XAUUSD",
    description:
      "Ambil keputusan trading Gold lebih yakin dengan kumpulan Analisis Fundamental, Analisis Teknikal, Sentiment Score, dan Moving Averages, yang terangkum dalam satu halaman.",
    fundamentalIntro:
      "Pahami faktor-faktor fundamental yang mempengaruhi pergerakan Gold melalui analisis yang diperbarui 2 kali sehari (Senin-Jumat), setiap pukul 13.00 WIB dan 18.00 WIB.",
    sentimentIntro:
      "Validasi keputusan trading Gold dengan melihat arah market berdasarkan sentimen pemberitaan global.",
    technicalIntro:
      "Validasi keputusan trading Gold dengan rangkuman pergerakan harga dari indikator Oscillator dan Moving Average, berdasarkan timeframe yang dapat Anda pilih.",
    movingAveragesIntro:
      "Lihat detail dari indikator Moving Averages guna membantu Anda menganalisis potensi pergerakan harga secara lebih mendalam.",
  },
};

export const common = {
  homeHref: "https://trade.mifx.com/",
  menuLabel: "Menu",
  sentimentSrc: "https://mifx.com/sentiment",
  movingAveragesSrc: "https://mifx.com/moving-average",
  ctaLabel: "Trading Sekarang",
  publishedLabel: "Dirilis pada",
  timezone: "WIB",
  disclaimerTitle: "Disclaimer:",
  disclaimer:
    "Materi untuk referensi saja dan bukan rekomendasi melakukan transaksi. Transaksi Perdagangan Berjangka Komoditi memiliki Peluang Keuntungan dan Risiko Kerugian yang Tinggi. MIFX Berizin dan diawasi oleh Bappebti dan BI, serta OJK untuk produk derivatif keuangan dengan aset yang mendasari berupa Efek.",
};
