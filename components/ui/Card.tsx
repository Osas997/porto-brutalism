"use client";

import { type ReactNode, type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true, ...props }: CardProps) {
  return (
    <div
      className={`neo-card p-4 md:p-6 ${hover ? "" : "hover:transform-none hover:shadow-none"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
