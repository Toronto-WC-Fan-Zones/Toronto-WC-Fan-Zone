import Link from "next/link";
import styles from "./CountryHotspotCard.module.css";
import { CrowdRiskBadge } from "@/components/ui/CrowdRiskBadge";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { LastChecked } from "@/components/ui/LastChecked";
import type { CountryHotspot } from "@/types";

interface CountryHotspotCardProps {
  hotspot: CountryHotspot;
}

export function CountryHotspotCard({ hotspot }: CountryHotspotCardProps) {
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
