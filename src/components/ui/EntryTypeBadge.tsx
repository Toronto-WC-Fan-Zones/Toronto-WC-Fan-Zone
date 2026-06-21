import { Badge } from "./Badge";
import type { EntryType } from "@/types";
import { ENTRY_TYPE_LABELS } from "@/lib/constants";

interface EntryTypeBadgeProps {
  type: EntryType;
}

const variantMap: Record<
  EntryType,
  "green" | "primary" | "amber" | "blue" | "grey"
> = {
  free: "green",
  ticketed: "primary",
  reservation: "amber",
  "walk-in": "blue",
  unclear: "grey",
};

export function EntryTypeBadge({ type }: EntryTypeBadgeProps) {
  return <Badge variant={variantMap[type]}>{ENTRY_TYPE_LABELS[type]}</Badge>;
}
