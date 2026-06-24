import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicEvents } from "@/lib/data";
import { EventFilteredList } from "@/components/listing/EventFilteredList";
import { FEATURES } from "@/lib/features";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "World Cup Watch Parties & Events",
  description:
    "Country-themed watch parties and events happening around Toronto during the 2026 FIFA World Cup.",
};

export default function EventsPage() {
  if (!FEATURES.watchParties) notFound();

  const events = getPublicEvents();

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Watch Parties & Events</h1>
          <p className={styles.subtitle}>
            Community watch parties and events around Toronto, tagged by the
            countries they&apos;re relevant to.
          </p>
        </header>

        <EventFilteredList events={events} />
      </div>
    </div>
  );
}
