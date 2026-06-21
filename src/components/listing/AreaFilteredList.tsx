"use client";

import { useState } from "react";
import { EmptyState } from "./EmptyState";
import { AreaGuideCard } from "@/components/cards/AreaGuideCard";
import styles from "./FanZoneFilteredList.module.css";
import type { AreaGuide } from "@/types";

interface AreaFilteredListProps {
  areas: AreaGuide[];
}

export function AreaFilteredList({ areas }: AreaFilteredListProps) {
  const [search, setSearch] = useState("");

  const filtered = areas.filter((a) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <input
          type="search"
          placeholder="Search neighbourhoods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1px solid var(--border-color)",
            borderRadius: 8,
            fontSize: "0.875rem",
            fontFamily: "inherit",
            background: "var(--bg-page)",
          }}
          aria-label="Search areas"
        />
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid} role="list">
          {filtered.map((a) => (
            <div key={a.slug} role="listitem">
              <AreaGuideCard area={a} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState onClear={() => setSearch("")} />
      )}
    </>
  );
}
