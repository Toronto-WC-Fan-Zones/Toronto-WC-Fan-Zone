import { Badge } from "./Badge";
import type { CrowdRisk } from "@/types";
import { CROWD_RISK_LABELS } from "@/lib/constants";

interface CrowdRiskBadgeProps {
  risk: CrowdRisk;
}

const variantMap: Record<CrowdRisk, "green" | "amber" | "orange" | "red"> = {
  low: "green",
  medium: "amber",
  high: "orange",
  packed: "red",
};

export function CrowdRiskBadge({ risk }: CrowdRiskBadgeProps) {
  return (
    <Badge variant={variantMap[risk]}>
      {CROWD_RISK_LABELS[risk]}
    </Badge>
  );
}
