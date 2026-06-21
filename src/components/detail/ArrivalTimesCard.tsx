import styles from "./ArrivalTimesCard.module.css";
import type { ArrivalTime } from "@/types";

interface ArrivalTimesCardProps {
  arrivalTimes: ArrivalTime[];
}

export function ArrivalTimesCard({ arrivalTimes }: ArrivalTimesCardProps) {
  if (!arrivalTimes || arrivalTimes.length === 0) return null;

  return (
    <section className={styles.card} aria-labelledby="arrival-times-heading" id="arrival">
      <h2 className={styles.heading} id="arrival-times-heading">
        <span className={styles.icon} aria-hidden="true">⏱</span>
        Best Arrival Times
      </h2>
      <ul className={styles.list} role="list">
        {arrivalTimes.map((row) => (
          <li key={row.gameType} className={styles.row}>
            <span className={styles.gameType}>{row.gameType}</span>
            <span className={styles.timing}>{row.timing}</span>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        Arrival times are estimates. Conditions may vary - always check official sources the morning of the game.
      </p>
    </section>
  );
}
