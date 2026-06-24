import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAllHotspots,
  getHotspotBySlug,
  getPublicEventsByCountry,
} from "@/lib/data";
import { CrowdRiskBadge } from "@/components/ui/CrowdRiskBadge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { LastChecked } from "@/components/ui/LastChecked";
import { QuickAnswerBox } from "@/components/detail/QuickAnswerBox";
import { EntryRequirements } from "@/components/detail/EntryRequirements";
import { RestrictionsList } from "@/components/detail/RestrictionsList";
import { SourceList } from "@/components/detail/SourceList";
import { CommunityEventCard } from "@/components/cards/CommunityEventCard";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { FEATURES } from "@/lib/features";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllHotspots().map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hotspot = getHotspotBySlug(slug);
  if (!hotspot) return { title: "Hotspot Not Found" };
  return {
    title: `${hotspot.country} Fans - ${hotspot.name}`,
    description: hotspot.atmosphere ?? hotspot.name,
  };
}

export default async function HotspotDetailPage({ params }: Props) {
  const { slug } = await params;
  const hotspot = getHotspotBySlug(slug);
  if (!hotspot) notFound();

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(hotspot.name + " Toronto")}`;
  const relatedEvents = FEATURES.watchParties
    ? getPublicEventsByCountry(hotspot.country)
    : [];

  return (
    <div className={styles.page}>
      {/* ─── Hero: reduced height, lighter overlay, no badge row ─── */}
      <section className={styles.hero}>
        {hotspot.imageSrc ? (
          <Image
            src={hotspot.imageSrc}
            alt={`${hotspot.name} - neighbourhood photo`}
            fill
            priority
            sizes="100vw"
            className={styles.heroPhoto}
          />
        ) : (
          <div className={styles.heroFlagBg} aria-hidden="true">
            <FlagIcon code={hotspot.countryCode} size={160} className={styles.heroFlagEmoji} />
          </div>
        )}
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={`container ${styles.heroContainer}`}>
          <Link href="/hotspots" className={styles.backLink}>
            ← Country Hotspots
          </Link>
          <div className={styles.heroContent}>
            <p className={styles.countryLabel}>
              <FlagIcon code={hotspot.countryCode} size={16} />
              {" "}{hotspot.country} Fans
            </p>
            <h1 className={styles.title}>{hotspot.name}</h1>
            <p className={styles.neighbourhood}>
              <span aria-hidden="true">📍</span> {hotspot.neighbourhood}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Below-hero band: badges + actions ─── */}
      <div className={styles.heroBand}>
        <div className={`container ${styles.heroBandInner}`}>
          <div className={styles.heroBandLeft}>
            <EntryTypeBadge type={hotspot.entryRequirements.type} />
            <CrowdRiskBadge risk={hotspot.crowdRisk} />
            <ConfidenceBadge confidence={hotspot.confidence} />
          </div>
          <div className={styles.heroBandRight}>
            <LastChecked date={hotspot.lastChecked} />
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
            >
              Get directions →
            </a>
          </div>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="container">
        <div className={styles.body}>
          <div className={styles.mainCol}>
            {hotspot.atmosphere && (
              <section className={styles.atmosphereSection} id="overview">
                <p className={styles.atmosphereText}>{hotspot.atmosphere}</p>
              </section>
            )}

            {hotspot.bestFor.length > 0 && (
              <section className={styles.bestForSection}>
                <h2 className={styles.sectionHeading}>Good for</h2>
                <ul className={styles.bestForList}>
                  {hotspot.bestFor.map((b) => (
                    <li key={b} className={styles.bestForItem}>
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div id="entry-rules">
              <EntryRequirements er={hotspot.entryRequirements} />
            </div>

            {relatedEvents.length > 0 && (
              <section className={styles.bestForSection} id="events">
                <h2 className={styles.sectionHeading}>
                  Upcoming events for {hotspot.country} fans
                </h2>
                <div className={styles.eventsGrid}>
                  {relatedEvents.map((e) => (
                    <CommunityEventCard key={e.slug} event={e} />
                  ))}
                </div>
              </section>
            )}

            <div id="restrictions">
              <RestrictionsList
                restrictions={hotspot.entryRequirements.restrictions}
              />
            </div>

            <div id="good-to-know">
              <SourceList
                sources={hotspot.sources}
                lastChecked={hotspot.lastChecked}
              />
            </div>
          </div>

          <aside className={styles.sidebar}>
            <QuickAnswerBox
              name={hotspot.name}
              entryRequirements={hotspot.entryRequirements}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
