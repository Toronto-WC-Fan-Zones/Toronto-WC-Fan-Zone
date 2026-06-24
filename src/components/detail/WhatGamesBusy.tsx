import styles from "./WhatGamesBusy.module.css";

interface WhatGamesBusyProps {
  veryBusyGames?: string[];
  lessBusyGames?: string[];
}

export function WhatGamesBusy({ veryBusyGames = [], lessBusyGames = [] }: WhatGamesBusyProps) {
  if (veryBusyGames.length === 0 && lessBusyGames.length === 0) return null;

  return (
    <section className={styles.card} aria-labelledby="busy-games-heading" id="busy-games">
      <h2 className={styles.heading} id="busy-games-heading">
        <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        What Games Get Busy?
      </h2>
      <div className={styles.grid}>
        {veryBusyGames.length > 0 && (
          <div className={styles.column}>
            <p className={styles.columnLabel}>
              <span className={styles.dotRed} aria-hidden="true" />
              Very Busy
            </p>
            <ul className={styles.chipList} role="list">
              {veryBusyGames.map((g) => (
                <li key={g} className={`${styles.chip} ${styles.chipBusy}`}>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        )}
        {lessBusyGames.length > 0 && (
          <div className={styles.column}>
            <p className={styles.columnLabel}>
              <span className={styles.dotGreen} aria-hidden="true" />
              Less Busy
            </p>
            <ul className={styles.chipList} role="list">
              {lessBusyGames.map((g) => (
                <li key={g} className={`${styles.chip} ${styles.chipQuiet}`}>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
