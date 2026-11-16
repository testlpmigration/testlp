import type { ReactNode } from "react";

/**
 * Section heading + intro. Tablet/desktop: heading sits in a navy pill;
 * phone: a plain 20px heading. Gap to the intro: 10px.
 */
export function SectionHeader({
  title,
  children,
  headingId,
}: {
  title: string;
  children: ReactNode;
  headingId: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="tablet:self-start tablet:rounded-full tablet:bg-ink-900 tablet:px-[30px] tablet:py-[5px]">
        <h2 id={headingId} className="t-section">
          {title}
        </h2>
      </div>
      <p className="t-body">{children}</p>
    </div>
  );
}

export function Divider({ thick = false }: { thick?: boolean }) {
  return (
    <hr
      className={
        thick
          ? "h-0.5 rounded-2xl border-0 bg-mist"
          : "h-px rounded-2xl border-0 bg-mist"
      }
    />
  );
}

/** Coloured source name (Framer: a green span, not a link) */
export function Source({ children }: { children: ReactNode }) {
  return <span className="text-green-500">{children}</span>;
}
