import Link from "next/link";
import styles from "./CountryHotspotCard.module.css";
import { CrowdRiskBadge } from "@/components/ui/CrowdRiskBadge";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { LastChecked } from "@/components/ui/LastChecked";
import type { CountryHotspot } from "@/types";

interface CountryHotspotCardProps {
  hotspot: CountryHotspot;
  eventCount?: number;
}

export function CountryHotspotCard({
  hotspot,
  eventCount = 0,
}: CountryHotspotCardProps) {
  return (
    <Link href={`/hotspots/${hotspot.slug}`} className={styles.card}>
      <div className={styles.header}>
        <span className={styles.flag} aria-hidden="true">
          {hotspot.flagEmoji}
        </span>
        <div className={styles.countryInfo}>
          <span className={styles.country}>{hotspot.country} Fans</span>
          <h3 className={styles.name}>{hotspot.name}</h3>
        </div>
        {eventCount > 0 && (
          <span className={styles.eventCount}>
            {eventCount} event{eventCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className={styles.badges}>
        <EntryTypeBadge type={hotspot.entryRequirements.type} />
        <CrowdRiskBadge risk={hotspot.crowdRisk} />
      </div>

      <p className={styles.neighbourhood}>{hotspot.neighbourhood}</p>

      <div className={styles.footer}>
        <LastChecked date={hotspot.lastChecked} />
        <span className={styles.viewLink}>View hotspot →</span>
      </div>
    </Link>
  );
}
