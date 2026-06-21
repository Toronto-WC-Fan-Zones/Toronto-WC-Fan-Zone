import styles from "./SubmitSpotBanner.module.css";
import { SUBMIT_FORM_URL } from "@/lib/constants";

export function SubmitSpotBanner() {
  return (
    <section className={styles.banner} aria-label="Submit a spot">
      <div className={styles.inner}>
        <span className={styles.icon} aria-hidden="true">🗺</span>
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
