import styles from "./EntryRequirements.module.css";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { UnknownState } from "@/components/ui/UnknownState";
import { DayOfAdvisory } from "@/components/ui/DayOfAdvisory";
import type { EntryRequirements as EntryRequirementsType } from "@/types";

interface EntryRequirementsProps {
  er: EntryRequirementsType;
}

export function EntryRequirements({ er }: EntryRequirementsProps) {
  return (
    <section
      className={styles.section}
      aria-labelledby="entry-requirements-heading"
    >
      <h2 className={styles.heading} id="entry-requirements-heading">
        <span aria-hidden="true">🎟</span> Entry Requirements
      </h2>

      <div className={styles.grid}>
        <div className={styles.block}>
          <span className={styles.blockLabel}>Entry Type</span>
          <EntryTypeBadge type={er.type} />
        </div>

        <div className={styles.block}>
          <span className={styles.blockLabel}>Cost</span>
          <span className={styles.blockValue}>
            {er.cost ?? (
              <UnknownState
                label="Unclear"
                sourceUrl={er.officialTicketUrl ?? undefined}
              />
            )}
          </span>
        </div>

        <div className={styles.block}>
          <span className={styles.blockLabel}>Tickets Available</span>
          <span className={styles.blockValue}>
            {er.ticketsAvailable === true && "Yes - check official page"}
            {er.ticketsAvailable === false && "Currently unavailable"}
            {er.ticketsAvailable === null && (
              <UnknownState
                label="Unclear"
                sourceUrl={er.officialTicketUrl ?? undefined}
                sourceLabel="check ticket page"
              />
            )}
          </span>
        </div>

        <div className={styles.block}>
          <span className={styles.blockLabel}>Reservation Guarantees Entry?</span>
          <span className={styles.blockValue}>
            {er.reservationGuaranteesEntry === true &&
              "Yes (subject to capacity)"}
            {er.reservationGuaranteesEntry === false &&
              "No - reduces wait time only"}
            {er.reservationGuaranteesEntry === null && (
              <UnknownState label="Unclear" />
            )}
          </span>
        </div>

        {er.arrivalGuidance && (
          <div className={styles.block} style={{ gridColumn: "1 / -1" }}>
            <span className={styles.blockLabel}>Best Arrival Time</span>
            <span className={styles.blockValue}>{er.arrivalGuidance}</span>
          </div>
        )}
      </div>

      {er.dayOfDropAdvisory && (
        <DayOfAdvisory ticketUrl={er.officialTicketUrl} />
      )}

      <p className={styles.note}>
        Entry policies can change on short notice. Always verify directly with
        the venue before you leave.
      </p>
    </section>
  );
}
