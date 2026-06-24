import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllEvents, getEventBySlug, getHotspotsByCountry } from "@/lib/data";
import { EntryTypeBadge } from "@/components/ui/EntryTypeBadge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { CountryBadges } from "@/components/ui/CountryBadges";
import { LastChecked } from "@/components/ui/LastChecked";
import { SourceList } from "@/components/detail/SourceList";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { formatTorontoDateTime } from "@/lib/dates";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.name,
    description: `${event.name} at ${event.venueName ?? event.neighbourhood}, Toronto.`,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const mapsQuery = event.venueName
    ? `${event.venueName} ${event.neighbourhood} Toronto`
    : `${event.neighbourhood} Toronto`;
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(mapsQuery)}`;

  const relatedHotspots = event.relatedCountries
    .flatMap((country) => getHotspotsByCountry(country))
    .filter(
      (h, i, arr) => arr.findIndex((other) => other.slug === h.slug) === i
    );

  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/events" className={styles.backLink}>
          ← Back to all events
        </Link>

        <header className={styles.header}>
          <CountryBadges countries={event.relatedCountries} />

          <h1 className={styles.title}>{event.name}</h1>

          <div className={styles.badges}>
            <EntryTypeBadge type={event.entryType} />
            <ConfidenceBadge confidence={event.confidence} />
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <span aria-hidden="true">🗓</span>{" "}
              {formatTorontoDateTime(event.startDateTime, {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
            <span className={styles.metaItem}>
              <span aria-hidden="true">📍</span>{" "}
              {event.venueName ? `${event.venueName}, ` : ""}
              {event.neighbourhood}
            </span>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsBtn}
          >
            Get Directions →
          </a>

          <LastChecked date={event.lastChecked} />
        </header>

        <div className={styles.body}>
          {relatedHotspots.length > 0 && (
            <div className={styles.relatedHotspots}>
              <h2 className={styles.relatedHotspotsHeading}>
                Related Country Hotspot{relatedHotspots.length !== 1 ? "s" : ""}
              </h2>
              {relatedHotspots.map((h) => (
                <Link
                  key={h.slug}
                  href={`/hotspots/${h.slug}`}
                  className={styles.relatedHotspotLink}
                >
                  <FlagIcon code={h.countryCode} size={15} /> {h.name} →
                </Link>
              ))}
            </div>
          )}

          <SourceList sources={event.sources} lastChecked={event.lastChecked} />
        </div>
      </div>
    </div>
  );
}
