import { type ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  children,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <h2 className="heading-lg text-primary">
        {children}
      </h2>
      <div className="mt-3 h-1 w-16 bg-secondary rounded-none" />
      {subtitle && (
        <p className="body-md text-muted mt-4 max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}
