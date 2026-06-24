import styles from "./CrowdRiskBadge.module.css";
import type { CrowdRisk } from "@/types";
import { CROWD_RISK_LABELS } from "@/lib/constants";

interface CrowdRiskBadgeProps {
  risk: CrowdRisk;
}

const dotColorMap: Record<CrowdRisk, string> = {
  low: "var(--color-green)",
  medium: "var(--color-amber)",
  high: "var(--color-orange)",
  packed: "var(--color-red)",
};

export function CrowdRiskBadge({ risk }: CrowdRiskBadgeProps) {
  return (
    <span className={styles.wrapper}>
      <span
        className={styles.dot}
        style={{ background: dotColorMap[risk] }}
        aria-hidden="true"
      />
      {CROWD_RISK_LABELS[risk]}
    </span>
  );
}
