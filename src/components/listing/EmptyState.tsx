import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
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
