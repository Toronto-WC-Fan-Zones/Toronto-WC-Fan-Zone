import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { FEATURES } from "@/lib/features";

const baseNavLinks = [
  { href: "/fan-zones", label: "Fan Zones" },
  { href: "/hotspots", label: "Country Hotspots" },
];

const eventsLink = { href: "/events", label: "Events" };
const nearMeLink = { href: "/areas", label: "Near Me" };

const navLinks = [
  baseNavLinks[0],
  baseNavLinks[1],
  ...(FEATURES.watchParties ? [eventsLink] : []),
  ...(FEATURES.nearMe ? [nearMeLink] : []),
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Toronto Fan Zones - Home">
          <span className={styles.logoIcon} aria-hidden="true">⚽</span>
          <span className={styles.logoText}>
            TORONTO FAN ZONES
            <span className={styles.logoSub}>2026 FIFA World Cup™ Guide</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.navLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link
            href="/fan-zones"
            className={styles.searchBtn}
            aria-label="Search fan zones"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
        </div>

        <button
          className={styles.menuToggle}
          aria-label="Open menu"
          aria-expanded="false"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
