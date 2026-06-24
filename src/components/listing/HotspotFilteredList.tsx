"use client";

import { useState } from "react";
import { FilterBar, type FilterState } from "./FilterBar";
import { EmptyState } from "./EmptyState";
import { CountryHotspotCard } from "@/components/cards/CountryHotspotCard";
import styles from "./HotspotFilteredList.module.css";
import listStyles from "./FanZoneFilteredList.module.css";
import type { CountryHotspot, HotspotRegion } from "@/types";

interface HotspotFilteredListProps {
  hotspots: CountryHotspot[];
  eventCounts: Record<string, number>;
  showEventControls?: boolean;
}

const EMPTY_FILTERS: FilterState = {
  search: "",
  entryType: "",
  neighbourhood: "",
  crowdRisk: "",
  country: "",
};

const REGION_ORDER: HotspotRegion[] = [
  "West End",
  "Etobicoke",
  "Downtown Core",
  "East End",
  "Scarborough",
  "North York",
];

const REGION_DESCRIPTIONS: Record<HotspotRegion, string> = {
  "West End": "Little Portugal, Little Italy, Roncesvalles, and Kensington - Toronto's most passionate European community corridors.",
  "Etobicoke": "Mimico and the Lakeshore strip - a quieter, institution-anchored stretch of southwest Toronto with deep immigrant roots.",
  "Downtown Core": "Chinatown, Koreatown, Little Tokyo, and Kensington Market - diverse, walkable, and central.",
  "East End": "Greektown, Gerrard India Bazaar, and Little Jamaica - vibrant east-side neighbourhoods with deep cultural roots.",
  "Scarborough": "Agincourt, Malvern, and Arab Town - large East/South Asian, Caribbean, and Arab communities away from the downtown crowds.",
  "North York": "North York Centre, Wilson Heights, and Weston-Jane - North African, Iranian, and West African community hubs.",
};

function isFiltered(filters: FilterState): boolean {
  return Object.values(filters).some((v) => v !== "");
}

export function HotspotFilteredList({
  hotspots,
  eventCounts,
  showEventControls = true,
}: HotspotFilteredListProps) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [onlyWithEvents, setOnlyWithEvents] = useState(false);

  const neighbourhoods = [...new Set(hotspots.map((h) => h.neighbourhood))];
  const countries = [...new Set(hotspots.map((h) => h.country))];

  const filtered = hotspots.filter((h) => {
    const q = filters.search.toLowerCase();
    if (
      q &&
      !h.name.toLowerCase().includes(q) &&
      !h.country.toLowerCase().includes(q) &&
      !h.neighbourhood.toLowerCase().includes(q) &&
      !h.region.toLowerCase().includes(q)
    )
      return false;
    if (filters.entryType && h.entryRequirements.type !== filters.entryType)
      return false;
    if (filters.neighbourhood && h.neighbourhood !== filters.neighbourhood)
      return false;
    if (filters.crowdRisk && h.crowdRisk !== filters.crowdRisk) return false;
    if (filters.country && h.country !== filters.country) return false;
    if (showEventControls && onlyWithEvents && !eventCounts[h.slug]) return false;
    return true;
  });

  const showGrouped = !isFiltered(filters) && !(showEventControls && onlyWithEvents);

  const eventsFilterToggle = showEventControls ? (
    <label className={styles.eventsFilterToggle}>
      <input
        type="checkbox"
        checked={onlyWithEvents}
        onChange={(e) => setOnlyWithEvents(e.target.checked)}
      />
      Only show hotspots with upcoming events
    </label>
  ) : null;

  if (showGrouped) {
    const byRegion = REGION_ORDER.reduce<Record<string, CountryHotspot[]>>(
      (acc, region) => {
        const items = hotspots.filter((h) => h.region === region);
        if (items.length > 0) acc[region] = items;
        return acc;
      },
      {}
    );

    return (
      <>
        <FilterBar
          filters={filters}
          onChange={setFilters}
          neighbourhoods={neighbourhoods}
          countries={countries}
          placeholder="Search by country, neighbourhood, or region..."
          resultsCount={hotspots.length}
        />
        {eventsFilterToggle}

        <div className={styles.regionList}>
          {Object.entries(byRegion).map(([region, items]) => (
            <section key={region} className={styles.regionSection}>
              <div className={styles.regionHeader}>
                <h2 className={styles.regionTitle}>{region}</h2>
                <p className={styles.regionDesc}>
                  {REGION_DESCRIPTIONS[region as HotspotRegion]}
                </p>
              </div>
              <div className={listStyles.grid} role="list">
                {items.map((h) => (
                  <div key={h.slug} role="listitem">
                    <CountryHotspotCard
                      hotspot={h}
                      eventCount={eventCounts[h.slug] ?? 0}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        neighbourhoods={neighbourhoods}
        countries={countries}
        placeholder="Search by country, neighbourhood, or region..."
        resultsCount={filtered.length}
      />
      {eventsFilterToggle}

      {filtered.length > 0 ? (
        <div className={listStyles.grid} role="list">
          {filtered.map((h) => (
            <div key={h.slug} role="listitem">
              <CountryHotspotCard
                hotspot={h}
                eventCount={eventCounts[h.slug] ?? 0}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          onClear={() => {
            setFilters(EMPTY_FILTERS);
            setOnlyWithEvents(false);
          }}
        />
      )}
    </>
  );
}
