"use client";

import { useState } from "react";

interface ProjectGalleryProps {
  images?: string[];
}

export function ProjectGallery({ images = [] }: ProjectGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[3/2] bg-surface border-3 border-primary flex items-center justify-center rounded-sm">
        <span className="font-mono text-muted text-sm">[ No documentation images available ]</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Main Viewport */}
      <div className="relative w-full aspect-[3/2] bg-surface border-3 border-primary neo-shadow rounded-sm overflow-hidden mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[activeIdx]}
          alt={`Project screenshot ${activeIdx + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Counter Badge */}
        <div className="absolute bottom-3 right-3 bg-primary text-white dark:text-tertiary px-2.5 py-1 text-xs font-mono font-bold border-2 border-primary rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          {activeIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex flex-wrap gap-3.5">
        {images.map((img, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={img}
              onClick={() => setActiveIdx(idx)}
              className={`relative aspect-[3/2] w-20 md:w-24 bg-surface border-2 border-primary rounded-sm overflow-hidden transition-all duration-200 cursor-pointer hover:scale-105 ${
                isActive
                  ? "border-secondary scale-105 shadow-[2px_2px_0px_rgba(0,0,0,1)] ring-2 ring-secondary/30"
                  : "shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
              }`}
              aria-label={`View screenshot ${idx + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {isActive && (
                <div className="absolute inset-0 bg-secondary/10 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
