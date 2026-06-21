import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">🔍</span>
      <h3 className={styles.title}>No spots match these filters</h3>
      <p className={styles.message}>
        Try removing a filter or browsing all options.
      </p>
      <button className={styles.clearBtn} onClick={onClear}>
        Clear all filters
      </button>
    </div>
  );
}
