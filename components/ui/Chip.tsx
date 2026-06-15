interface ChipProps {
  label: string;
  className?: string;
}

export function Chip({ label, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-block bg-secondary text-primary font-mono text-xs font-medium px-3 py-1 rounded-full border-2 border-border ${className}`}
    >
      {label}
    </span>
  );
}
