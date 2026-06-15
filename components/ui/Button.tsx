"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "neo-btn bg-primary text-secondary dark:text-tertiary hover:bg-secondary hover:text-primary dark:hover:text-tertiary",
    secondary:
      "neo-btn bg-transparent text-primary hover:bg-primary hover:text-secondary dark:hover:text-tertiary",
    link: "bg-transparent text-primary underline underline-offset-4 hover:text-secondary cursor-pointer transition-colors duration-200 font-mono font-medium",
  };

  const classes = `inline-flex items-center justify-center gap-2 font-mono font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
