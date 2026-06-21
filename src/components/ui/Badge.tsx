import styles from "./Badge.module.css";

type BadgeVariant =
  | "green"
  | "amber"
  | "red"
  | "orange"
  | "blue"
  | "grey"
  | "primary"
  | "navy";

interface BadgeProps {
  children: React.ReactNode;
  variant: BadgeVariant;
  icon?: string;
  className?: string;
}

export function Badge({ children, variant, icon, className }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className ?? ""}`}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
