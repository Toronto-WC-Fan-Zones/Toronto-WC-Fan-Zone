import Link from "next/link";
import styles from "./FilterChips.module.css";

const contentTypeChips = [
  { label: "Fan Zones", href: "/fan-zones" },
  { label: "Country Hotspots", href: "/hotspots" },
];

const modifierChips = [
  { label: "Free Entry", href: "/fan-zones?entry=free" },
  { label: "Reservation", href: "/fan-zones?entry=reservation" },
  { label: "Walk-ins OK", href: "/hotspots?entry=walk-in" },
  { label: "Canada Games", href: "/hotspots?country=Canada" },
];

export function FilterChips() {
  return (
    <nav className={styles.wrapper} aria-label="Quick filters">
      <div className={styles.inner}>
        <div className={styles.group}>
          {contentTypeChips.map((chip, index) => (
            <Link
              key={chip.href}
              href={chip.href}
              className={`${styles.chip} ${index === 0 ? styles.chipActive : ""}`}
            >
              {chip.label}
            </Link>
          ))}
        </div>
        <span className={styles.divider} aria-hidden="true" />
        <div className={styles.group}>
          {modifierChips.map((chip) => (
            <Link key={chip.href} href={chip.href} className={styles.chip}>
              {chip.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
