import styles from "./UsefulLinksCard.module.css";
import type { UsefulLink } from "@/types";

interface UsefulLinksCardProps {
  links: UsefulLink[];
}

export function UsefulLinksCard({ links }: UsefulLinksCardProps) {
  return (
    <aside className={styles.card} aria-label="Useful links">
      <p className={styles.heading}>Useful links</p>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span className={styles.linkIcon} aria-hidden="true">
                {link.icon}
              </span>
              <span className={styles.linkLabel}>{link.label}</span>
              <span className={styles.external} aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
