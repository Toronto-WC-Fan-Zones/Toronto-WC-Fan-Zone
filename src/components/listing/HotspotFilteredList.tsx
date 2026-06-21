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
  "Downtown Core",
  "East End",
  "Scarborough",
  "North York",
];

const REGION_DESCRIPTIONS: Record<HotspotRegion, string> = {
  "West End": "Little Portugal, Little Italy, Roncesvalles, and Kensington - Toronto's most passionate European community corridors.",
  "Downtown Core": "Chinatown, Koreatown, and Kensington Market - diverse, walkable, and central.",
  "East End": "Greektown, Gerrard India Bazaar, and Little Jamaica - vibrant east-side neighbourhoods with deep cultural roots.",
  "Scarborough": "Agincourt and Malvern - large East/South Asian and Caribbean communities away from the downtown crowds.",
  "North York": "North York Centre and Wilson Heights - North African and Iranian community hubs along Yonge and Bathurst.",
};

function isFiltered(filters: FilterState): boolean {
  return Object.values(filters).some((v) => v !== "");
}

export function HotspotFilteredList({ hotspots }: HotspotFilteredListProps) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

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
    return true;
  });

  const showGrouped = !isFiltered(filters);

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
                    <CountryHotspotCard hotspot={h} />
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

      {filtered.length > 0 ? (
        <div className={listStyles.grid} role="list">
          {filtered.map((h) => (
            <div key={h.slug} role="listitem">
              <CountryHotspotCard hotspot={h} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState onClear={() => setFilters(EMPTY_FILTERS)} />
      )}
    </>
  );
}
