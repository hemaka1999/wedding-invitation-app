"use client";

import React from "react";
import { Navigation, ExternalLink, MapPin } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export default function VenueMap() {
  const { venue } = weddingConfig;

  return (
    <section className="my-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="font-body text-[10px] sm:text-[11px] font-bold tracking-[2.8px] text-[#997327] uppercase">
          CELEBRATION LOCATION
        </span>
        <h2 className="font-title text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">
          Venue &amp; Directions
        </h2>
      </div>

      {/* Stylized Venue Card */}
      <div className="overflow-hidden rounded-[20px] border border-[#EFE4CF] bg-white p-4 sm:p-5 shadow-[0_8px_24px_rgba(122,104,67,0.08)]">
        
        {/* Stylized Map Header Area */}
        <div className="rounded-[14px] bg-[#EBF2FA] p-3 mb-3.5 flex items-center justify-center gap-2 border border-[#DBEAFE]">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white shadow-xs">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <span className="font-body text-[10px] sm:text-[11px] font-bold tracking-[1.5px] text-[#1E3A8A] uppercase">
            SHANGRI-LA HOTEL • COLOMBO
          </span>
        </div>

        {/* Interactive Google Map Preview */}
        <div className="relative w-full h-52 sm:h-56 rounded-[14px] overflow-hidden border border-[#EAE0D0] bg-neutral-100">
          <iframe
            title="Shangri-La Hotel Colombo Google Map"
            src={venue.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Address Info */}
        <div className="mt-3.5 px-1 text-center">
          <p className="font-title text-sm sm:text-base font-bold text-[#0F172A]">
            {venue.name}
          </p>
          <p className="font-body text-[11px] sm:text-xs text-[#696155] mt-0.5">
            {venue.address}
          </p>
        </div>

        {/* High-End Gold Foil Navigation Button */}
        <div className="mt-4">
          <a
            href={venue.mapDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-get-directions"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-gold-foil py-3 px-4 text-xs sm:text-[13px] font-bold text-[#3D2602] shadow-sm hover:brightness-105 active:scale-[0.99] transition-all"
          >
            <Navigation className="w-4 h-4 text-[#3D2602]" />
            <span>↗ Get Directions on Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
}
