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
      <div className={styles.row}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
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
            <option value="">Entry type</option>
            <option value="free">Free</option>
            <option value="ticketed">Ticketed</option>
            <option value="reservation">Reservation</option>
            <option value="walk-in">Walk-in</option>
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
              <option value="low">Low crowd</option>
              <option value="medium">Medium crowd</option>
              <option value="high">High crowd risk</option>
              <option value="packed">Very packed</option>
            </select>
          )}
        </div>

        <span className={styles.resultsCount} aria-live="polite">
          {resultsCount} result{resultsCount !== 1 ? "s" : ""}
        </span>
      </div>

      {activeFilters.length > 0 && (
        <div className={styles.activeFilters} aria-label="Active filters">
          {activeFilters.map(([key, value]) => (
            <button
              key={key}
              className={styles.activeTag}
              onClick={() => update(key as keyof FilterState, "")}
              aria-label={`Remove ${value} filter`}
            >
              {value}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ))}
          <button
            className={styles.clearAll}
            onClick={() => onChange({ search: filters.search, entryType: "", neighbourhood: "", crowdRisk: "", country: "" })}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
