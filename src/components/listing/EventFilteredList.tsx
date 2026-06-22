"use client";

import { useState } from "react";
import { FilterBar, type FilterState } from "./FilterBar";
import { EmptyState } from "./EmptyState";
import { CommunityEventCard } from "@/components/cards/CommunityEventCard";
import listStyles from "./FanZoneFilteredList.module.css";
import type { CommunityEvent } from "@/types";

interface EventFilteredListProps {
  events: CommunityEvent[];
}

const EMPTY_FILTERS: FilterState = {
  search: "",
  entryType: "",
  neighbourhood: "",
  crowdRisk: "",
  country: "",
};

export function EventFilteredList({ events }: EventFilteredListProps) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const neighbourhoods = [...new Set(events.map((e) => e.neighbourhood))];
  const countries = [
    ...new Set(events.flatMap((e) => e.relatedCountries)),
  ].sort();

  const filtered = events
    .filter((e) => {
      const q = filters.search.toLowerCase();
      if (
        q &&
        !e.name.toLowerCase().includes(q) &&
        !e.neighbourhood.toLowerCase().includes(q) &&
        !(e.venueName ?? "").toLowerCase().includes(q) &&
        !e.relatedCountries.some((c) => c.toLowerCase().includes(q))
      )
        return false;
      if (filters.entryType && e.entryType !== filters.entryType) return false;
      if (filters.neighbourhood && e.neighbourhood !== filters.neighbourhood)
        return false;
      if (filters.country && !e.relatedCountries.includes(filters.country))
        return false;
      return true;
    })
    .sort(
      (a, b) =>
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
    );

  return (
    <>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        neighbourhoods={neighbourhoods}
        countries={countries}
        showCrowdRisk={false}
        placeholder="Search by country, venue, or neighbourhood..."
        resultsCount={filtered.length}
      />

      {filtered.length > 0 ? (
        <div className={listStyles.grid} role="list">
          {filtered.map((e) => (
            <div key={e.slug} role="listitem">
              <CommunityEventCard event={e} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState onClear={() => setFilters(EMPTY_FILTERS)} />
      )}
    </>
  );
}
