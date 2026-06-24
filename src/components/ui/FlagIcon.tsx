interface FlagIconProps {
  /** ISO 3166-1 alpha-2 code (e.g. "PT") or flag-icons subdivision code (e.g. "gb-eng") */
  code: string;
  /** Display size in pixels — controls both width and height */
  size?: number;
  className?: string;
}

/**
 * Renders a country flag using the flag-icons CSS library.
 * CSS is loaded globally via layout.tsx.
 */
export function FlagIcon({ code, size = 24, className }: FlagIconProps) {
  const aspect = 4 / 3;
  return (
    <span
      className={`fi fi-${code.toLowerCase()}${className ? ` ${className}` : ""}`}
      style={{ width: size * aspect, height: size, display: "inline-block", flexShrink: 0, borderRadius: 2 }}
      aria-hidden="true"
    />
  );
}
