import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllAreas,
  getAreaBySlug,
  getFanZonesBySlug,
  getHotspotsBySlug,
} from "@/lib/data";
import { FanZoneCard } from "@/components/cards/FanZoneCard";
import { CountryHotspotCard } from "@/components/cards/CountryHotspotCard";
import { LastChecked } from "@/components/ui/LastChecked";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceList } from "@/components/detail/SourceList";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAreas().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return { title: "Area Not Found" };
  return {
    title: `${area.name} - World Cup Watch Spots`,
    description: area.description,
  };
}

export default async function AreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const fanZones = getFanZonesBySlug(area.fanZoneSlugs);
  const hotspots = getHotspotsBySlug(area.hotspotSlugs);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <Link href="/areas" className={styles.backLink}>
            ← Back to all areas
          </Link>
          <div className={styles.heroContent}>
            <span className={styles.areaIcon} aria-hidden="true">
              🗺
            </span>
            <div>
              <h1 className={styles.title}>{area.name}</h1>
              <p className={styles.description}>{area.description}</p>
              <div className={styles.heroMeta}>
                <LastChecked date={area.lastChecked} />
                <ConfidenceBadge confidence={area.confidence} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.body}>
          {/* Arrival guidance */}
          <section className={styles.arrivalSection}>
            <h2 className={styles.sectionHeading}>
              🕐 Arrival Guidance
            </h2>
            <div className={styles.arrivalGrid}>
              {area.arrivalGuidanceBusy && (
                <div className={styles.arrivalBlock}>
                  <p className={styles.arrivalLabel}>Busy games</p>
                  <p className={styles.arrivalText}>{area.arrivalGuidanceBusy}</p>
                </div>
              )}
              {area.arrivalGuidanceQuiet && (
                <div className={styles.arrivalBlock}>
                  <p className={styles.arrivalLabel}>Quieter games</p>
                  <p className={styles.arrivalText}>{area.arrivalGuidanceQuiet}</p>
                </div>
              )}
            </div>
          </section>

          {/* Highlights */}
          {area.highlights.length > 0 && (
            <section className={styles.highlightsSection}>
              <h2 className={styles.sectionHeading}>Highlights</h2>
              <ul className={styles.highlightsList}>
                {area.highlights.map((h) => (
                  <li key={h} className={styles.highlightItem}>
                    <span aria-hidden="true">→</span> {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Fan zones in this area */}
          {fanZones.length > 0 && (
            <section>
              <h2 className={styles.sectionHeading}>
                🏟 Fan Zones in This Area
              </h2>
              <div className={styles.grid}>
                {fanZones.map((z) => (
                  <FanZoneCard key={z.slug} zone={z} />
                ))}
              </div>
            </section>
          )}

          {/* Hotspots in this area */}
          {hotspots.length > 0 && (
            <section>
              <h2 className={styles.sectionHeading}>
                🌍 Country Hotspots in This Area
              </h2>
              <div className={styles.grid}>
                {hotspots.map((h) => (
                  <CountryHotspotCard key={h.slug} hotspot={h} />
                ))}
              </div>
            </section>
          )}

          {fanZones.length === 0 && hotspots.length === 0 && (
            <p className={styles.emptyNote}>
              No specific spots verified in this area yet.{" "}
              <Link href="/submit" className={styles.submitLink}>
                Know one? Submit it →
              </Link>
            </p>
          )}

          <SourceList sources={area.sources} lastChecked={area.lastChecked} />
        </div>
      </div>
    </div>
  );
}
