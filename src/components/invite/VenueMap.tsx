"use client";

import React from "react";
import { MapPin, Navigation, Phone, ExternalLink } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export default function VenueMap() {
  const { venue } = weddingConfig;

  return (
    <section className="my-12 px-4 max-w-xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold">
          Celebration Location
        </span>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-royal-900 font-semibold">
          Venue & Directions
        </h2>
      </div>

      {/* Venue Info Card */}
      <div className="overflow-hidden rounded-2xl border border-gold-300/80 bg-white shadow-md">
        
        {/* Interactive Google Map Preview */}
        <div className="relative w-full h-64 sm:h-72 bg-neutral-100">
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

        {/* Venue Details & Action */}
        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-gold-50 p-2.5 border border-gold-200 mt-1">
              <MapPin className="w-5 h-5 text-gold-600" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-royal-900">
                {venue.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                {venue.address}
              </p>
              {venue.contactPhone && (
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-2">
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  <span>{venue.contactPhone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Direct Navigation Button */}
          <div className="mt-6 pt-4 border-t border-neutral-100">
            <a
              href={venue.mapDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 py-3 text-sm font-semibold text-white shadow-md hover:from-gold-600 hover:to-gold-700 transition-all duration-200"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
