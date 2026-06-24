import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAllFanZones,
  getFanZoneBySlug,
  getFanZonesBySlug,
} from "@/lib/data";
import { LastChecked } from "@/components/ui/LastChecked";
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
import { ENTRY_TYPE_LABELS, CROWD_RISK_LABELS } from "@/lib/constants";
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

  const hasRichContent = zone.infoSections && zone.infoSections.length > 0;

  const { entryRequirements: er } = zone;

  return (
    <div className={styles.page}>
      {/* ─── Two-column page header: image left, info right ─── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerGrid}>
          {zone.imageSrc && (
            <div className={styles.headerImage}>
              <Image
                src={zone.imageSrc}
                alt={zone.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className={styles.headerImageImg}
              />
            </div>
          )}

          <div className={styles.headerContent}>
            <Link href="/fan-zones" className={styles.backLink}>
              ← Fan Zones
            </Link>

            <h1 className={styles.headerTitle}>{zone.name}</h1>

            {zone.address && (
              <p className={styles.headerAddress}>
                <span aria-hidden="true">📍</span> {zone.address}
              </p>
            )}

            {/* Key facts — the most decision-relevant info at a glance */}
            <dl className={styles.keyFacts}>
              <div className={styles.keyFact}>
                <dt>Entry</dt>
                <dd>{ENTRY_TYPE_LABELS[er.type]}</dd>
              </div>
              {er.cost && (
                <div className={styles.keyFact}>
                  <dt>Cost</dt>
                  <dd>{er.cost}</dd>
                </div>
              )}
              <div className={styles.keyFact}>
                <dt>Crowd</dt>
                <dd>{CROWD_RISK_LABELS[zone.crowdRisk]}</dd>
              </div>
              {er.arrivalGuidance && (
                <div className={styles.keyFact}>
                  <dt>Arrive</dt>
                  <dd>{er.arrivalGuidance.split(".")[0]}</dd>
                </div>
              )}
            </dl>

            <div className={styles.headerActions}>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapsBtn}
                aria-label="Open in Google Maps"
              >
                Get directions →
              </a>
              {officialSource && (
                <a
                  href={officialSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.officialBtn}
                >
                  Official site ↗
                </a>
              )}
            </div>

            <div className={styles.headerMeta}>
              <LastChecked date={zone.lastChecked} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="container">
        <div className={styles.body}>

          {/* ── Sidebar cards: useful links + nearby alternatives ── */}
          {(zone.usefulLinks?.length || nearbyAlts.length || alternatives.length) ? (
            <div className={styles.topCards}>
              {zone.usefulLinks && zone.usefulLinks.length > 0 ? (
                <UsefulLinksCard links={zone.usefulLinks} />
              ) : null}

              {nearbyAlts.length > 0 ? (
                <NearbyAlternativesCard alternatives={nearbyAlts} />
              ) : (
                alternatives.length > 0 && (
                  <AlternativesList alternatives={alternatives} />
                )
              )}
            </div>
          ) : null}

          {/* ── Main content ── */}
          <div className={styles.mainCol}>
            {/* Before you go — plain prose callout */}
            {(zone.quickAnswerSummary ?? zone.shortDescription) && (
              <div className={styles.beforeYouGo}>
                <p>{zone.quickAnswerSummary ?? zone.shortDescription}</p>
              </div>
            )}

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
                          <h2 className={styles.vibeHeading}>Good for</h2>
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
                          <h2 className={styles.vibeHeading}>Not ideal for</h2>
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
