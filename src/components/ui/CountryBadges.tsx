import styles from "./CountryBadges.module.css";
import { getFlagEmoji } from "@/lib/countries";

interface CountryBadgesProps {
  countries: string[];
}

export function CountryBadges({ countries }: CountryBadgesProps) {
  if (countries.length === 0) return null;

  return (
    <div className={styles.list} aria-label="Related countries">
      {countries.map((country) => {
        const flag = getFlagEmoji(country);
        return (
          <span key={country} className={styles.badge}>
            {flag && (
              <span className={styles.flag} aria-hidden="true">
                {flag}
              </span>
            )}
            {country}
          </span>
        );
      })}
    </div>
  );
}
