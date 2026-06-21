import { Badge } from "./Badge";
import type { Confidence } from "@/types";
import { CONFIDENCE_LABELS } from "@/lib/constants";

interface ConfidenceBadgeProps {
  confidence: Confidence;
}

const variantMap: Record<
  Confidence,
  "blue" | "green" | "amber" | "grey"
> = {
  official: "blue",
  manually_verified: "green",
  user_submitted: "amber",
  unconfirmed: "grey",
};

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  return (
    <Badge variant={variantMap[confidence]}>
      {CONFIDENCE_LABELS[confidence]}
    </Badge>
  );
}
