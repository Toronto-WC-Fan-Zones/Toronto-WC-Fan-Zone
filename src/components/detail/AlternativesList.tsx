import Link from "next/link";
import styles from "./AlternativesList.module.css";
import type { OfficialFanZone } from "@/types";

interface AlternativesListProps {
  alternatives: OfficialFanZone[];
}

export function AlternativesList({ alternatives }: AlternativesListProps) {
  if (alternatives.length === 0) return null;

  return (
    <section
      className={styles.section}
      aria-labelledby="alternatives-heading"
    >
      <h2 className={styles.heading} id="alternatives-heading">
        <span aria-hidden="true">↔</span> If this spot is full or unclear, try:
      </h2>

      <ul className={styles.list}>
        {alternatives.map((alt) => (
          <li key={alt.slug}>
            <Link href={`/fan-zones/${alt.slug}`} className={styles.item}>
              {alt.name} - {alt.neighbourhood}
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
