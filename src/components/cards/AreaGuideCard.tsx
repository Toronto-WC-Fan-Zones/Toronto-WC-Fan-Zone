import Link from "next/link";
import styles from "./AreaGuideCard.module.css";
import { LastChecked } from "@/components/ui/LastChecked";
import type { AreaGuide } from "@/types";

interface AreaGuideCardProps {
  area: AreaGuide;
}

export function AreaGuideCard({ area }: AreaGuideCardProps) {
  return (
    <Link href={`/areas/${area.slug}`} className={styles.card}>
      <h3 className={styles.name}>{area.name}</h3>

      <div className={styles.counts}>
        <span className={styles.count}>
          <span className={styles.countNum}>{area.fanZoneSlugs.length}</span>
          {" "}fan zones
        </span>
        <span className={styles.countDot} aria-hidden="true">·</span>
        <span className={styles.count}>
          <span className={styles.countNum}>{area.hotspotSlugs.length}</span>
          {" "}hotspots
        </span>
      </div>

      <div className={styles.footer}>
        <LastChecked date={area.lastChecked} />
        <span className={styles.viewLink}>Explore area →</span>
      </div>
    </Link>
  );
}
