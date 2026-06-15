"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  texts: string[];
  separator?: string;
  speed?: number;
  className?: string;
}

export function Marquee({
  texts,
  separator = "✦",
  speed = 50,
  className = "",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !trackRef.current) return;

    const track = trackRef.current;
    const firstSet = track.querySelector("[data-marquee-set]") as HTMLElement;
    if (!firstSet) return;

    // Wait for fonts to load to get accurate width
    const setupAnimation = () => {
      const width = firstSet.offsetWidth;
      if (width === 0) return;

      const duration = width / speed;

      gsap.set(track, { x: 0 });
      tweenRef.current = gsap.to(track, {
        x: -width,
        duration,
        ease: "none",
        repeat: -1,
      });
    };

    // Small delay for font rendering
    const timeout = setTimeout(setupAnimation, 100);

    return () => {
      clearTimeout(timeout);
      tweenRef.current?.kill();
    };
  }, [prefersReducedMotion, speed]);

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.resume();
  };

  const content = texts.map((text, i) => (
    <span key={i} className="flex items-center gap-8">
      <span className="heading-md text-primary whitespace-nowrap">{text}</span>
      <span className="text-secondary text-2xl">{separator}</span>
    </span>
  ));

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="marquee-track py-6">{content}</div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="marquee-track py-6">
        <div data-marquee-set className="flex items-center gap-8 pr-12">
          {content}
        </div>
        <div className="flex items-center gap-8 pr-12">{content}</div>
        <div className="flex items-center gap-8 pr-12">{content}</div>
      </div>
    </div>
  );
}
