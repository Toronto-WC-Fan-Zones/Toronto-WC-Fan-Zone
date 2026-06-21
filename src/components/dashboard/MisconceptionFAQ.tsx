import styles from "./MisconceptionFAQ.module.css";
import type { MisconceptionFAQ as MisconceptionFAQType } from "@/types";

interface MisconceptionFAQProps {
  items: MisconceptionFAQType[];
}

export function MisconceptionFAQ({ items }: MisconceptionFAQProps) {
  return (
    <section
      className={styles.section}
      aria-labelledby="faq-heading"
    >
      <h2 className={styles.title} id="faq-heading">
        Common Misconceptions
      </h2>
      <p className={styles.subtitle}>
        Things people get wrong about World Cup fan zones - read before you go.
      </p>

      <div className={styles.list}>
        {items.map((item) => (
          <details key={item.id} className={styles.item}>
            <summary className={styles.summary}>
              <span className={styles.summaryLeft}>
                <span
                  className={`${styles.severityDot} ${styles[item.severity]}`}
                  aria-hidden="true"
                />
                {item.question}
              </span>
              <span className={styles.chevron} aria-hidden="true">
                ▾
              </span>
            </summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
