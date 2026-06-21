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
        <span aria-hidden="true">⛔</span> Restrictions
      </h2>

      {restrictions.length > 0 ? (
        <ul className={styles.list}>
          {restrictions.map((r) => (
            <li key={r} className={styles.item}>
              <span className={styles.bullet} aria-hidden="true">■</span>
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
