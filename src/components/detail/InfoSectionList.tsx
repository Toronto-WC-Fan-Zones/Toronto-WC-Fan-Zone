import styles from "./InfoSectionList.module.css";
import type { InfoSection } from "@/types";

interface InfoSectionListProps {
  sections: InfoSection[];
}

export function InfoSectionList({ sections }: InfoSectionListProps) {
  return (
    <div className={styles.list}>
      {sections.map((s) => (
        <div key={s.label} className={styles.row}>
          <span className={styles.iconBox} aria-hidden="true">
            {s.icon}
          </span>
          <div className={styles.content}>
            <p className={styles.label}>{s.label}</p>
            <ul className={styles.bullets}>
              {s.bullets.map((b) => (
                <li key={b} className={styles.bullet}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <span className={styles.chevron} aria-hidden="true">›</span>
        </div>
      ))}
    </div>
  );
}
