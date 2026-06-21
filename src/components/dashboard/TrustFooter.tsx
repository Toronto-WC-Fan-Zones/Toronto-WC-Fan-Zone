import styles from "./TrustFooter.module.css";
import { SUBMIT_FORM_URL } from "@/lib/constants";

const trustBadges = [
  {
    icon: "🔄",
    title: "Always Updated",
    desc: "We monitor official sources and community updates.",
  },
  {
    icon: "✓",
    title: "Verified & Community",
    desc: "Info from official sources and real fans like you.",
  },
  {
    icon: "👁",
    title: "Transparent",
    desc: "We show what we know, and what we don't.",
  },
  {
    icon: "🕐",
    title: "Last Checked",
    desc: "Jun 16, 2026",
  },
];

export function TrustFooter() {
  return (
    <section className={styles.section} aria-labelledby="trust-heading">
      <div className={styles.left}>
        <h2 className={styles.heading} id="trust-heading">
          Know a spot we should include?
        </h2>
        <p className={styles.subtext}>
          Help other fans by submitting a fan zone, bar, restaurant, or watch
          party.
        </p>
        <div className={styles.badges} role="list">
          {trustBadges.map((b) => (
            <div key={b.title} className={styles.badge} role="listitem">
              <span className={styles.badgeIcon} aria-hidden="true">
                {b.icon}
              </span>
              <span className={styles.badgeText}>
                <strong>{b.title}</strong>
                {b.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={SUBMIT_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
        aria-label="Submit a spot - opens external form"
      >
        Submit a Spot →
      </a>
    </section>
  );
}
