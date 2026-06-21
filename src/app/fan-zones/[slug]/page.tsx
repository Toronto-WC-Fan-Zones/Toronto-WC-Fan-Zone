import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAllFanZones,
  getFanZoneBySlug,
  getFanZonesBySlug,
} from "@/lib/data";
import { CrowdRiskBadge } from "@/components/ui/CrowdRiskBadge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { LastChecked } from "@/components/ui/LastChecked";
import { QuickAnswerBox } from "@/components/detail/QuickAnswerBox";
import { EntryRequirements } from "@/components/detail/EntryRequirements";
import { RestrictionsList } from "@/components/detail/RestrictionsList";
import { SourceList } from "@/components/detail/SourceList";
import { AlternativesList } from "@/components/detail/AlternativesList";
import { ArrivalTimesCard } from "@/components/detail/ArrivalTimesCard";
import { WhatGamesBusy } from "@/components/detail/WhatGamesBusy";
import { InfoSectionList } from "@/components/detail/InfoSectionList";
import { ScheduleTable } from "@/components/detail/ScheduleTable";
import { LocalFAQList } from "@/components/detail/LocalFAQList";
import { UsefulLinksCard } from "@/components/detail/UsefulLinksCard";
import {
  NearbyAlternativesCard,
  type NearbyAlt,
} from "@/components/detail/NearbyAlternativesCard";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFanZones().map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zone = getFanZoneBySlug(slug);
  if (!zone) return { title: "Fan Zone Not Found" };
  return {
    title: zone.name,
    description: zone.shortDescription,
  };
}

/* Badge colour derived from text content */
function customBadgeClass(badge: string): string {
  const l = badge.toLowerCase();
  if (l.includes("reservation") || l.includes("preferred")) return styles.badgeAmber;
  if (l.includes("walk-in") || l.includes("allowed")) return styles.badgeGreen;
  if (l.includes("busy") || l.includes("high crowd")) return styles.badgeOrange;
  return styles.badgeDefault;
}

