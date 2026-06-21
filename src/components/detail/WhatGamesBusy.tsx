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
        <span className={styles.icon} aria-hidden="true">📅</span>
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
