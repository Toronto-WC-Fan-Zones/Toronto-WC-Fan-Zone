import styles from "./RestrictionsList.module.css";

interface RestrictionsListProps {
  restrictions: string[];
}

export function RestrictionsList({ restrictions }: RestrictionsListProps) {
  return (
    <section
      className={styles.section}
      aria-labelledby="restrictions-heading"
    >
      <h2 className={styles.heading} id="restrictions-heading">
        Restrictions &amp; Rules
      </h2>

      {restrictions.length > 0 ? (
        <ul className={styles.list}>
          {restrictions.map((r) => (
            <li key={r} className={styles.item}>
              <span className={styles.bullet} aria-hidden="true">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" aria-hidden="true">
                  <circle cx="3" cy="3" r="3" />
                </svg>
              </span>
              {r}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          No specific restrictions reported. Unclear - check official sources.
        </p>
      )}
    </section>
  );
}
