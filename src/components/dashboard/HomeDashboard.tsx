import Link from "next/link";
import Image from "next/image";
import styles from "./HomeDashboard.module.css";
import { FilterChips } from "./FilterChips";
import { FanZoneCard } from "@/components/cards/FanZoneCard";
import { FEATURES } from "@/lib/features";
import { LastChecked } from "@/components/ui/LastChecked";
import { getFlagEmoji } from "@/lib/countries";
import type { OfficialFanZone, CountryHotspot, AreaGuide, CommunityEvent } from "@/types";

interface HomeDashboardProps {
  fanZones: OfficialFanZone[];
  hotspots: CountryHotspot[];
  areas: AreaGuide[];
  events: CommunityEvent[];
}

function formatEventDay(iso: string): string {
  return new Date(iso).toLocaleString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function HomeDashboard({ fanZones, hotspots, areas, events }: HomeDashboardProps) {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroGrid}>
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>
              2026 FIFA World Cup Guide · Toronto
            </span>
            <h1 className={styles.heroTitle} id="hero-heading">
              Where Toronto
              <br />
              comes together
              <br />
              <span className={styles.heroAccent}>for the game.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Find official fan zones and country hotspots to catch every
              match of the 2026 FIFA World Cup™ in Toronto.
            </p>

            <form
              action="/fan-zones"
              method="get"
              className={styles.heroSearch}
              role="search"
            >
              <label htmlFor="home-search" className="sr-only">
                Search by team, country, area, or venue
              </label>
              <input
                id="home-search"
                name="q"
                type="search"
                placeholder="Search team, country, venue, or area..."
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                Search
              </button>
            </form>

            <FilterChips />
          </div>

          {/* Right column: photo bleeds to edge */}
          <div className={styles.heroMedia}>
            <Image
              src="/images/venues/harbourfront.jpg"
              alt="Harbourfront Centre - outdoor crowd at the waterfront with the CN Tower"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
              className={styles.heroMediaImage}
            />
            <div className={styles.heroMediaBadge}>
              <span>Harbourfront Centre</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className={`container ${styles.page}`}>

        {/* Official Fan Zones - horizontal card grid */}
        <section className={styles.section} aria-labelledby="fan-zones-heading">
          <div className={styles.sectionHeader}>
            <h2 id="fan-zones-heading" className={styles.sectionHeading}>
              Official Fan Zones
            </h2>
            <Link href="/fan-zones" className={styles.viewAll}>
              View all
            </Link>
          </div>
          <div className={styles.fanZoneGrid}>
            {fanZones.map((zone) => (
              <FanZoneCard key={zone.slug} zone={zone} />
            ))}
          </div>
        </section>

        {/* Country Fan Hotspots */}
        <section className={styles.section} aria-labelledby="hotspots-heading">
          <div className={styles.sectionHeader}>
            <h2 id="hotspots-heading" className={styles.sectionHeading}>
              Country Fan Hotspots
            </h2>
            <Link href="/hotspots" className={styles.viewAll}>
              View all
            </Link>
          </div>
          <div className={styles.hotspotGrid}>
            {hotspots.slice(0, 6).map((h) => (
              <Link
                key={h.slug}
                href={`/hotspots/${h.slug}`}
                className={styles.hotspotCard}
              >
                <span className={styles.hotspotFlag} aria-hidden="true">
                  {h.flagEmoji}
                </span>
                <div className={styles.hotspotCardBody}>
                  <span className={styles.hotspotName}>{h.name}</span>
                  <span className={styles.hotspotArea}>{h.neighbourhood}</span>
                </div>
                <span className={styles.hotspotArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
          <Link href="/hotspots" className={styles.viewAllBottom}>
            View all {hotspots.length} country hotspots →
          </Link>
        </section>

        {/* Watch Parties & Events */}
        {events.length > 0 && (
          <section className={styles.section} aria-labelledby="events-heading">
            <div className={styles.sectionHeader}>
              <h2 id="events-heading" className={styles.sectionHeading}>
                Watch Parties & Events
              </h2>
              <Link href="/events" className={styles.viewAll}>
                View all
              </Link>
            </div>
            <div className={styles.hotspotGrid}>
              {[...events]
                .sort(
                  (a, b) =>
                    new Date(a.startDateTime).getTime() -
                    new Date(b.startDateTime).getTime()
                )
                .slice(0, 6)
                .map((e) => (
                  <Link
                    key={e.slug}
                    href={`/events/${e.slug}`}
                    className={styles.hotspotCard}
                  >
                    <span className={styles.hotspotFlag} aria-hidden="true">
                      {e.relatedCountries
                        .map((c) => getFlagEmoji(c))
                        .filter(Boolean)
                        .slice(0, 2)
                        .join(" ")}
                    </span>
                    <div className={styles.hotspotCardBody}>
                      <span className={styles.hotspotName}>{e.name}</span>
                      <span className={styles.hotspotArea}>
                        {formatEventDay(e.startDateTime)} · {e.neighbourhood}
                      </span>
                    </div>
                    <span className={styles.hotspotArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
            </div>
            <Link href="/events" className={styles.viewAllBottom}>
              View all {events.length} events →
            </Link>
          </section>
        )}

        {/* Find Spots Near You - hidden until FEATURES.nearMe is true */}
        {FEATURES.nearMe && (
          <section className={styles.section} aria-labelledby="near-me-heading">
            <div className={styles.sectionHeader}>
              <h2 id="near-me-heading" className={styles.sectionHeading}>
                Find Spots Near You
              </h2>
              <Link href="/areas" className={styles.viewAll}>
                View all
              </Link>
            </div>
            <div className={styles.nearMeGrid}>
              {areas.slice(0, 3).map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className={styles.listCard}
                >
                  <span className={styles.listCardThumb} aria-hidden="true">
                    <span className={styles.listThumbMap} />
                  </span>
                  <div className={styles.listCardBody}>
                    <span className={styles.listCardName}>{a.name}</span>
                    <div className={styles.listCardMeta}>
                      <LastChecked date={a.lastChecked} />
                    </div>
                    <span className={styles.listCardSub}>
                      {a.fanZoneSlugs.length} fan zone{a.fanZoneSlugs.length !== 1 ? "s" : ""} · {a.hotspotSlugs.length} hotspot{a.hotspotSlugs.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  );
}
