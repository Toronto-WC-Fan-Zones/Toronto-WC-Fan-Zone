import styles from "./DayOfAdvisory.module.css";

interface DayOfAdvisoryProps {
  ticketUrl: string | null;
}

export function DayOfAdvisory({ ticketUrl }: DayOfAdvisoryProps) {
  return (
    <div className={styles.advisory} role="note" aria-label="Day-of ticket advisory">
      <span className={styles.icon} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
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
