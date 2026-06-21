import type { Metadata } from "next";
import { getAllFanZones } from "@/lib/data";
import { FanZoneFilteredList } from "@/components/listing/FanZoneFilteredList";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Official Fan Zones",
  description:
    "Browse all official 2026 FIFA World Cup fan zones in Toronto. Entry requirements, crowd risk, tickets, and arrival tips.",
};

export default function FanZonesPage() {
  const zones = getAllFanZones();

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Official Fan Zones</h1>
          <p className={styles.subtitle}>
            City-sanctioned public viewing areas. Entry requirements and ticket
            availability vary - always check before you go.
          </p>
        </header>

        <FanZoneFilteredList zones={zones} />
      </div>
    </div>
  );
}
