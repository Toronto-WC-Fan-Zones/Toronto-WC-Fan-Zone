import styles from "./DayOfAdvisory.module.css";

interface DayOfAdvisoryProps {
  ticketUrl: string | null;
}

export function DayOfAdvisory({ ticketUrl }: DayOfAdvisoryProps) {
  return (
    <div className={styles.advisory} role="note" aria-label="Day-of ticket advisory">
      <span className={styles.icon} aria-hidden="true">
        ⚑
      </span>
      <p className={styles.text}>
        <strong>Day-of ticket advisory:</strong> Free tickets for this fan zone
        sometimes drop the morning of the game.{" "}
        {ticketUrl ? (
          <>
            Check the{" "}
            <a
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              official ticket page
            </a>{" "}
            before you leave.
          </>
        ) : (
          "Check the official ticket page before you leave."
        )}
      </p>
    </div>
  );
}
