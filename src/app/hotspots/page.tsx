import type { Metadata } from "next";
import { getAllHotspots, getPublicEventsByCountry } from "@/lib/data";
import { HotspotFilteredList } from "@/components/listing/HotspotFilteredList";
import { FEATURES } from "@/lib/features";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Country Fan Hotspots",
  description:
    "Find where fans of specific countries gather in Toronto to watch the 2026 FIFA World Cup.",
};

export default function HotspotsPage() {
  const hotspots = getAllHotspots();
  const eventCounts = FEATURES.watchParties
    ? Object.fromEntries(
        hotspots.map((h) => [h.slug, getPublicEventsByCountry(h.country).length])
      )
    : {};

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Country Fan Hotspots</h1>
          <p className={styles.subtitle}>
            Discover the neighbourhoods where national team fans gather across
            Toronto - organized by city region.
          </p>
        </header>

        <HotspotFilteredList
          hotspots={hotspots}
          eventCounts={eventCounts}
          showEventControls={FEATURES.watchParties}
        />
      </div>
    </div>
  );
}
