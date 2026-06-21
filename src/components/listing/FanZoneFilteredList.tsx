"use client";

import { useState } from "react";
import { FilterBar, type FilterState } from "./FilterBar";
import { EmptyState } from "./EmptyState";
import { FanZoneCard } from "@/components/cards/FanZoneCard";
import styles from "./FanZoneFilteredList.module.css";
import type { OfficialFanZone } from "@/types";

interface FanZoneFilteredListProps {
  zones: OfficialFanZone[];
}

const EMPTY_FILTERS: FilterState = {
  search: "",
  entryType: "",
  neighbourhood: "",
  crowdRisk: "",
  country: "",
};

export function FanZoneFilteredList({ zones }: FanZoneFilteredListProps) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const neighbourhoods = [...new Set(zones.map((z) => z.neighbourhood))];

  const filtered = zones.filter((z) => {
    const q = filters.search.toLowerCase();
    if (q && !z.name.toLowerCase().includes(q) && !z.neighbourhood.toLowerCase().includes(q))
      return false;
    if (filters.entryType && z.entryRequirements.type !== filters.entryType)
      return false;
    if (filters.neighbourhood && z.neighbourhood !== filters.neighbourhood)
      return false;
    if (filters.crowdRisk && z.crowdRisk !== filters.crowdRisk) return false;
    return true;
  });

  return (
    <>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        neighbourhoods={neighbourhoods}
        placeholder="Search fan zones..."
        resultsCount={filtered.length}
      />

      {filtered.length > 0 ? (
        <div className={styles.grid} role="list">
          {filtered.map((z) => (
            <div key={z.slug} role="listitem">
              <FanZoneCard zone={z} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState onClear={() => setFilters(EMPTY_FILTERS)} />
      )}
    </>
  );
}
