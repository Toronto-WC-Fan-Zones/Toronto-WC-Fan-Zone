import styles from "./LastChecked.module.css";
import { STALE_WARNING_DAYS } from "@/lib/constants";

interface LastCheckedProps {
  date: string; // ISO date string
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getDotClass(isoDate: string): string {
  const checked = new Date(isoDate);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - checked.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays <= 3) return styles.fresh;
  if (diffDays <= STALE_WARNING_DAYS) return styles.recent;
  return styles.stale;
}

export function LastChecked({ date }: LastCheckedProps) {
  return (
    <span className={styles.wrapper}>
      <span
        className={`${styles.dot} ${getDotClass(date)}`}
        aria-hidden="true"
      />
      Last checked: {formatDate(date)}
    </span>
  );
}
