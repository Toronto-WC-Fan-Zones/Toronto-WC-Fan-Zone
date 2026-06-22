import Link from "next/link";
import styles from "./CommunityEventCard.module.css";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { CountryBadges } from "@/components/ui/CountryBadges";
import { formatTorontoDateTime } from "@/lib/dates";
import type { CommunityEvent } from "@/types";

interface CommunityEventCardProps {
  event: CommunityEvent;
}

export function CommunityEventCard({ event }: CommunityEventCardProps) {
  return (
    <Link href={`/events/${event.slug}`} className={styles.card}>
      <CountryBadges countries={event.relatedCountries} />

      <h3 className={styles.name}>{event.name}</h3>

      <div className={styles.meta}>
        <span>
          {formatTorontoDateTime(event.startDateTime, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
        <span>
          {event.venueName ? `${event.venueName} - ` : ""}
          {event.neighbourhood}
        </span>
      </div>

      <div className={styles.badges}>
        <EntryTypeBadge type={event.entryType} />
      </div>

      <div className={styles.footer}>
        <span className={styles.viewLink}>View details →</span>
      </div>
    </Link>
  );
}
