import type { Metadata } from "next";
import { getAllAreas } from "@/lib/data";
import { AreaFilteredList } from "@/components/listing/AreaFilteredList";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Nearby Areas",
  description:
    "Find places to watch the 2026 FIFA World Cup near your office, home, or neighbourhood in Toronto.",
};

export default function AreasPage() {
  const areas = getAllAreas();

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Find Spots Near You</h1>
          <p className={styles.subtitle}>
            Browse by neighbourhood to find fan zones and hotspots close to
            where you live, work, or commute.
          </p>
        </header>

        <AreaFilteredList areas={areas} />
      </div>
    </div>
  );
}
