/**
 * Click-tracking attributes for every clickable control on /trade-validator.
 * Same scheme as /brand and /mifx-priority.
 *
 *   id    → unique per element; GTM matches it with the built-in "Click ID" variable.
 *   label → rendered as aria-label; must start with the visible text (WCAG 2.5.3).
 *
 * The menu is rendered twice (desktop/tablet sidebar and phone sticky bar), so
 * its ids carry the placement: btn-menu-{sidebar|bar}-{section}.
 * The Framer page set no clickTrackingId on any control, so there are no legacy ids.
 */

export type TrackTarget = { id: string; label: string };

export function track(target: TrackTarget) {
  return { id: target.id, "aria-label": target.label } as const;
}

export const tracking = {
  logo: { id: "btn-logo-home", label: "MIFX — halaman utama Trade" },
  menu: (placement: "sidebar" | "bar", section: string, label: string) => ({
    id: `btn-menu-${placement}-${section}`,
    label: `${label}: lompat ke bagian`,
  }),
  cta: (asset: string, assetName: string) => ({
    id: `btn-cta-trade-${asset}`,
    label: `Trading Sekarang: buka chart ${assetName} di aplikasi MIFX`,
  }),
};
