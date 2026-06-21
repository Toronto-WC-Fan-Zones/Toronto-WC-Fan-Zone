import styles from "./ScheduleTable.module.css";
import type { ScheduleEntry } from "@/types";

interface ScheduleTableProps {
  entries: ScheduleEntry[];
}

export function ScheduleTable({ entries }: ScheduleTableProps) {
  if (entries.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="schedule-heading">
      <h2 className={styles.heading} id="schedule-heading">
        Dates &amp; Times
      </h2>
      <ul className={styles.list}>
        {entries.map((e) => (
          <li key={e.date} className={styles.row}>
            <span className={styles.date}>{e.date}</span>
            <span className={styles.hours}>{e.hours}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
