"use client";

import React, { useState, useRef, useEffect } from "react";

interface ThreeSketchShimmerProps {
  imageSrc: string;
  className?: string;
  opacity?: number;
  goldIntensity?: number;
  sliceOffset?: number; // 0.0 to 1.0
  sliceHeight?: number; // 0.2 for 1/5
}

// Slices of the continuous timeline sketch
const sliceBackgroundPositions: Record<number, string> = {
  0: "center 4%",   // 1. Arrival of Guests
  1: "center 27%",  // 2. Poruwa Ceremony
  2: "center 50%",  // 3. Civil Registration
  3: "center 74%",  // 4. Banquet Lunch
  4: "center 97%",  // 5. Cake Cutting
};

export default function ThreeSketchShimmer({
  imageSrc,
  className = "",
  opacity = 0.24,
  sliceOffset,
}: ThreeSketchShimmerProps) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isNear, setIsNear] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate slice position if sliceOffset is provided
  let backgroundPos = "center center";
  let backgroundSize = "cover";

  if (sliceOffset !== undefined) {
    const sliceIndex = Math.min(4, Math.max(0, Math.round(sliceOffset * 5)));
    backgroundPos = sliceBackgroundPositions[sliceIndex] || "center center";
    backgroundSize = "100% 520%";
  }

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      // Check proximity to card (within -30% to 130% margin)
      if (x >= -30 && x <= 130 && y >= -30 && y <= 130) {
        setMousePos({
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y)),
        });
        setIsNear(true);
      } else {
        setIsNear(false);
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* 1. Base High-Resolution Sketch Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage: `url('${imageSrc}')`,
          backgroundPosition: backgroundPos,
          backgroundSize: backgroundSize,
          backgroundRepeat: "no-repeat",
          opacity: opacity,
          mixBlendMode: "multiply",
        }}
      />

      {/* 2. Interactive Metallic 24K Gold Specular Spotlight */}
      <div
        className="absolute inset-0 transition-all duration-150 pointer-events-none"
        style={{
          background: isNear
            ? `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 230, 140, 0.65) 0%, rgba(229, 199, 122, 0.35) 40%, transparent 75%)`
            : `radial-gradient(circle 240px at 50% 50%, rgba(229, 199, 122, 0.25) 0%, transparent 70%)`,
          mixBlendMode: "color-dodge",
          opacity: isNear ? 1.0 : 0.4,
        }}
      />

      {/* 3. Sweeping Specular Gold Foil Reflection Beam Following Pointer */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-200"
        style={{
          background: `linear-gradient(${mousePos.x * 1.2 + 30}deg, transparent 25%, rgba(255, 243, 214, 0.45) 50%, transparent 75%)`,
          mixBlendMode: "overlay",
          opacity: isNear ? 0.85 : 0.25,
        }}
      />

      {/* 4. Ambient Metallic Gold Wave Animation */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E5C77A]/15 to-transparent pointer-events-none"
        style={{
          animation: "sealAura 10s linear infinite",
          mixBlendMode: "overlay",
          opacity: 0.35,
        }}
      />

      {/* 5. Soft Vignette Edge Feathering */}
      <div className="absolute inset-0 bg-radial from-transparent via-white/30 to-white/90 pointer-events-none" />
    </div>
  );
}
