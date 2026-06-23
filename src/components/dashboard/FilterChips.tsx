import Link from "next/link";
import styles from "./FilterChips.module.css";

const chips = [
  { label: "Fan Zones", href: "/fan-zones" },
  { label: "Country Hotspots", href: "/hotspots" },
];

export function FilterChips() {
  return (
    <nav className={styles.wrapper} aria-label="Quick filters">
      <div className={styles.inner}>
        <div className={styles.group}>
          {chips.map((chip, index) => (
            <Link
              key={chip.href}
              href={chip.href}
              className={`${styles.chip} ${index === 0 ? styles.chipActive : ""}`}
            >
              {chip.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
