import type { Metadata } from "next";
import styles from "./page.module.css";
import { SUBMIT_FORM_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Submit a Spot",
  description:
    "Know a great place to watch the 2026 FIFA World Cup in Toronto? Submit it for review.",
};

export default function SubmitPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.card}>
          <span className={styles.icon} aria-hidden="true">
            📍
          </span>
          <h1 className={styles.title}>Submit a Spot</h1>
          <p className={styles.lead}>
            Know a great bar, restaurant, community space, or watch party that
            belongs on this guide? Help other fans find it.
          </p>

          <div className={styles.howItWorks}>
            <h2 className={styles.subheading}>How it works</h2>
            <ol className={styles.steps}>
              <li className={styles.step}>
                <span className={styles.stepNum}>1</span>
                <span>
                  Fill in the external form - takes about 2 minutes.
                </span>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNum}>2</span>
                <span>
                  We review submissions manually before publishing. We verify
                  entry rules, hours, and atmosphere.
                </span>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNum}>3</span>
                <span>
                  Accepted spots appear in the next update with a{" "}
                  <strong>Community-reported</strong> confidence label.
                </span>
              </li>
            </ol>
          </div>

          <div className={styles.notice}>
            <span aria-hidden="true">ℹ</span> We review submissions manually.
            Accepted spots appear in the next update. We don&apos;t commit to a
            timeline.
          </div>

          <a
            href={SUBMIT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
            aria-label="Open submission form - opens in new tab"
          >
            Open Submission Form →
          </a>
        </div>
      </div>
    </div>
  );
}
