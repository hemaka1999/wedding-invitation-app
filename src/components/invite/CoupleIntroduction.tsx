"use client";

import React from "react";
import { Heart } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export default function CoupleIntroduction() {
  const { groom, bride, invitationNote } = weddingConfig;

  return (
    <section className="my-10 text-center px-4 max-w-xl mx-auto">
      {/* Introduction Text */}
      <p className="font-serif italic text-neutral-600 text-sm sm:text-base leading-relaxed mb-8">
        "{invitationNote}"
      </p>

      {/* Couple Showcase Card */}
      <div className="rounded-2xl border border-gold-300/60 bg-gradient-to-b from-ivory-50 via-white to-ivory-100 p-6 sm:p-8 shadow-sm">
        
        {/* Groom Section */}
        <div className="py-2">
          <span className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold">
            The Groom
          </span>
          <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-royal-900 font-medium tracking-wide">
            {groom.fullName}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-neutral-600 font-normal">
            {groom.parentsText}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">{groom.hometown}</p>
        </div>

        {/* Central Heart Monogram */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold-400" />
          <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center">
            <Heart className="w-4 h-4 text-gold-600 fill-gold-600" />
          </div>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        {/* Bride Section */}
        <div className="py-2">
          <span className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold">
            The Bride
          </span>
          <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-royal-900 font-medium tracking-wide">
            {bride.fullName}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-neutral-600 font-normal">
            {bride.parentsText}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">{bride.hometown}</p>
        </div>
      </div>
    </section>
  );
}
