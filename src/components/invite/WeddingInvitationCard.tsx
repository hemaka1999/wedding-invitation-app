"use client";

import React, { useState } from "react";
import { Sparkles, Heart } from "lucide-react";
import { Guest } from "@/types";
import EnvelopeCover from "./EnvelopeCover";
import PersonalizedGreeting from "./PersonalizedGreeting";
import CoupleIntroduction from "./CoupleIntroduction";
import CountdownTimer from "./CountdownTimer";
import EventSchedule from "./EventSchedule";
import VenueMap from "./VenueMap";
import RsvpForm from "./RsvpForm";
import MusicPlayer from "./MusicPlayer";

interface WeddingInvitationCardProps {
  guest: Guest | null;
}

export default function WeddingInvitationCard({ guest }: WeddingInvitationCardProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] pb-24 selection:bg-gold-200">
      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Interactive Envelope Entrance Overlay */}
      {!isOpened && (
        <EnvelopeCover guest={guest} onOpen={() => setIsOpened(true)} />
      )}

      {/* Main Wedding Invitation Document */}
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        
        {/* Top Gold Header Ornament */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 text-gold-600 mb-2">
            <div className="h-[1px] w-8 bg-gold-400" />
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-gold-700 font-bold">
              Holy Matrimony & Poruwa
            </span>
            <Sparkles className="w-4 h-4 text-gold-500" />
            <div className="h-[1px] w-8 bg-gold-400" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-royal-900 tracking-tight">
            Kasun & Nethmi
          </h1>
          <p className="font-script text-3xl sm:text-4xl text-gold-600 mt-1">
            are getting married
          </p>
        </div>

        {/* Dynamic Personalized Guest Greeting */}
        <PersonalizedGreeting guest={guest} />

        {/* Couple & Parents Introduction */}
        <CoupleIntroduction />

        {/* Live Countdown Timer & Date */}
        <CountdownTimer />

        {/* Poruwa & Celebration Timeline */}
        <EventSchedule />

        {/* Interactive Google Map Preview & Directions */}
        <VenueMap />

        {/* Interactive RSVP Form */}
        <RsvpForm guest={guest} />

        {/* Footer Blessing */}
        <footer className="mt-16 text-center border-t border-gold-200 pt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-gold-500 fill-gold-500" />
          </div>
          <p className="font-serif text-sm font-semibold text-royal-900">
            Kasun & Nethmi
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Sunday, 18th October 2026 • Shangri-La Hotel, Colombo
          </p>
          <div className="mt-6">
            <a
              href="/admin"
              className="text-[11px] text-neutral-400 hover:text-gold-700 transition-colors"
            >
              Admin Dashboard Login
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
