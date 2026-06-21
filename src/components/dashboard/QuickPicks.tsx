import Link from "next/link";
import Image from "next/image";
import styles from "./QuickPicks.module.css";
import { CrowdRiskBadge } from "@/components/ui/CrowdRiskBadge";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import type { QuickPick } from "@/types";

const TYPE_BASE: Record<string, string> = {
  "fan-zone": "/fan-zones",
  hotspot: "/hotspots",
  area: "/areas",
};

interface QuickPicksProps {
  picks: QuickPick[];
}

export function QuickPicks({ picks }: QuickPicksProps) {
  return (
    <section className={styles.section} aria-labelledby="quick-picks-heading">
      <div className={styles.header}>
        <h2 className={styles.title} id="quick-picks-heading">
          Quick Picks
        </h2>
        <Link href="/fan-zones" className={styles.viewAll}>
          View all →
        </Link>
      </div>

      <div className={styles.scroll} role="list">
        {picks.map((pick) => {
          const href = `${TYPE_BASE[pick.type]}/${pick.slug}`;
          return (
            <Link
              key={pick.slug}
              href={href}
              className={styles.card}
              role="listitem"
              aria-label={`${pick.name} - ${pick.label}`}
            >
              {/* Photo fills the whole card as background */}
              {pick.imageSrc && (
                <Image
                  src={pick.imageSrc}
                  alt={pick.name}
                  fill
                  sizes="300px"
                  className={styles.cardPhoto}
                />
              )}
              {/* Gradient overlay - transparent top, dark bottom */}
              <div className={styles.cardOverlay} aria-hidden="true" />

              {/* Label badge pinned to top-left */}
              <span className={styles.cardTopBadge}>{pick.label}</span>

              {/* Content sits at the bottom of the gradient */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{pick.name}</h3>
                <div className={styles.cardMeta}>
                  <EntryTypeBadge type={pick.entryType} />
                  <CrowdRiskBadge risk={pick.crowdRisk} />
                </div>
                <p className={styles.cardTagline}>{pick.tagline}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
