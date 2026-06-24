import styles from "./SourceList.module.css";
import { formatCalendarDate } from "@/lib/dates";
import type { SourceInfo } from "@/types";

function IconOfficial() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 22V11l9-9 9 9v11" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

function IconNews() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

function IconCommunity() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const TYPE_ICON: Record<SourceInfo["type"], React.ReactNode> = {
  official: <IconOfficial />,
  news: <IconNews />,
  community: <IconCommunity />,
};

interface SourceListProps {
  sources: SourceInfo[];
  lastChecked: string;
}

export function SourceList({ sources, lastChecked }: SourceListProps) {
  return (
    <section className={styles.section} aria-labelledby="sources-heading">
      <h2 className={styles.heading} id="sources-heading">
        Sources &amp; Links
      </h2>

      <ul className={styles.list}>
        {sources.map((s) => (
          <li key={s.url} className={styles.item}>
            <span className={styles.itemLeft}>
              <span className={styles.typeIcon} aria-label={s.type}>
                {TYPE_ICON[s.type]}
              </span>
              <span className={styles.label}>{s.label}</span>
            </span>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={`${s.label} - opens in new tab`}
            >
              Visit
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{display: "inline", verticalAlign: "middle", marginLeft: "4px"}}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <p className={styles.disclaimer}>
        Last checked: {formatCalendarDate(lastChecked)} · Information is subject to
        change. Always check official sources before you go.
      </p>
    </section>
  );
}
