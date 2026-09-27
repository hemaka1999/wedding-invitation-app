"use client";

import React from "react";
import { weddingConfig } from "@/config/weddingConfig";
import ThreeSketchShimmer from "./ThreeSketchShimmer";

export default function CoupleIntroduction() {
  const { groom, bride } = weddingConfig;

  return (
    <div className="my-6">
      {/* Poruwa Blessing Quote */}
      <div className="my-6 text-center px-3 space-y-1">
        <p className="font-script italic text-[15px] sm:text-base text-[#3D372F] leading-snug">
          &ldquo;Together with their parents, {groom.callName} &amp; {bride.callName}
        </p>
        <p className="font-script italic text-[15px] sm:text-base text-[#3D372F] leading-snug">
          joyfully request the honour of your presence
        </p>
        <p className="font-script italic text-[15px] sm:text-base text-[#3D372F] leading-snug">
          at the celebration of their Holy Matrimony
        </p>
        <p className="font-title font-bold text-[12px] sm:text-[13px] tracking-[1.2px] text-[#997327] pt-1 uppercase">
          &amp; AUSPICIOUS PORUWA CEREMONY&rdquo;
        </p>
      </div>

      {/* Card 2: Parents & Lineage Details with 3D Gold Shimmering Couple Sketch */}
      <div className="relative overflow-hidden rounded-[20px] border border-[#EFE4CF] bg-white p-6 sm:p-7 text-center shadow-[0_8px_24px_rgba(122,104,67,0.08)]">
        
        {/* 3D Gold Foil Shimmer Shader for Couple Portrait */}
        <ThreeSketchShimmer
          imageSrc="/images/couple_sketch.jpg"
          opacity={0.24}
          goldIntensity={1.3}
        />

        {/* Card Content (z-10) */}
        <div className="relative z-10">
          {/* Groom Section */}
          <div>
            <span className="font-body text-[10px] font-bold tracking-[2.5px] text-[#A88232] uppercase">
              THE GROOM
            </span>
            <h3 className="font-title text-lg sm:text-xl font-bold text-[#0F172A] mt-1">
              {groom.fullName}
            </h3>
            <p className="font-body text-xs sm:text-[13px] text-[#696155] mt-1">
              {groom.parentsText}
            </p>
            <p className="font-body text-[11px] font-semibold text-[#997327] mt-0.5">
              {groom.hometown}
            </p>
          </div>

          {/* Center Divider Ring */}
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-[1px] flex-1 bg-[#EAE0D0]" />
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FAF6EE] border border-[#C59E47]/70 shadow-xs">
              <svg
                className="w-3 h-3 text-[#997327] fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="h-[1px] flex-1 bg-[#EAE0D0]" />
          </div>

          {/* Bride Section */}
          <div>
            <span className="font-body text-[10px] font-bold tracking-[2.5px] text-[#A88232] uppercase">
              THE BRIDE
            </span>
            <h3 className="font-title text-lg sm:text-xl font-bold text-[#0F172A] mt-1">
              {bride.fullName}
            </h3>
            <p className="font-body text-xs sm:text-[13px] text-[#696155] mt-1">
              {bride.parentsText}
            </p>
            <p className="font-body text-[11px] font-semibold text-[#997327] mt-0.5">
              {bride.hometown}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
