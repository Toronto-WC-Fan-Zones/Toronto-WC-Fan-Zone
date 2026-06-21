import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllHotspots, getHotspotBySlug } from "@/lib/data";
import { CrowdRiskBadge } from "@/components/ui/CrowdRiskBadge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { LastChecked } from "@/components/ui/LastChecked";
import { QuickAnswerBox } from "@/components/detail/QuickAnswerBox";
import { EntryRequirements } from "@/components/detail/EntryRequirements";
import { RestrictionsList } from "@/components/detail/RestrictionsList";
import { SourceList } from "@/components/detail/SourceList";
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

  return (
    <div className={styles.page}>
      {/* ─── Hero with full-bleed photo (or flag fallback) ─── */}
      <section className={styles.hero}>
        {hotspot.imageSrc ? (
          <Image
            src={hotspot.imageSrc}
            alt={`${hotspot.name} - venue photo`}
            fill
            priority
            sizes="100vw"
            className={styles.heroPhoto}
          />
        ) : (
          <div className={styles.heroFlagBg} aria-hidden="true">
            <span className={styles.heroFlagEmoji}>{hotspot.flagEmoji}</span>
          </div>
        )}
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={`container ${styles.heroContainer}`}>
          <Link href="/hotspots" className={styles.backLink}>
            ← Back to all hotspots
          </Link>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <p className={styles.countryLabel}>
                <span aria-hidden="true">{hotspot.flagEmoji}</span>{" "}
                {hotspot.country} Fans
              </p>
              <div className={styles.badges}>
                <EntryTypeBadge type={hotspot.entryRequirements.type} />
                <CrowdRiskBadge risk={hotspot.crowdRisk} />
                <ConfidenceBadge confidence={hotspot.confidence} />
              </div>
              <h1 className={styles.title}>{hotspot.name}</h1>
              <p className={styles.neighbourhood}>
                <span aria-hidden="true">📍</span> {hotspot.neighbourhood}
              </p>
              {hotspot.atmosphere && (
                <p className={styles.description}>{hotspot.atmosphere}</p>
              )}
              <div className={styles.heroActions}>
                <LastChecked date={hotspot.lastChecked} />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsBtn}
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Anchor tab navigation ─── */}
      <nav className={styles.tabNav} aria-label="Page sections">
        <div className={`container ${styles.tabNavInner}`}>
          <a href="#overview" className={styles.tabLink}>Overview</a>
          <a href="#entry-rules" className={styles.tabLink}>Entry &amp; Rules</a>
          <a href="#restrictions" className={styles.tabLink}>Restrictions</a>
          <a href="#good-to-know" className={styles.tabLink}>Good to Know</a>
        </div>
      </nav>

      {/* ─── Body ─── */}
      <div className="container">
        <div className={styles.body}>
          <div className={styles.mainCol}>
            {hotspot.bestFor.length > 0 && (
              <section className={styles.bestForSection} id="overview">
                <h2 className={styles.sectionHeading}>Best For</h2>
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
