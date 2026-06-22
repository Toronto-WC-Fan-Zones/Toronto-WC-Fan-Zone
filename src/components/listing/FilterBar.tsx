"use client";

import styles from "./FilterBar.module.css";

export interface FilterState {
  search: string;
  entryType: string;
  neighbourhood: string;
  crowdRisk: string;
  country: string;
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  neighbourhoods: string[];
  countries?: string[];
  showCrowdRisk?: boolean;
  placeholder?: string;
  resultsCount: number;
}

export function FilterBar({
  filters,
  onChange,
  neighbourhoods,
  countries,
  showCrowdRisk = true,
  placeholder = "Search team, country, venue, or area...",
  resultsCount,
}: FilterBarProps) {
  const update = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value });

  const activeFilters = Object.entries(filters).filter(
    ([k, v]) => k !== "search" && v !== ""
  );

  return (
    <div className={styles.bar} role="search" aria-label="Filter options">
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon} aria-hidden="true">🔍</span>
        <input
          type="search"
          className={styles.search}
          placeholder={placeholder}
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          aria-label="Search venues"
        />
      </div>

      <div className={styles.selects}>
        <select
          className={styles.select}
          value={filters.entryType}
          onChange={(e) => update("entryType", e.target.value)}
          aria-label="Filter by entry type"
        >
          <option value="">All entry types</option>
          <option value="free">Free</option>
          <option value="ticketed">Ticket Required</option>
          <option value="reservation">Reservation</option>
          <option value="walk-in">Walk-ins OK</option>
        </select>

        {neighbourhoods.length > 0 && (
          <select
            className={styles.select}
            value={filters.neighbourhood}
            onChange={(e) => update("neighbourhood", e.target.value)}
            aria-label="Filter by neighbourhood"
          >
            <option value="">All areas</option>
            {neighbourhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        )}

        {countries && countries.length > 0 && (
          <select
            className={styles.select}
            value={filters.country}
            onChange={(e) => update("country", e.target.value)}
            aria-label="Filter by country"
          >
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}

        {showCrowdRisk && (
          <select
            className={styles.select}
            value={filters.crowdRisk}
            onChange={(e) => update("crowdRisk", e.target.value)}
            aria-label="Filter by crowd level"
          >
            <option value="">Any crowd</option>
            <option value="low">Low Crowd</option>
            <option value="medium">Medium Crowd</option>
            <option value="high">High Crowd Risk</option>
            <option value="packed">Very Packed</option>
          </select>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className={styles.activeFilters} aria-label="Active filters">
          {activeFilters.map(([key, value]) => (
            <span key={key} className={styles.activeTag}>
              {value}
              <button
                className={styles.removeTag}
                onClick={() => update(key as keyof FilterState, "")}
                aria-label={`Remove ${value} filter`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      <span className={styles.resultsCount} aria-live="polite">
        {resultsCount} result{resultsCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