export default async function FanZoneDetailPage({ params }: Props) {
  const { slug } = await params;
  const zone = getFanZoneBySlug(slug);
  if (!zone) notFound();

  const allZones = getAllFanZones();
  const alternatives = getFanZonesBySlug(zone.alternativeSlugs);
  const officialSource = zone.sources.find((s) => s.type === "official");
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    (zone.address ?? zone.name) + " Toronto"
  )}`;

  const nearbyAlts: NearbyAlt[] = (zone.nearbyAlternatives ?? [])
    .map((a) => {
      const z = allZones.find((fz) => fz.slug === a.slug);
      if (!z) return null;
      return {
        slug: a.slug,
        name: z.name,
        distanceKm: a.distanceKm,
        walkMinutes: a.walkMinutes,
        entryType: z.entryRequirements.type,
        imageSrc: z.imageSrc,
      };
    })
    .filter(Boolean) as NearbyAlt[];

  const hasRichContent =
    zone.infoSections && zone.infoSections.length > 0;

  return (
    <div className={styles.page}>
      {/* ─── White header: thumbnail + title + badges ─── */}
      <div className={styles.pageHeader}>
        <div className="container">
          <Link href="/fan-zones" className={styles.backLink}>
            ← Back to all fan zones
          </Link>

          <div className={styles.headerRow}>
            {/* Thumbnail */}
            {zone.imageSrc && (
              <div className={styles.headerThumb}>
                <Image
                  src={zone.imageSrc}
                  alt={zone.name}
                  fill
                  sizes="128px"
                  className={styles.headerThumbImg}
                />
              </div>
            )}

            {/* Info block */}
            <div className={styles.headerInfo}>
              <h1 className={styles.headerTitle}>{zone.name}</h1>
              {zone.address && (
                <p className={styles.headerAddress}>
                  <span aria-hidden="true">📍</span> {zone.address}
                </p>
              )}
              {zone.websiteLabel && (
                <p className={styles.headerVenueLabel}>
                  <span aria-hidden="true">🛡</span> {zone.websiteLabel}
                </p>
              )}
              <div className={styles.headerBadges}>
                <EntryTypeBadge type={zone.entryRequirements.type} />
                {zone.customBadges?.map((b) => (
                  <span
                    key={b}
                    className={`${styles.customBadge} ${customBadgeClass(b)}`}
                  >
                    {b}
                  </span>
                ))}
                {!zone.customBadges && (
                  <>
                    <CrowdRiskBadge risk={zone.crowdRisk} />
                    {zone.isOutdoor && (
                      <span className={styles.customBadge}>🌤 Outdoor</span>
                    )}
                    <ConfidenceBadge confidence={zone.confidence} />
                  </>
                )}
              </div>
            </div>

            {/* Open in Maps button */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapsBtn}
              aria-label="Open in Google Maps"
            >
              <span aria-hidden="true">📍</span> Open in Maps
            </a>
          </div>
        </div>
      </div>

      {/* ─── Full-width hero image ─── */}
      {zone.imageSrc && (
        <div className={styles.heroImageWrap}>
          <Image
            src={zone.imageSrc}
            alt={`${zone.name} - venue photo`}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
      )}

      {/* ─── Body: single column + top cards row ─── */}
      <div className="container">
        <div className={styles.body}>

          {/* ── Top cards row: useful links + nearby alternatives ── */}
          {(zone.usefulLinks?.length || nearbyAlts.length || alternatives.length) ? (
            <div className={styles.topCards}>
              {zone.usefulLinks && zone.usefulLinks.length > 0 ? (
                <UsefulLinksCard links={zone.usefulLinks} />
              ) : (
                <QuickAnswerBox
                  name={zone.name}
                  entryRequirements={zone.entryRequirements}
                  officialSourceUrl={officialSource?.url}
                />
              )}

              {nearbyAlts.length > 0 ? (
                <NearbyAlternativesCard alternatives={nearbyAlts} />
              ) : (
                alternatives.length > 0 && (
                  <AlternativesList alternatives={alternatives} />
                )
              )}

              {/* Last checked - compact inline */}
              <div className={styles.lastCheckedCard}>
                <p className={styles.lastCheckedLabel}>
                  <span aria-hidden="true">ℹ</span> Last checked
                </p>
                <LastChecked date={zone.lastChecked} />
                <p className={styles.lastCheckedNote}>
                  Info may change. Check official sources before leaving.
                </p>
              </div>
            </div>
          ) : null}

          {/* ── Main content (full-width single column) ── */}
          <div className={styles.mainCol}>

            {/* Quick Answer card */}
            <div className={styles.quickAnswer}>
              <p className={styles.qaHead}>
                <span aria-hidden="true">⚡</span> Quick Answer
              </p>
              <p className={styles.qaText}>
                {zone.quickAnswerSummary ?? zone.shortDescription}
              </p>
            </div>

            {hasRichContent ? (
              <>
                <InfoSectionList sections={zone.infoSections!} />
                {zone.schedule && zone.schedule.length > 0 && (
                  <ScheduleTable entries={zone.schedule} />
                )}
              </>
            ) : (
              <>
                {(zone.bestFor.length > 0 || zone.notIdealFor.length > 0) && (
                  <section className={styles.vibeSection}>
                    <div className={styles.vibeGrid}>
                      {zone.bestFor.length > 0 && (
                        <div className={styles.vibeBlock}>
                          <h2 className={styles.vibeHeading}>Vibe &amp; Best For</h2>
                          <ul className={styles.vibeList}>
                            {zone.bestFor.map((b) => (
                              <li key={b} className={styles.vibeItem}>
                                <span className={styles.vibeCheck} aria-hidden="true">✓</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {zone.notIdealFor.length > 0 && (
                        <div className={styles.vibeBlock}>
                          <h2 className={styles.vibeHeading}>Not Ideal For</h2>
                          <ul className={styles.vibeList}>
                            {zone.notIdealFor.map((n) => (
                              <li key={n} className={styles.vibeItem}>
                                <span className={styles.vibeCross} aria-hidden="true">✗</span>
                                {n}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </section>
                )}
                <EntryRequirements er={zone.entryRequirements} />
                {zone.arrivalTimes && zone.arrivalTimes.length > 0 && (
                  <ArrivalTimesCard arrivalTimes={zone.arrivalTimes} />
                )}
                <WhatGamesBusy
                  veryBusyGames={zone.veryBusyGames}
                  lessBusyGames={zone.lessBusyGames}
                />
                <RestrictionsList
                  restrictions={zone.entryRequirements.restrictions}
                />
              </>
            )}

            {zone.localFaqs && zone.localFaqs.length > 0 && (
              <LocalFAQList faqs={zone.localFaqs} />
            )}

            <SourceList
              sources={zone.sources}
              lastChecked={zone.lastChecked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
