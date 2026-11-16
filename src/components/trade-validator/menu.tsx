import { cn } from "@/lib/utils";
import { menu } from "@/content/trade-validator";
import { track, tracking } from "@/content/tracking-ids";

/**
 * Framer "Variant 1" menu button: #f6f6f9 → hover #caedd6 → pressed #00a562/white,
 * on a 0.4s spring (bounce 0.2).
 */
const button =
  "flex shrink-0 items-center rounded-lg bg-mist text-[12px] leading-[14.4px] font-medium whitespace-nowrap text-ink-900 transition-colors duration-400 ease-spring hover:bg-mint active:bg-green-500 active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500";

/** Desktop/tablet: stacked buttons in the sticky sidebar */
export function SidebarMenu() {
  return (
    <nav aria-label="Menu" className="flex flex-col gap-2.5 px-2.5 desktop:px-0">
      <p className="text-[16px] leading-[24px] font-semibold text-ink-900">Menu</p>
      <ul className="flex flex-col gap-2.5">
        {menu.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              {...track(tracking.menu("sidebar", item.id, item.label))}
              className={cn(button, "h-[34px] w-full p-2.5")}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Phone: one horizontally scrolling row, sticky under the hero */
export function BarMenu() {
  return (
    <nav
      aria-label="Menu"
      className="sticky top-0 z-10 border-b border-mist bg-white tablet:hidden"
    >
      <ul className="flex h-[60px] items-center gap-2.5 overflow-x-auto pr-[30px] pl-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menu.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              {...track(tracking.menu("bar", item.id, item.label))}
              className={cn(button, "h-10 px-5")}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
