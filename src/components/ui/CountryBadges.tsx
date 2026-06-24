import styles from "./CountryBadges.module.css";
import { getCountryCode } from "@/lib/countries";
import { FlagIcon } from "@/components/ui/FlagIcon";

interface CountryBadgesProps {
  countries: string[];
}

export function CountryBadges({ countries }: CountryBadgesProps) {
  if (countries.length === 0) return null;

  return (
    <div className={styles.list} aria-label="Related countries">
      {countries.map((country) => {
        const code = getCountryCode(country);
        return (
          <span key={country} className={styles.badge}>
            {code && <FlagIcon code={code} size={14} />}
            {country}
          </span>
        );
      })}
    </div>
  );
}
