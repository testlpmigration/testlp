"use client";

import { useEffect, useRef } from "react";

const SCRIPT =
  "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";

/**
 * TradingView "Technical Analysis" widget — same config as the Framer embed.
 * Height 850 (tablet/desktop) or 1150 (phone, < 810px); both include the
 * 32px "Track all markets on TradingView" credit line.
 */
export function TradingViewTechnicalAnalysis({ symbol }: { symbol: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const phone = window.matchMedia("(max-width: 809.98px)").matches;

    host.innerHTML =
      '<div class="tradingview-widget-container__widget"></div>' +
      '<div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>';

    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      interval: "1h",
      width: "100%",
      isTransparent: false,
      height: phone ? "1150" : "850",
      symbol,
      showIntervalTabs: true,
      displayMode: "multiple",
      locale: "en",
      colorTheme: "light",
    });
    host.appendChild(script);

    return () => {
      host.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div
      ref={ref}
      className="tradingview-widget-container h-full w-full"
      aria-label="Analisis teknikal TradingView"
    />
  );
}
