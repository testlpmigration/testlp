# Trade Validator — Gold (migrated from Framer)

Hand-coded rebuild of **https://trade.mifx.com/trade-validator/gold/** (previously published from Framer).
Same stack and conventions as the `/brand`, `/forex` and `/mifx-priority` rebuilds.

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 · shadcn/ui config (`radix-nova`, Radix) — this page needs no shadcn primitive, so `components/ui` is empty; add one with `npx shadcn add …` when needed |
| Embeds | `mifx.com/sentiment` and `mifx.com/moving-average` iframes, TradingView "Technical Analysis" widget (same config as Framer) |
| Fonts | Inter via `next/font/google` for headings/UI; Framer's own **"Inter Variable"** (Latin) self-hosted via `next/font/local` for 16px body copy — it runs ~1% narrower than Google's Inter, and without it paragraphs wrap differently from the Framer page |
| Analytics | Google Tag Manager `GTM-TG7GVFT` + GA4 `G-1BJ3JM12C6` via `@next/third-parties` (both were on the Framer page) |
| Output | `/trade-validator/gold/` is prerendered; the fundamental article is a cached component (see "Analisis Fundamental data") |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /trade-validator/gold/
npm run build && npm start
npm run lint
```

Requires Node.js ≥ 20.9. URLs keep Framer's trailing slash (`trailingSlash: true`).

### Environment (all optional)

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_LIVE` | unset | **Vercel only.** Until `true`, Vercel deployments are test builds: GTM/GA off + `noindex`. Set it on Production at go-live. |
| `NEXT_PUBLIC_GTM_ENABLED` | unset | `true` loads GTM/GA on a Vercel test deployment (for GTM Preview) while it stays `noindex`. |
| `NEXT_PUBLIC_GTM_ID` | `GTM-TG7GVFT` | GTM container |
| `NEXT_PUBLIC_GA_ID` | `G-1BJ3JM12C6` | GA4 property Framer loaded directly. If GTM already fires this GA4 tag, set it to an empty string to avoid double page views. |
| `NEXT_PUBLIC_SITE_URL` | `https://trade.mifx.com` | `metadataBase` for canonical / OG URLs |
| `FUNDAMENTAL_API_URL` | unset | Fetch the fundamental article from an API instead of the bundled JSON. `{asset}` is replaced by the slug. |
| `REVALIDATE_SECRET` | unset | Enables `POST /api/revalidate` (see below). |

## Page structure

```
src/
  app/
    layout.tsx                        fonts, GTM + GA4, base metadata, viewport
    globals.css                       tokens (ink, mist, mint, green), breakpoints, type scale
    icon.png                          favicon (Framer's)
    trade-validator/[asset]/page.tsx  layout grid + metadata (title, description, canonical, OG/Twitter)
    api/revalidate/route.ts           on-demand refresh of the fundamental article
  content/
    trade-validator.ts                ALL copy, menu, links, per-asset config (symbol, app deep link, intros)
    fundamental/gold.json             the "Analisis Fundamental" article (Framer CMS item)
    tracking-ids.ts                   id + aria-label for every clickable control (GTM)
  lib/fundamental.ts                  article loader ('use cache', 'minutes', tag fundamental:<asset>)
  components/trade-validator/
    menu.tsx                          sidebar menu (tablet/desktop) + sticky scrolling bar (phone)
    section-header.tsx                navy label pill / plain phone heading, divider, green source text
    sections.tsx                      Fundamental, Sentiment Score, Analisis Teknikal, Moving Averages
    tradingview-widget.tsx            client component that injects the TradingView script
    cta.tsx                           "Trading Sekarang" + disclaimer
  assets/
    images/logo-mifx.png
    fonts/inter-variable-latin.woff2  Framer's body font (Inter, SIL OFL)
```

## Layout (matches Framer's three breakpoints)

| | Phone `< 810` | Tablet `810–1199` | Desktop `≥ 1200` |
|---|---|---|---|
| Navigation | hero, then a 60px **sticky** horizontal menu bar | sticky sidebar 226px | sticky sidebar 314px |
| Content column | full width, 20px side padding | 66% of the viewport | 800px, left-aligned (not centred, as on Framer) |
| Title | 24/31.92 | 32/40 | 48/51.84 |
| Section heading | plain h2 20/28 | navy pill 16/24 | navy pill 18/27 |
| Sentiment iframe | fills a 448px section | 238px | 379px |
| TradingView widget | 1150px (+3px wrapper) | 850px | 850px |
| Moving Averages iframe | 1261px, radius 8 | 1114px | 1114px |

Menu buttons: `#f6f6f9` → hover `#caedd6` → pressed `#00a562`/white; CTA `#00a562` → hover `#00804b` → pressed `#006339`; both on Framer's 0.4s spring (bounce 0.2) as a CSS `linear()` easing.

## Analisis Fundamental data

On Framer the article was a one-item CMS collection edited twice a day (13.00 and 18.00 WIB). Here:

1. **Default:** edit `src/content/fundamental/gold.json` (`title`, `date` `YYYY-MM-DD`, `time` `HH:mm`, `body` = paragraphs) and redeploy.
2. **API:** set `FUNDAMENTAL_API_URL` to an endpoint returning the same JSON shape. Results are cached (`cacheLife('minutes')`); if the API fails, the bundled JSON is shown.
3. **Instant refresh:** with `REVALIDATE_SECRET` set,
   ```bash
   curl -X POST "https://trade.mifx.com/api/revalidate?tag=fundamental:gold" \
        -H "Authorization: Bearer $REVALIDATE_SECRET"
   ```

The date renders as Framer did ("16 Nov 2026") inside a `<time datetime="…+07:00">`.

## Adding another asset

Add an entry to `assets` in `content/trade-validator.ts` (slug, name, TradingView symbol, `mxid://` deep link, intros) and a `content/fundamental/<slug>.json`. `generateStaticParams` picks it up → `/trade-validator/<slug>/`. Unknown slugs return 404.

## Click tracking (GTM)

| Control | `id` |
|---|---|
| Logo → trade.mifx.com | `btn-logo-home` |
| Sidebar menu (tablet/desktop) | `btn-menu-sidebar-{analisis-fundamental, market-sentiment, analisis-teknikal, moving-averages}` |
| Phone menu bar | `btn-menu-bar-{…same…}` |
| Trading Sekarang | `btn-cta-trade-gold` |

Framer set no `clickTrackingId` on this page, so there are no legacy ids to map.

## Migration notes

- **Parity:** measured against the live page at 360, 390, 600, 809, 810, 1000, 1199, 1200, 1366, 1440 and 1920px. Page height and every section, divider, embed, CTA and disclaimer position match to the pixel, except at exactly 809px, where one TradingView note paragraph wraps one line earlier on Framer (24px).
- **Section anchors:** kept Framer's ids (`#analisis-fundamental`, `#market-sentiment`, `#analisis-teknikal`, `#moving-averages`). On phones the anchors get `scroll-margin-top: 61px` so the sticky menu bar doesn't cover the heading (Framer let it overlap).
- **Headings:** Framer used h3/h4/h5/h6 out of order; now h1 (page) → h2 (sections) → h3 (article), with the same sizes.
- **"Trading Central" / "TradingView"** are green text, not links, exactly as on Framer.
- The `mxid://` CTA only works where the MIFX app is installed, as before.
