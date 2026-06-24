import Link from "next/link";
import styles from "./SiteFooter.module.css";
import { FEATURES } from "@/lib/features";
import { SUBMIT_FORM_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.brandName}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{display: "inline", verticalAlign: "middle", marginRight: "6px"}}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
              TORONTO FAN ZONES
            </span>
            <p className={styles.brandDesc}>
              Your guide to watching the 2026 FIFA World Cup™ in Toronto.
              Fan zones and country hotspots across the city.
            </p>
            <p className={styles.disclaimer}>
              Information is manually maintained and may change without notice.
              This is a planning guide, not a live tracker. Always verify with
              official sources before you go.
            </p>
          </div>

          <div>
            <p className={styles.colTitle}>Explore</p>
            <nav className={styles.links} aria-label="Footer navigation">
              <Link href="/fan-zones">Fan Zones</Link>
              <Link href="/hotspots">Country Hotspots</Link>
              {FEATURES.nearMe && <Link href="/areas">Near Me</Link>}
              {FEATURES.submitSpot && <Link href="/submit">Submit a Spot</Link>}
            </nav>
          </div>

          <div>
            <p className={styles.colTitle}>Official Sources</p>
            <div className={styles.links}>
              <a
                href="https://www.toronto.ca/explore-enjoy/festivals-events/toronto-celebrates-2026-fifa-world-cup/"
                target="_blank"
                rel="noopener noreferrer"
              >
                City of Toronto
              </a>
              <a
                href="https://www.toronto2026.ca"
                target="_blank"
                rel="noopener noreferrer"
              >
                Toronto 2026
              </a>
              <a
                href="https://www.fifa.com/tickets"
                target="_blank"
                rel="noopener noreferrer"
              >
                FIFA Tickets
              </a>
              {FEATURES.submitSpot && (
                <a
                  href={SUBMIT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Submit a spot →
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © 2026 Toronto Fan Zones · Community guide · Not affiliated with
            FIFA or the City of Toronto
          </span>
          <span className={styles.lastUpdated}>Last updated: Jun 20, 2026</span>
        </div>
      </div>
    </footer>
  );
}
