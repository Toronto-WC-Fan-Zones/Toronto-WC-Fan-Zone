import styles from "./QuickAnswerBox.module.css";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { DayOfAdvisory } from "@/components/ui/DayOfAdvisory";
import { UnknownState } from "@/components/ui/UnknownState";
import type { EntryRequirements } from "@/types";

interface QuickAnswerBoxProps {
  name: string;
  entryRequirements: EntryRequirements;
  officialSourceUrl?: string;
}

export function QuickAnswerBox({
  name,
  entryRequirements: er,
  officialSourceUrl,
}: QuickAnswerBoxProps) {
  const ticketStatusText = () => {
    if (er.ticketsAvailable === true) return "Available";
    if (er.ticketsAvailable === false) return "Currently unavailable";
    return null;
  };

  const reservationText = () => {
    if (er.reservationGuaranteesEntry === true) return "Yes";
    if (er.reservationGuaranteesEntry === false)
      return "No - reduces wait only";
    return null;
  };

  return (
    <aside className={styles.box} aria-labelledby="quick-answer-heading">
      <p className={styles.heading}>Quick Answer</p>
      <p className={styles.title}>{name}</p>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Entry type</span>
          <EntryTypeBadge type={er.type} />
        </div>

        {er.cost && (
          <div className={styles.row}>
            <span className={styles.rowLabel}>Cost</span>
            <span className={styles.rowValue}>{er.cost}</span>
          </div>
        )}

        <div className={styles.row}>
          <span className={styles.rowLabel}>Tickets</span>
          <span
            className={
              ticketStatusText() ? styles.rowValue : styles.rowValueMuted
            }
          >
            {ticketStatusText() ?? (
              <UnknownState
                label="Unclear"
                sourceUrl={er.officialTicketUrl ?? undefined}
                sourceLabel="check ticket page"
              />
            )}
          </span>
        </div>

        {er.reservationGuaranteesEntry !== null && (
          <div className={styles.row}>
            <span className={styles.rowLabel}>Reservation guarantees entry?</span>
            <span className={styles.rowValue}>{reservationText()}</span>
          </div>
        )}

        {er.arrivalGuidance && (
          <div className={styles.row}>
            <span className={styles.rowLabel}>Arrive by</span>
            <span className={styles.rowValue}>{er.arrivalGuidance.split(".")[0]}</span>
          </div>
        )}
      </div>

      {er.dayOfDropAdvisory && (
        <div className={styles.advisory}>
          <DayOfAdvisory ticketUrl={er.officialTicketUrl} />
        </div>
      )}

      {officialSourceUrl && (
        <a
          href={officialSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.sourceLink}
          aria-label="View official site (opens in new tab)"
        >
          View Official Site ↗
        </a>
      )}
    </aside>
  );
}
