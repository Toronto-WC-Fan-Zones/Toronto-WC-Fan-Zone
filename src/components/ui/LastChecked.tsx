import styles from "./LastChecked.module.css";
import { STALE_WARNING_DAYS } from "@/lib/constants";
import { formatCalendarDate, daysSinceCalendarDate } from "@/lib/dates";

interface LastCheckedProps {
  date: string; // ISO date string
}

function getDotClass(isoDate: string): string {
  const diffDays = daysSinceCalendarDate(isoDate);
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
      Last checked: {formatCalendarDate(date)}
    </span>
  );
}
