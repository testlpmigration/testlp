import { cacheLife, cacheTag } from "next/cache";

export type FundamentalAnalysis = {
  title: string;
  /** ISO date, YYYY-MM-DD (WIB) */
  date: string;
  /** HH:mm (WIB) */
  time: string;
  /** Paragraphs, plain text */
  body: string[];
};

export const fundamentalTag = (asset: string) => `fundamental:${asset}`;

/**
 * The article behind "Analisis Fundamental".
 *
 * In Framer this was a one-item CMS collection edited by hand twice a day.
 * By default it is read from src/content/fundamental/<asset>.json (edit + deploy).
 * Set FUNDAMENTAL_API_URL (e.g. https://cms.example.com/fundamental/{asset}) to
 * fetch it instead; the result is cached for minutes and can be refreshed at once
 * through POST /api/revalidate?tag=fundamental:<asset>.
 */
export async function getFundamentalAnalysis(
  asset: string,
): Promise<FundamentalAnalysis | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(fundamentalTag(asset));

  const api = process.env.FUNDAMENTAL_API_URL;
  if (api) {
    try {
      const res = await fetch(api.replace("{asset}", encodeURIComponent(asset)));
      if (res.ok) return (await res.json()) as FundamentalAnalysis;
      console.error(`[fundamental] ${asset}: HTTP ${res.status}, using bundled copy`);
    } catch (err) {
      console.error(`[fundamental] ${asset}: fetch failed, using bundled copy`, err);
    }
  }

  try {
    const mod = await import(`@/content/fundamental/${asset}.json`);
    return mod.default as FundamentalAnalysis;
  } catch {
    return null;
  }
}

const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

/** "2026-11-16" → "16 Nov 2026" (Framer's date format, Indonesian month names) */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}
