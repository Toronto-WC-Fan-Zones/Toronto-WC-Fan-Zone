import Link from "next/link";
import Image from "next/image";
import styles from "./FanZoneCard.module.css";
import { CrowdRiskBadge } from "@/components/ui/CrowdRiskBadge";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { LastChecked } from "@/components/ui/LastChecked";
import type { OfficialFanZone } from "@/types";

interface FanZoneCardProps {
  zone: OfficialFanZone;
}

export function FanZoneCard({ zone }: FanZoneCardProps) {
  const { entryRequirements: er } = zone;

  return (
    <Link href={`/fan-zones/${zone.slug}`} className={styles.card}>
      {zone.imageSrc && (
        <div className={styles.photo}>
          <Image
            src={zone.imageSrc}
            alt={zone.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.photoImg}
          />
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.badges}>
          <EntryTypeBadge type={er.type} />
          <CrowdRiskBadge risk={zone.crowdRisk} />
          {zone.isOutdoor && (
            <span className={styles.outdoor}>Outdoor</span>
          )}
        </div>

        <h3 className={styles.name}>{zone.name}</h3>

        <p className={styles.neighbourhood}>{zone.neighbourhood}</p>

        {er.arrivalGuidance && (
          <p className={styles.arrivalHint}>
            <span className={styles.arrivalIcon} aria-hidden="true">⏱</span>
            {er.arrivalGuidance.split(".")[0]}
          </p>
        )}

        <div className={styles.footer}>
          <LastChecked date={zone.lastChecked} />
          <span className={styles.viewLink}>View details →</span>
        </div>
      </div>
    </Link>
  );
}
