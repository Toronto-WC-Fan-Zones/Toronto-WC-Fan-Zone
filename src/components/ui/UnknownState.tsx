import styles from "./UnknownState.module.css";

interface UnknownStateProps {
  label?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export function UnknownState({
  label = "Unclear",
  sourceUrl,
  sourceLabel = "check source",
}: UnknownStateProps) {
  return (
    <span className={styles.wrapper}>
      {label}
      {sourceUrl && (
        <>
          {" - "}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {sourceLabel}
          </a>
        </>
      )}
    </span>
  );
}
