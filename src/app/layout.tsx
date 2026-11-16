import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import "./globals.css";

// Framer used Inter (400/500/600/700); next/font self-hosts it — no Google request at runtime.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/*
 * Framer set the 16px body copy in its own "Inter Variable" build (Latin subset),
 * which runs ~1% narrower than Google's Inter — enough to change line breaks.
 * Self-hosted here so paragraphs wrap exactly like the Framer page. (Inter: OFL.)
 */
const interText = localFont({
  src: "../assets/fonts/inter-variable-latin.woff2",
  variable: "--font-inter-text",
  weight: "400",
  display: "swap",
});

/**
 * "Live" switch. On Vercel, every deployment is treated as a test (no GTM,
 * noindex) until NEXT_PUBLIC_SITE_LIVE=true is set for the production
 * environment — so test URLs never pollute analytics or search results.
 * Other hosts default to live, as before.
 */
const isLive = process.env.VERCEL
  ? process.env.NEXT_PUBLIC_SITE_LIVE === "true"
  : true;
/**
 * GTM also loads when NEXT_PUBLIC_GTM_ENABLED=true — use it on a Vercel test
 * deployment to check click tracking in GTM Preview while the page stays noindex.
 */
const gtmEnabled = isLive || process.env.NEXT_PUBLIC_GTM_ENABLED === "true";
const GTM_ID = gtmEnabled
  ? (process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-TG7GVFT")
  : "";
/** Framer's built-in Google Analytics 4 property for trade.mifx.com (loaded alongside GTM, as before) */
const GA_ID = gtmEnabled
  ? (process.env.NEXT_PUBLIC_GA_ID ?? "G-1BJ3JM12C6")
  : "";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://trade.mifx.com",
  ),
  title: "Trade Validator",
  robots: isLive
    ? { index: true, follow: true, "max-image-preview": "large" }
    : { index: false, follow: false },
  other: { google: "notranslate" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" translate="no" className={`${inter.variable} ${interText.variable} antialiased`}>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body className="min-h-dvh">{children}</body>
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
