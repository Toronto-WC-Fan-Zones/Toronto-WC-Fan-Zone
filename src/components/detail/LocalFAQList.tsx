import styles from "./LocalFAQList.module.css";
import type { LocalFAQ } from "@/types";

interface LocalFAQListProps {
  faqs: LocalFAQ[];
}

export function LocalFAQList({ faqs }: LocalFAQListProps) {
  return (
    <section className={styles.section} aria-labelledby="common-questions-heading">
      <h2 className={styles.heading} id="common-questions-heading">
        Common questions
      </h2>
      <div className={styles.list}>
        {faqs.map((faq) => (
          <div key={faq.question} className={styles.row}>
            <span className={styles.qIcon} aria-hidden="true">?</span>
            <div className={styles.question}>{faq.question}</div>
            <div className={styles.answer}>{faq.answer}</div>
            <span className={styles.chevron} aria-hidden="true">›</span>
          </div>
        ))}
      </div>
    </section>
  );
}
