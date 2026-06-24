import type { ReactNode } from "react";
import styles from "./TrustFooter.module.css";
import { SUBMIT_FORM_URL } from "@/lib/constants";

const trustBadges: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21.5 2v6h-6" /><path d="M2.5 12A10 10 0 0 1 20.5 5.5" />
        <path d="M2.5 22v-6h6" /><path d="M21.5 12A10 10 0 0 1 3.5 18.5" />
      </svg>
    ),
    title: "Always Updated",
    desc: "We monitor official sources and community updates.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: "Verified & Community",
    desc: "Info from official sources and real fans like you.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Transparent",
    desc: "We show what we know, and what we don't.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
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
