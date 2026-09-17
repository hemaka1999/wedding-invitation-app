"use client";

import React from "react";
import { Sparkles, Clock, GlassWater, Utensils, Music, PartyPopper } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export default function EventSchedule() {
  const { timeline } = weddingConfig;

  const getTimelineIcon = (index: number) => {
    switch (index) {
      case 0:
        return <GlassWater className="w-4 h-4 text-gold-600" />;
      case 1:
        return <Sparkles className="w-4 h-4 text-gold-600" />;
      case 2:
        return <Clock className="w-4 h-4 text-gold-600" />;
      case 3:
        return <Utensils className="w-4 h-4 text-gold-600" />;
      case 4:
        return <PartyPopper className="w-4 h-4 text-gold-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-gold-600" />;
    }
  };

  return (
    <section className="my-12 px-4 max-w-xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold">
          Order of Auspicious Events
        </span>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-royal-900 font-semibold">
          Wedding Schedule & Poruwa
        </h2>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-gold-300 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {timeline.map((event, index) => (
          <div key={index} className="relative group">
            {/* Timeline Dot with Icon */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-gold-400 shadow-sm group-hover:scale-110 transition-transform">
              {getTimelineIcon(index)}
            </div>

            {/* Event Content Card */}
            <div className="rounded-xl border border-gold-200/80 bg-white/90 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-block rounded-md bg-gold-500/10 px-2.5 py-0.5 text-xs font-bold text-gold-700 mb-1">
                {event.time}
              </div>
              <h4 className="font-serif text-lg font-semibold text-royal-900">
                {event.title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
