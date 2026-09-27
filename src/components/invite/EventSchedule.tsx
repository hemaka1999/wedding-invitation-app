"use client";

import React from "react";
import { weddingConfig } from "@/config/weddingConfig";
import ThreeSketchShimmer from "./ThreeSketchShimmer";

const timelineEmojis = ["🥁", "✨", "🥂", "🍽️", "💃"];

// 5 Slices of the single continuous vertical story sketch
const timelineSlices = [
  { offset: 0.00, height: 0.22 }, // 1. Arrival: Magul Bera & Welcome Arch
  { offset: 0.20, height: 0.22 }, // 2. Poruwa Ceremony & Oil Lamp
  { offset: 0.40, height: 0.22 }, // 3. Registration & Toast
  { offset: 0.60, height: 0.22 }, // 4. Banquet Lunch & Acoustic Music
  { offset: 0.80, height: 0.20 }, // 5. Cake Cutting & Baila Party
];

export default function EventSchedule() {
  const { timeline } = weddingConfig;

  return (
    <section className="my-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="font-body text-[10px] sm:text-[11px] font-bold tracking-[2.8px] text-[#997327] uppercase">
          ORDER OF AUSPICIOUS EVENTS
        </span>
        <h2 className="font-title text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">
          Wedding Schedule &amp; Poruwa
        </h2>
      </div>

      {/* Timeline with Golden Spine */}
      <div className="relative pl-8 pr-1 space-y-4 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-[#DEC89E]">
        {timeline.map((event, index) => (
          <div key={index} className="relative group">
            {/* Timeline Circle Badge */}
            <div className="absolute -left-[30px] top-3 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-[#FAF6EE] border-2 border-[#C59E47] shadow-xs group-hover:scale-110 transition-transform">
              <span className="text-[10px]">
                {timelineEmojis[index] || "✨"}
              </span>
            </div>

            {/* Event Content Card with 3D Gold Shimmering Slice */}
            <div className="relative overflow-hidden rounded-[16px] border border-[#EFE4CF] bg-white p-3.5 sm:p-4 shadow-[0_4px_16px_rgba(122,104,67,0.06)] hover:shadow-md transition-shadow">
              
              {/* WebGL Gold Foil Shimmer Slice */}
              <ThreeSketchShimmer
                imageSrc="/images/timeline_journey_sketch.jpg"
                opacity={0.25}
                goldIntensity={1.2}
                sliceOffset={timelineSlices[index]?.offset ?? 0.0}
                sliceHeight={timelineSlices[index]?.height ?? 0.2}
              />

              {/* Card Content (z-10) */}
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded-full bg-[#FAF4E8] px-2.5 py-0.5 text-[10px] font-bold text-[#997327] shadow-xs">
                    {event.time}
                  </span>
                  <h4 className="font-title text-[13px] sm:text-[14px] font-bold text-[#0F172A] uppercase">
                    {event.title}
                  </h4>
                </div>
                <p className="font-body text-[11px] sm:text-xs text-[#696155] mt-1.5 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
