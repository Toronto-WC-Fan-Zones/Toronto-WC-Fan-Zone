import styles from "./DisclaimerRibbon.module.css";

export function DisclaimerRibbon() {
  return (
    <div className={styles.ribbon} role="note">
      <strong>Planning guide only</strong> - Information is manually maintained
      and may be outdated. Always verify before you leave.{" "}
      <a
        href="https://www.toronto.ca/explore-enjoy/festivals-events/toronto-celebrates-2026-fifa-world-cup/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Official City of Toronto page →
      </a>
    </div>
  );
}
