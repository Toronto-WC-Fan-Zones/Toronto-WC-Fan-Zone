import styles from "./SourceList.module.css";
import type { SourceInfo } from "@/types";

const TYPE_ICON: Record<SourceInfo["type"], string> = {
  official: "🏛",
  news: "📰",
  community: "👥",
};

interface SourceListProps {
  sources: SourceInfo[];
  lastChecked: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SourceList({ sources, lastChecked }: SourceListProps) {
  return (
    <section className={styles.section} aria-labelledby="sources-heading">
      <h2 className={styles.heading} id="sources-heading">
        <span aria-hidden="true">📎</span> Official Sources
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
              Visit ↗
            </a>
          </li>
        ))}
      </ul>

      <p className={styles.disclaimer}>
        Last checked: {formatDate(lastChecked)} · Information is subject to
        change. Always check official sources before you go.
      </p>
    </section>
  );
}
