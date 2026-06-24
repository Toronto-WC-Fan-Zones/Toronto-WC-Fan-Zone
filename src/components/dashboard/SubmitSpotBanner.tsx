import styles from "./SubmitSpotBanner.module.css";
import { SUBMIT_FORM_URL } from "@/lib/constants";

export function SubmitSpotBanner() {
  return (
    <section className={styles.banner} aria-label="Submit a spot">
      <div className={styles.inner}>
        <span className={styles.icon} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" y1="3" x2="9" y2="18" />
            <line x1="15" y1="6" x2="15" y2="21" />
          </svg>
        </span>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Know a spot we should include?</h2>
          <p className={styles.sub}>
            Help other fans by submitting a fan zone, bar, restaurant, or watch party.
          </p>
        </div>
        <a
          href={SUBMIT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Submit a Spot
        </a>
      </div>
    </section>
  );
}
