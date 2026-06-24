import Link from "next/link";
import styles from "./CountryHotspotCard.module.css";
import { CrowdRiskBadge } from "@/components/ui/CrowdRiskBadge";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { LastChecked } from "@/components/ui/LastChecked";
import { FlagIcon } from "@/components/ui/FlagIcon";
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
        <FlagIcon code={hotspot.countryCode} size={20} />
        <div className={styles.countryInfo}>
          <h3 className={styles.name}>{hotspot.name}</h3>
          <p className={styles.sub}>
            {hotspot.country} fans · {hotspot.neighbourhood}
          </p>
        </div>
        {eventCount > 0 && (
          <span className={styles.eventCount}>
            {eventCount} event{eventCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {hotspot.atmosphere && (
        <p className={styles.atmosphere}>{hotspot.atmosphere}</p>
      )}

      <div className={styles.meta}>
        <EntryTypeBadge type={hotspot.entryRequirements.type} />
        <CrowdRiskBadge risk={hotspot.crowdRisk} />
      </div>

      <div className={styles.footer}>
        <LastChecked date={hotspot.lastChecked} />
      </div>
    </Link>
  );
}
