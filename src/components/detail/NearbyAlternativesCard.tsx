import Link from "next/link";
import Image from "next/image";
import styles from "./NearbyAlternativesCard.module.css";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import type { EntryType } from "@/types";

export interface NearbyAlt {
  slug: string;
  name: string;
  distanceKm: number;
  walkMinutes: number;
  entryType: EntryType;
  imageSrc?: string;
}

interface NearbyAlternativesCardProps {
  alternatives: NearbyAlt[];
}

export function NearbyAlternativesCard({ alternatives }: NearbyAlternativesCardProps) {
  if (alternatives.length === 0) return null;

  return (
    <aside className={styles.card} aria-label="Nearby alternatives">
      <p className={styles.heading}>Nearby alternatives</p>
      <ul className={styles.list}>
        {alternatives.map((alt) => (
          <li key={alt.slug}>
            <Link href={`/fan-zones/${alt.slug}`} className={styles.item}>
              <div className={styles.thumb}>
                {alt.imageSrc ? (
                  <Image
                    src={alt.imageSrc}
                    alt={alt.name}
                    fill
                    sizes="60px"
                    className={styles.thumbImg}
                  />
                ) : (
                  <span className={styles.thumbFallback} aria-hidden="true" />
                )}
              </div>
              <div className={styles.info}>
                <p className={styles.altName}>{alt.name}</p>
                <p className={styles.distance}>
                  {alt.distanceKm} km · {alt.walkMinutes} min walk
                </p>
                <EntryTypeBadge type={alt.entryType} />
              </div>
              <span className={styles.chevron} aria-hidden="true">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
