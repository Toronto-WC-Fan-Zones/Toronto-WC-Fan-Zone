import type { Metadata } from "next";
import { getAllFanZones } from "@/lib/data";
import { FanZoneFilteredList } from "@/components/listing/FanZoneFilteredList";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fan Zones",
  description:
    "Browse all 2026 FIFA World Cup fan zones in Toronto. Entry requirements, crowd risk, tickets, and arrival tips.",
};

export default function FanZonesPage() {
  const zones = getAllFanZones();

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Fan Zones</h1>
          <p className={styles.subtitle}>
            Public viewing areas and watch venues across Toronto. Entry
            requirements and ticket availability vary — always check before you go.
          </p>
        </header>

        <FanZoneFilteredList zones={zones} />
      </div>
    </div>
  );
}
